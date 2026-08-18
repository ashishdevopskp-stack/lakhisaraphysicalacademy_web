'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'

export type ReviewType = 'website' | 'blog'
export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface DbReview {
  id: string
  type: ReviewType
  blog_id?: string | null
  name: string
  email_or_mobile?: string | null
  rating: number
  comment: string
  avatar_url?: string | null
  status: ReviewStatus
  admin_reply?: string | null
  replied_at?: string | null
  created_at: string
}

export interface ReviewStats {
  total: number
  average: number
  distribution: { [key: number]: number }
}

const MAX_AVATAR_BYTES = 4 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

async function requireAdmin() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') {
    throw new Error('Unauthorized: Admin access required')
  }
}

/** Helper to upload review avatar image */
async function uploadAvatar(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<string | null> {
  if (!file || file.size === 0) return null

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`Unsupported avatar image type: ${file.type || 'unknown'}`)
  }
  if (file.size > MAX_AVATAR_BYTES) {
    throw new Error('Avatar image must be under 4MB')
  }

  const ext = file.name.split('.').pop() || 'jpg'
  const path = `avatars/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from('review-avatars').upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  })

  if (error) {
    // If bucket doesn't exist, we fall back gracefully without blocking review creation
    console.warn('Avatar upload warning (storage bucket review-avatars may not exist):', error.message)
    return null
  }

  const { data } = supabase.storage.from('review-avatars').getPublicUrl(path)
  return data.publicUrl
}

/** Public Action: Submit a review (website or blog). Always creates with status 'pending' */
export async function submitReview(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient()

    const type = (formData.get('type') as ReviewType) || 'website'
    const blog_id = (formData.get('blog_id') as string)?.trim() || null
    const name = String(formData.get('name') ?? '').trim()
    const email_or_mobile = (formData.get('email_or_mobile') as string)?.trim() || null
    const ratingRaw = Number(formData.get('rating') ?? 5)
    const rating = Math.max(1, Math.min(5, Math.round(ratingRaw)))
    const comment = String(formData.get('comment') ?? '').trim()
    const avatarFile = formData.get('avatar') as File | null

    if (!name) {
      return { success: false, message: 'Please enter your name.' }
    }
    if (!comment) {
      return { success: false, message: 'Please write your review/comment.' }
    }

    let avatar_url: string | null = null
    if (avatarFile && avatarFile.size > 0) {
      try {
        avatar_url = await uploadAvatar(supabase, avatarFile)
      } catch (err) {
        console.warn('Avatar upload failed:', err)
      }
    }

    const payload = {
      type,
      blog_id: type === 'blog' ? blog_id : null,
      name,
      email_or_mobile,
      rating,
      comment,
      avatar_url,
      status: 'pending',
    }

    const { error } = await supabase.from('reviews').insert(payload)
    if (error) {
      console.error('Submit review DB error:', error)
      return { success: false, message: error.message || 'Failed to submit review.' }
    }

    revalidatePath('/admin/reviews')
    if (blog_id) revalidatePath(`/blogs/${blog_id}`)

    return {
      success: true,
      message: 'Thank you! Your review has been submitted and will appear on the site after admin approval.',
    }
  } catch (err) {
    console.error('Submit review error:', err)
    return {
      success: false,
      message: err instanceof Error ? err.message : 'An error occurred while submitting your review.',
    }
  }
}

/** Public Action: Fetch approved website reviews for homepage & public page */
export async function getApprovedWebsiteReviews(): Promise<DbReview[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('type', 'website')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getApprovedWebsiteReviews error:', error)
    return []
  }
  return data ?? []
}

/** Public Action: Fetch approved reviews for a specific blog */
export async function getApprovedBlogReviews(blogId: string): Promise<DbReview[]> {
  if (!blogId) return []
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('type', 'blog')
    .eq('blog_id', blogId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getApprovedBlogReviews error:', error)
    return []
  }
  return data ?? []
}

/** Public Action: Get overall website rating statistics (e.g. 4.8 / 5 based on N reviews) */
export async function getWebsiteReviewStats(): Promise<ReviewStats> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('type', 'website')
    .eq('status', 'approved')

  const distribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  if (error || !data || data.length === 0) {
    return { total: 0, average: 5.0, distribution }
  }

  let totalRatingSum = 0
  data.forEach((r) => {
    totalRatingSum += r.rating
    const star = Math.max(1, Math.min(5, r.rating))
    distribution[star] = (distribution[star] || 0) + 1
  })

  const total = data.length
  const average = Number((totalRatingSum / total).toFixed(1))

  return { total, average, distribution }
}

/** Admin Action: Get filtered list of reviews for moderation */
export async function getAdminReviews(filters?: {
  type?: string
  status?: string
  rating?: number
  search?: string
  blogId?: string
}): Promise<DbReview[]> {
  await requireAdmin()
  const supabase = await createClient()

  let query = supabase.from('reviews').select('*').order('created_at', { ascending: false })

  if (filters?.type && filters.type !== 'all') {
    query = query.eq('type', filters.type)
  }
  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }
  if (filters?.rating && filters.rating > 0) {
    query = query.eq('rating', filters.rating)
  }
  if (filters?.blogId) {
    query = query.eq('blog_id', filters.blogId)
  }

  const { data, error } = await query
  if (error) {
    console.error('getAdminReviews error:', error)
    return []
  }

  let results = data ?? []
  if (filters?.search && filters.search.trim()) {
    const s = filters.search.toLowerCase().trim()
    results = results.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.comment.toLowerCase().includes(s) ||
        (r.email_or_mobile && r.email_or_mobile.toLowerCase().includes(s))
    )
  }

  return results
}

/** Admin Action: Get count of pending reviews for badge */
export async function getPendingReviewsCount(): Promise<number> {
  try {
    const supabase = await createClient()
    const { count, error } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    if (error) return 0
    return count ?? 0
  } catch {
    return 0
  }
}

/** Admin Action: Update review status (approve / reject / set pending) */
export async function updateReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<{ success: boolean; message: string }> {
  try {
    await requireAdmin()
    const supabase = await createClient()

    const { error } = await supabase.from('reviews').update({ status }).eq('id', id)
    if (error) throw new Error(error.message)

    revalidatePath('/admin/reviews')
    revalidatePath('/reviews')
    revalidatePath('/')
    revalidatePath('/blogs', 'layout')

    return { success: true, message: `Review status updated to ${status}.` }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Failed to update review status.',
    }
  }
}

/** Admin Action: Reply to a review */
export async function replyToReview(
  id: string,
  admin_reply: string
): Promise<{ success: boolean; message: string }> {
  try {
    await requireAdmin()
    const supabase = await createClient()

    const { error } = await supabase
      .from('reviews')
      .update({
        admin_reply: admin_reply.trim() || null,
        replied_at: admin_reply.trim() ? new Date().toISOString() : null,
      })
      .eq('id', id)

    if (error) throw new Error(error.message)

    revalidatePath('/admin/reviews')
    revalidatePath('/reviews')
    revalidatePath('/')
    revalidatePath('/blogs', 'layout')

    return { success: true, message: 'Admin reply updated successfully.' }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Failed to save admin reply.',
    }
  }
}

/** Admin Action: Delete a review */
export async function deleteReview(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await requireAdmin()
    const supabase = await createClient()

    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) throw new Error(error.message)

    revalidatePath('/admin/reviews')
    revalidatePath('/reviews')
    revalidatePath('/')
    revalidatePath('/blogs', 'layout')

    return { success: true, message: 'Review deleted successfully.' }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Failed to delete review.',
    }
  }
}

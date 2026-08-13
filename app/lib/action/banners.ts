'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { uploadToCloudinary } from '@/app/lib/cloudinary'

export interface DbBanner {
  id: string
  title: string | null
  subtitle: string | null
  image_url: string
  link_url: string | null
  button_text: string | null
  aspect_ratio: string // "21:9" | "16:9" | "4:3" | "1:1" | "3:4" | "9:16" | "original"
  is_active: boolean
  sort_order: number
  created_at: string
}



async function requireAdmin() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')
}
async function uploadBannerImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<string | null> {
  if (!file || file.size === 0) return null

  const MAX_BYTES = 5 * 1024 * 1024
  if (file.size > MAX_BYTES) {
    throw new Error('Image file exceeds the 5MB limit')
  }

  // Try Cloudinary upload first
  try {
    const cloudinaryUrl = await uploadToCloudinary(file, 'lakhisarai_banners')
    if (cloudinaryUrl) return cloudinaryUrl
  } catch (err) {
    console.warn('Cloudinary upload skipped/failed, falling back to Supabase:', err)
  }

  // Fallback to Supabase storage
  const ext = file.name.split('.').pop() || 'jpg'
  const fileName = `banner-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('banners')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (uploadError) {
    console.error('uploadBannerImage error:', uploadError.message)
    return null
  }

  const { data } = supabase.storage.from('banners').getPublicUrl(fileName)
  return data.publicUrl
}

export async function getBanners(): Promise<DbBanner[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data) {
      return []
    }
    return data
  } catch (err) {
    console.error('getBanners exception:', err)
    return []
  }
}

export async function getActiveBanners(): Promise<DbBanner[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data) {
      return []
    }
    return data
  } catch (err) {
    console.error('getActiveBanners exception:', err)
    return []
  }
}

export async function getBannerById(id: string): Promise<DbBanner | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return data
  } catch {
    return null
  }
}

function isRedirectError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false
  const digest = (err as { digest?: unknown }).digest
  return typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT')
}

export async function createBanner(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const title = (formData.get('title') as string)?.trim() || null
    const subtitle = (formData.get('subtitle') as string)?.trim() || null
    const linkUrl = (formData.get('linkUrl') as string)?.trim() || null
    const buttonText = (formData.get('buttonText') as string)?.trim() || null
    const aspectRatio = (formData.get('aspectRatio') as string)?.trim() || '16:9'
    const sortOrder = parseInt((formData.get('sortOrder') as string) || '0', 10)
    const isActive = formData.get('isActive') === 'on' || formData.get('isActive') === 'true'

    const imageFile = ((formData.get('image') as File) || (formData.get('thumbnail') as File)) as File | null
    const imageUrlInput = (formData.get('thumbnailUrl') as string)?.trim() || null

    let image_url = imageUrlInput
    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadBannerImage(supabase, imageFile)
      if (uploadedUrl) image_url = uploadedUrl
    }

    if (!image_url) {
      redirect('/admin/banners/new?error=Banner+image+is+required')
    }

    const { error } = await supabase.from('banners').insert({
      title,
      subtitle,
      image_url,
      link_url: linkUrl,
      button_text: buttonText,
      aspect_ratio: aspectRatio,
      is_active: isActive,
      sort_order: sortOrder,
    })

    if (error) {
      throw new Error(error.message)
    }
  } catch (err) {
    if (isRedirectError(err)) throw err
    const msg = err instanceof Error ? err.message : 'Failed to create banner'
    redirect(`/admin/banners/new?error=${encodeURIComponent(msg)}`)
  }

  revalidatePath('/admin/banners')
  revalidatePath('/')
  redirect('/admin/banners')
}

export async function updateBanner(id: string, formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const title = (formData.get('title') as string)?.trim() || null
    const subtitle = (formData.get('subtitle') as string)?.trim() || null
    const linkUrl = (formData.get('linkUrl') as string)?.trim() || null
    const buttonText = (formData.get('buttonText') as string)?.trim() || null
    const aspectRatio = (formData.get('aspectRatio') as string)?.trim() || '16:9'
    const sortOrder = parseInt((formData.get('sortOrder') as string) || '0', 10)
    const isActive = formData.get('isActive') === 'on' || formData.get('isActive') === 'true'

    const imageFile = ((formData.get('image') as File) || (formData.get('thumbnail') as File)) as File | null
    const imageUrlInput = (formData.get('thumbnailUrl') as string)?.trim() || null

    const updates: Record<string, unknown> = {
      title,
      subtitle,
      link_url: linkUrl,
      button_text: buttonText,
      aspect_ratio: aspectRatio,
      is_active: isActive,
      sort_order: sortOrder,
    }

    if (imageUrlInput) {
      updates.image_url = imageUrlInput
    }

    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await uploadBannerImage(supabase, imageFile)
      if (uploadedUrl) updates.image_url = uploadedUrl
    }

    const { error } = await supabase.from('banners').update(updates).eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (err) {
    if (isRedirectError(err)) throw err
    const msg = err instanceof Error ? err.message : 'Failed to update banner'
    redirect(`/admin/banners/${id}/edit?error=${encodeURIComponent(msg)}`)
  }

  revalidatePath('/admin/banners')
  revalidatePath('/')
  redirect('/admin/banners')
}

export async function deleteBanner(id: string) {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase.from('banners').delete().eq('id', id)
  if (error) {
    console.error('deleteBanner error:', error.message)
  }

  revalidatePath('/admin/banners')
  revalidatePath('/')
}

export async function toggleBannerStatus(id: string, currentStatus: boolean) {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from('banners')
    .update({ is_active: !currentStatus })
    .eq('id', id)

  if (error) {
    console.error('toggleBannerStatus error:', error.message)
  }

  revalidatePath('/admin/banners')
  revalidatePath('/')
}

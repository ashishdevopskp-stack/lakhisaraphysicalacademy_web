'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import type { VideoStatus } from '@/app/lib/videos-data'

export type DbVideo = {
  id: string
  title: string
  description: string | null
  category: string
  video_url: string
  thumbnail_url: string | null
  status: VideoStatus
  publish_date: string
  featured: boolean
  created_at: string
}

export async function getVideos(): Promise<DbVideo[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('publish_date', { ascending: false })

  if (error) {
    console.error('getVideos error:', error.message)
    return []
  }
  return data ?? []
}

// Only published videos — use this on the public-facing /videos page
export async function getPublishedVideos(): Promise<DbVideo[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'Published')
    .order('publish_date', { ascending: false })

  if (error) {
    console.error('getPublishedVideos error:', error.message)
    return []
  }
  return data ?? []
}

export async function getVideoById(id: string): Promise<DbVideo | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('getVideoById error:', error.message)
    return null
  }
  return data
}

async function uploadThumbnail(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<string | null> {
  if (!file || file.size === 0) return null

  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('video-thumbnails')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (uploadError) {
    console.error('uploadThumbnail error:', uploadError.message)
    return null
  }

  const { data } = supabase.storage.from('video-thumbnails').getPublicUrl(fileName)
  return data.publicUrl
}

export async function createVideo(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = ((formData.get('description') as string) || '').trim() || null
  const category = formData.get('category') as string
  const videoUrl = formData.get('videoUrl') as string
  const status = formData.get('status') as string
  const publishDate = formData.get('publishDate') as string
  const featured = formData.get('featured') === 'on'
  const thumbnailFile = formData.get('thumbnail') as File | null

  let thumbnailUrl: string | null = null
  if (thumbnailFile && thumbnailFile.size > 0) {
    thumbnailUrl = await uploadThumbnail(supabase, thumbnailFile)
  }

  const { error } = await supabase.from('videos').insert({
    title,
    description,
    category,
    video_url: videoUrl,
    thumbnail_url: thumbnailUrl,
    status,
    publish_date: publishDate,
    featured,
  })

  if (error) {
    redirect(`/admin/videos/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/videos')
  revalidatePath('/admin/dashboard')
  revalidatePath('/videos')
  redirect('/admin/videos')
}

export async function updateVideo(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = ((formData.get('description') as string) || '').trim() || null
  const category = formData.get('category') as string
  const videoUrl = formData.get('videoUrl') as string
  const status = formData.get('status') as string
  const publishDate = formData.get('publishDate') as string
  const featured = formData.get('featured') === 'on'
  const thumbnailFile = formData.get('thumbnail') as File | null

  const updates: Record<string, unknown> = {
    title,
    description,
    category,
    video_url: videoUrl,
    status,
    publish_date: publishDate,
    featured,
  }

  if (thumbnailFile && thumbnailFile.size > 0) {
    const thumbnailUrl = await uploadThumbnail(supabase, thumbnailFile)
    if (thumbnailUrl) updates.thumbnail_url = thumbnailUrl
  }

  const { error } = await supabase.from('videos').update(updates).eq('id', id)

  if (error) {
    redirect(`/admin/videos/${id}/edit?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/videos')
  revalidatePath('/admin/dashboard')
  revalidatePath('/videos')
  redirect('/admin/videos')
}

export async function deleteVideo(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('videos').delete().eq('id', id)

  if (error) {
    console.error('deleteVideo error:', error.message)
    return
  }

  revalidatePath('/admin/videos')
  revalidatePath('/admin/dashboard')
  revalidatePath('/videos')
}
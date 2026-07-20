'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
// ^ Adjust this import if your Supabase server client helper
// lives at a different path in blogs.ts / results.ts — match
// whatever those files already import.

export interface DbResource {
  id: string
  title: string
  description: string
  category: string
  file_url: string | null
  video_url: string | null
  has_video: boolean
  downloads: number
  publish_date: string
  created_at: string
  updated_at: string
}

/* =========================================================
   Reads — used by the public /resources page
   ========================================================= */

export async function getResources(): Promise<DbResource[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('publish_date', { ascending: false })

  if (error) {
    console.error('getResources error:', error)
    return []
  }
  return data ?? []
}

export async function getResource(id: string): Promise<DbResource | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('getResource error:', error)
    return null
  }
  return data
}

/* =========================================================
   Writes — used by the admin panel
   ========================================================= */

async function uploadResourceFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<string> {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from('resource-files')
    .upload(path, file, { upsert: false })

  if (error) throw new Error(`File upload failed: ${error.message}`)

  const { data } = supabase.storage.from('resource-files').getPublicUrl(path)
  return data.publicUrl
}

export async function createResource(formData: FormData) {
  const supabase = await createClient()

  const title = String(formData.get('title') ?? '')
  const description = String(formData.get('description') ?? '')
  const category = String(formData.get('category') ?? '')
  const publishDate = String(formData.get('publishDate') ?? '')
  const videoUrl = String(formData.get('videoUrl') ?? '').trim()
  const hasVideo = videoUrl.length > 0
  const file = formData.get('file') as File | null

  let fileUrl: string | null = null
  if (file && file.size > 0) {
    fileUrl = await uploadResourceFile(supabase, file)
  }

  const { error } = await supabase.from('resources').insert({
    title,
    description,
    category,
    publish_date: publishDate || new Date().toISOString().slice(0, 10),
    video_url: videoUrl || null,
    has_video: hasVideo,
    file_url: fileUrl,
  })

  if (error) {
    redirect(`/admin/resources/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/resources')
  revalidatePath('/resources')
  redirect('/admin/resources')
}

export async function updateResource(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = String(formData.get('title') ?? '')
  const description = String(formData.get('description') ?? '')
  const category = String(formData.get('category') ?? '')
  const publishDate = String(formData.get('publishDate') ?? '')
  const videoUrl = String(formData.get('videoUrl') ?? '').trim()
  const hasVideo = videoUrl.length > 0
  const file = formData.get('file') as File | null

  const update: Partial<DbResource> = {
    title,
    description,
    category,
    publish_date: publishDate,
    video_url: videoUrl || null,
    has_video: hasVideo,
  }

  if (file && file.size > 0) {
    update.file_url = await uploadResourceFile(supabase, file)
  }

  const { error } = await supabase.from('resources').update(update).eq('id', id)

  if (error) {
    redirect(`/admin/resources/${id}/edit?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/resources')
  revalidatePath('/resources')
  redirect('/admin/resources')
}

export async function deleteResource(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('resources').delete().eq('id', id)

  if (error) {
    console.error('deleteResource error:', error)
  }

  revalidatePath('/admin/resources')
  revalidatePath('/resources')
}

/* =========================================================
   Called directly from the public client component when a
   visitor clicks "Download Now" — fire-and-forget counter.
   ========================================================= */
export async function incrementDownloadCount(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('resources')
    .select('downloads')
    .eq('id', id)
    .single()

  const current = data?.downloads ?? 0
  await supabase
    .from('resources')
    .update({ downloads: current + 1 })
    .eq('id', id)

  revalidatePath('/resources')
}
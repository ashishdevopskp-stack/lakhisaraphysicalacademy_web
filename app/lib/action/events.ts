'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'

export interface DbEvent {
  id: string
  title: string
  subtitle: string | null
  category: string
  event_date: string
  time_label: string | null
  venue: string
  status: 'Open' | 'Closed'
  description: string | null
  highlights: string[]
  eligibility: string | null
  seats: string | null
  last_registration: string | null
  youtube_url: string | null
  created_at: string
}

export interface DbGalleryImage {
  id: string
  label: string
  image_url: string
  created_at: string
}

async function requireAdmin() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')
}

/* ---------------- Events ---------------- */

export async function getEvents(): Promise<DbEvent[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })

  if (error) {
    console.error('getEvents error:', error)
    return []
  }
  return data ?? []
}

export async function getEvent(id: string): Promise<DbEvent | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('events').select('*').eq('id', id).single()
  if (error) return null
  return data
}

function readEventFields(formData: FormData) {
  const highlightsRaw = String(formData.get('highlights') ?? '')
  const highlights = highlightsRaw
    .split('\n')
    .map((h) => h.trim())
    .filter(Boolean)

  return {
    title: String(formData.get('title') ?? '').trim(),
    subtitle: (formData.get('subtitle') as string) || null,
    category: String(formData.get('category') ?? '').trim(),
    event_date: String(formData.get('eventDate') ?? ''),
    time_label: (formData.get('timeLabel') as string) || null,
    venue: String(formData.get('venue') ?? '').trim(),
    status: (formData.get('status') as string) === 'Closed' ? 'Closed' : 'Open',
    description: (formData.get('description') as string) || null,
    highlights,
    eligibility: (formData.get('eligibility') as string) || null,
    seats: (formData.get('seats') as string) || null,
    last_registration: (formData.get('lastRegistration') as string) || null,
    youtube_url: (formData.get('youtubeUrl') as string)?.trim() || null,
  }
}

export async function createEvent(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const fields = readEventFields(formData)
    if (!fields.title || !fields.category || !fields.event_date || !fields.venue) {
      redirect('/admin/events/new?error=Title, category, date, and venue are required')
    }

    const { error } = await supabase.from('events').insert(fields)
    if (error) throw new Error(error.message)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create event'
    redirect(`/admin/events/new?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/events')
  revalidatePath('/events')
  redirect('/admin/events')
}

export async function updateEvent(id: string, formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const fields = readEventFields(formData)
    if (!fields.title || !fields.category || !fields.event_date || !fields.venue) {
      redirect(`/admin/events/${id}/edit?error=Title, category, date, and venue are required`)
    }

    const { error } = await supabase.from('events').update(fields).eq('id', id)
    if (error) throw new Error(error.message)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update event'
    redirect(`/admin/events/${id}/edit?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/events')
  revalidatePath('/events')
  redirect('/admin/events')
}

export async function deleteEvent(id: string) {
  await requireAdmin()
  const supabase = await createClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) {
    redirect(`/admin/events?error=${encodeURIComponent(error.message)}`)
  }
  revalidatePath('/admin/events')
  revalidatePath('/events')
  redirect('/admin/events')
}

/* ---------------- Gallery ---------------- */

export async function getGalleryImages(): Promise<DbGalleryImage[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getGalleryImages error:', error)
    return []
  }
  return data ?? []
}

export async function getGalleryImage(id: string): Promise<DbGalleryImage | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('gallery_images').select('*').eq('id', id).single()
  if (error) return null
  return data
}

async function uploadGalleryImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File) {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('events').upload(path, file)
  if (error) throw new Error('Image upload failed: ' + error.message)
  const { data } = supabase.storage.from('events').getPublicUrl(path)
  return data.publicUrl
}

export async function createGalleryImage(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const label = String(formData.get('label') ?? '').trim()
    const file = formData.get('image') as File | null

    if (!label) {
      redirect('/admin/events/gallery/new?error=Label is required')
    }
    if (!file || file.size === 0) {
      redirect('/admin/events/gallery/new?error=Image is required')
    }

    const image_url = await uploadGalleryImage(supabase, file as File)
    const { error } = await supabase.from('gallery_images').insert({ label, image_url })
    if (error) throw new Error(error.message)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to add image'
    redirect(`/admin/events/gallery/new?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/events/gallery')
  revalidatePath('/events/gallery')
  redirect('/admin/events/gallery')
}

export async function updateGalleryImage(id: string, formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const label = String(formData.get('label') ?? '').trim()
    if (!label) {
      redirect(`/admin/events/gallery/${id}/edit?error=Label is required`)
    }

    const file = formData.get('image') as File | null
    const image_url = file && file.size > 0 ? await uploadGalleryImage(supabase, file) : undefined

    const { error } = await supabase
      .from('gallery_images')
      .update({ label, ...(image_url ? { image_url } : {}) })
      .eq('id', id)
    if (error) throw new Error(error.message)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update image'
    redirect(`/admin/events/gallery/${id}/edit?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/events/gallery')
  revalidatePath('/events/gallery')
  redirect('/admin/events/gallery')
}

export async function deleteGalleryImage(id: string) {
  await requireAdmin()
  const supabase = await createClient()
  const { error } = await supabase.from('gallery_images').delete().eq('id', id)
  if (error) {
    redirect(`/admin/events/gallery?error=${encodeURIComponent(error.message)}`)
  }
  revalidatePath('/admin/events/gallery')
  revalidatePath('/events/gallery')
  redirect('/admin/events/gallery')
}
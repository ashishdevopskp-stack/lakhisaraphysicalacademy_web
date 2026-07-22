'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'

export interface DbResult {
  title: string
  id: string
  name: string
  post: string
  exam: string
  department: string
  district: string
  year: string
  rank_score: string | null
  status: 'Selected' | 'Under Training' | 'Document Verification'
  photo_url: string | null
  testimonial: string | null
  video_url: string | null
  created_at: string
}

async function requireAdmin() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')
}

/* ---------------- Reads ---------------- */

export async function getResults(): Promise<DbResult[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getResults error:', error)
    return []
  }
  return data ?? []
}

export async function getResult(id: string): Promise<DbResult | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('results').select('*').eq('id', id).single()
  if (error) return null
  return data
}

/* ---------------- Helpers ---------------- */

async function uploadResultPhoto(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
) {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('results').upload(path, file)
  if (error) throw new Error('Photo upload failed: ' + error.message)
  const { data } = supabase.storage.from('results').getPublicUrl(path)
  return data.publicUrl
}

function readResultFields(formData: FormData) {
  return {
    name: String(formData.get('name') ?? '').trim(),
    post: String(formData.get('post') ?? '').trim(),
    exam: String(formData.get('exam') ?? '').trim(),
    department: String(formData.get('department') ?? '').trim(),
    district: String(formData.get('district') ?? '').trim(),
    year: String(formData.get('year') ?? '').trim(),
    rank_score: (formData.get('rankScore') as string)?.trim() || null,
    status: (formData.get('status') as string) || 'Selected',
    testimonial: (formData.get('testimonial') as string)?.trim() || null,
    video_url: (formData.get('videoUrl') as string)?.trim() || null,
  }
}

/* ---------------- Writes ---------------- */

export async function createResult(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const fields = readResultFields(formData)
    if (!fields.name || !fields.post || !fields.exam || !fields.department || !fields.district || !fields.year) {
      redirect('/admin/results/new?error=Name, post, exam, department, district, and year are required')
    }

    const photo = formData.get('photo') as File | null
    const photo_url = photo && photo.size > 0 ? await uploadResultPhoto(supabase, photo) : null

    const { error } = await supabase.from('results').insert({ ...fields, photo_url })
    if (error) throw new Error(error.message)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create result'
    redirect(`/admin/results/new?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/results')
  revalidatePath('/results')
  redirect('/admin/results')
}

export async function updateResult(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const id = String(formData.get('id') ?? '')
  if (!id) {
    redirect('/admin/results?error=Missing result id')
  }

  try {
    const fields = readResultFields(formData)
    if (!fields.name || !fields.post || !fields.exam || !fields.department || !fields.district || !fields.year) {
      redirect(`/admin/results/${id}/edit?error=Name, post, exam, department, district, and year are required`)
    }

    const photo = formData.get('photo') as File | null
    const photo_url = photo && photo.size > 0 ? await uploadResultPhoto(supabase, photo) : undefined

    const { error } = await supabase
      .from('results')
      .update({ ...fields, ...(photo_url ? { photo_url } : {}) })
      .eq('id', id)
    if (error) throw new Error(error.message)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update result'
    redirect(`/admin/results/${id}/edit?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/results')
  revalidatePath('/results')
  redirect('/admin/results')
}

export async function deleteResult(id: string) {
  await requireAdmin()
  const supabase = await createClient()
  const { error } = await supabase.from('results').delete().eq('id', id)
  if (error) {
    redirect(`/admin/results?error=${encodeURIComponent(error.message)}`)
  }
  revalidatePath('/admin/results')
  revalidatePath('/results')
  redirect('/admin/results')
}
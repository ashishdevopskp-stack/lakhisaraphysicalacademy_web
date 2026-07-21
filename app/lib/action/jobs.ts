'use server'

import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'

export interface DbJob {
  id: string
  title: string
  subtitle: string | null
  organization: string
  category: string
  status: string
  notification_date: string
  last_date: string
  location: string
  pdf_url: string | null
  video_url: string | null
  details_url: string | null
  created_at: string
  updated_at: string
}

/* =========================================================
   Reads — used by the public /jobs page
   ========================================================= */

export async function getJobs(): Promise<DbJob[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('notification_date', { ascending: false })

  if (error) {
    console.error('getJobs error:', error)
    return []
  }
  return data ?? []
}

export async function getJob(id: string): Promise<DbJob | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('getJob error:', error)
    return null
  }
  return data
}

/* =========================================================
   Writes — used by the admin panel
   ========================================================= */

async function uploadJobPdf(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<string> {
  const ext = file.name.split('.').pop()
  const path = `${randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from('job-files')
    .upload(path, file, { upsert: false })

  if (error) throw new Error(`File upload failed: ${error.message}`)

  const { data } = supabase.storage.from('job-files').getPublicUrl(path)
  return data.publicUrl
}

export async function createJob(formData: FormData) {
  const supabase = await createClient()

  const title = String(formData.get('title') ?? '')
  const subtitle = String(formData.get('subtitle') ?? '').trim()
  const organization = String(formData.get('organization') ?? '')
  const category = String(formData.get('category') ?? '')
  const status = String(formData.get('status') ?? 'New')
  const notificationDate = String(formData.get('notificationDate') ?? '')
  const lastDate = String(formData.get('lastDate') ?? '')
  const location = String(formData.get('location') ?? '')
  const videoUrl = String(formData.get('videoUrl') ?? '').trim()
  const detailsUrl = String(formData.get('detailsUrl') ?? '').trim()
  const file = formData.get('pdf') as File | null

  let pdfUrl: string | null = null
  if (file && file.size > 0) {
    pdfUrl = await uploadJobPdf(supabase, file)
  }

  const { error } = await supabase.from('jobs').insert({
    title,
    subtitle: subtitle || null,
    organization,
    category,
    status,
    notification_date: notificationDate || new Date().toISOString().slice(0, 10),
    last_date: lastDate || new Date().toISOString().slice(0, 10),
    location,
    pdf_url: pdfUrl,
    video_url: videoUrl || null,
    details_url: detailsUrl || null,
  })

  if (error) {
    redirect(`/admin/jobs/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/jobs')
  revalidatePath('/jobs')
  redirect('/admin/jobs')
}

export async function updateJob(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = String(formData.get('title') ?? '')
  const subtitle = String(formData.get('subtitle') ?? '').trim()
  const organization = String(formData.get('organization') ?? '')
  const category = String(formData.get('category') ?? '')
  const status = String(formData.get('status') ?? 'New')
  const notificationDate = String(formData.get('notificationDate') ?? '')
  const lastDate = String(formData.get('lastDate') ?? '')
  const location = String(formData.get('location') ?? '')
  const videoUrl = String(formData.get('videoUrl') ?? '').trim()
  const detailsUrl = String(formData.get('detailsUrl') ?? '').trim()
  const file = formData.get('pdf') as File | null

  const update: Partial<DbJob> = {
    title,
    subtitle: subtitle || null,
    organization,
    category,
    status,
    notification_date: notificationDate,
    last_date: lastDate,
    location,
    video_url: videoUrl || null,
    details_url: detailsUrl || null,
  }

  if (file && file.size > 0) {
    update.pdf_url = await uploadJobPdf(supabase, file)
  }

  const { error } = await supabase.from('jobs').update(update).eq('id', id)

  if (error) {
    redirect(`/admin/jobs/${id}/edit?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/jobs')
  revalidatePath('/jobs')
  redirect('/admin/jobs')
}

export async function deleteJob(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('jobs').delete().eq('id', id)

  if (error) {
    console.error('deleteJob error:', error)
  }

  revalidatePath('/admin/jobs')
  revalidatePath('/jobs')
}
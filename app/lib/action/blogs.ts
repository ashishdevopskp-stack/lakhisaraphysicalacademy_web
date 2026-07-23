'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'
import { getCurrentUserRole } from '@/app/lib/action/auth'

export interface DbBlog {
  id: string
  title: string
  subtitle: string | null
  content: string | null
  author: string
  category: string
  publish_date: string
  reading_time: string | null
  views: number
  has_video: boolean
  has_pdf: boolean
  video_url: string | null
  pdf_url: string | null
  image_url: string | null
  created_at: string
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const MAX_PDF_BYTES = 10 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

async function requireAdmin() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')
}

export async function getBlogs(): Promise<DbBlog[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('publish_date', { ascending: false })

  if (error) {
    console.error('getBlogs error:', error)
    return []
  }
  return data ?? []
}

export async function getBlog(id: string): Promise<DbBlog | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single()
  if (error) return null
  return data
}

export async function incrementBlogViews(id: string) {
  const supabase = await createClient()
  await supabase.rpc('increment_blog_views', { blog_id: id })
}

/**
 * Generic upload helper with server-side validation. Client-side checks
 * (type/size/compression) are only a UX nicety — never trust them alone,
 * since a request can bypass the browser entirely.
 */
async function uploadFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
  opts: { bucket: string; maxBytes: number; allowedTypes?: string[] }
) {
  if (!file || file.size === 0) return null

  if (opts.allowedTypes && !opts.allowedTypes.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type || 'unknown'}`)
  }
  if (file.size > opts.maxBytes) {
    throw new Error(`File exceeds the ${(opts.maxBytes / 1024 / 1024).toFixed(0)}MB limit`)
  }

  const ext = file.name.split('.').pop() || 'bin'
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from(opts.bucket).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  })
  if (error) throw new Error('Upload failed: ' + error.message)

  const { data } = supabase.storage.from(opts.bucket).getPublicUrl(path)
  return data.publicUrl
}

/** Best-effort delete of a previously uploaded file when it's being replaced. Never blocks the save. */
async function deleteFileByUrl(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bucket: string,
  url: string | null
) {
  if (!url) return
  try {
    const path = url.split(`/${bucket}/`).pop()
    if (path) await supabase.storage.from(bucket).remove([decodeURIComponent(path)])
  } catch (err) {
    console.error(`Failed to delete old file from ${bucket}:`, err)
  }
}

function readBlogFields(formData: FormData, pdfUploadUrl: string | null, pdfUrlField: string | null) {
  const pdf_url = pdfUploadUrl ?? pdfUrlField
  return {
    title: String(formData.get('title') ?? '').trim(),
    subtitle: (formData.get('subtitle') as string) || null,
    content: (formData.get('content') as string) || null,
    author: String(formData.get('author') ?? '').trim(),
    category: String(formData.get('category') ?? '').trim(),
    publish_date: (formData.get('publishDate') as string) || new Date().toISOString().slice(0, 10),
    reading_time: (formData.get('readingTime') as string) || null,
    video_url: (formData.get('videoUrl') as string)?.trim() || null,
    has_video: Boolean((formData.get('videoUrl') as string)?.trim()),
    has_pdf: Boolean(pdf_url),
    pdf_url,
  }
}

export async function createBlog(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const imageFile = formData.get('image') as File | null
    const pdfFile = formData.get('pdfFile') as File | null
    const pdfUrlField = (formData.get('pdfUrl') as string)?.trim() || null

    const image_url = imageFile && imageFile.size > 0
      ? await uploadFile(supabase, imageFile, { bucket: 'blogs', maxBytes: MAX_IMAGE_BYTES, allowedTypes: ALLOWED_IMAGE_TYPES })
      : null

    const pdfUploadUrl = pdfFile && pdfFile.size > 0
      ? await uploadFile(supabase, pdfFile, { bucket: 'blog-pdfs', maxBytes: MAX_PDF_BYTES, allowedTypes: ['application/pdf'] })
      : null

    const fields = readBlogFields(formData, pdfUploadUrl, pdfUrlField)
    if (!fields.title || !fields.author || !fields.category) {
      redirect('/admin/blogs/new?error=Title, author, and category are required')
    }

    const { error } = await supabase.from('blogs').insert({ ...fields, image_url, views: 0 })
    if (error) throw new Error(error.message)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create blog'
    redirect(`/admin/blogs/new?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/blogs/articles')
  redirect('/admin/blogs')
}

export async function updateBlog(id: string, formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const existing = await getBlog(id)

    const imageFile = formData.get('image') as File | null
    const pdfFile = formData.get('pdfFile') as File | null
    const pdfUrlField = (formData.get('pdfUrl') as string)?.trim() || null

    let image_url: string | undefined
    if (imageFile && imageFile.size > 0) {
      image_url = (await uploadFile(supabase, imageFile, {
        bucket: 'blogs', maxBytes: MAX_IMAGE_BYTES, allowedTypes: ALLOWED_IMAGE_TYPES,
      })) ?? undefined
      if (image_url) await deleteFileByUrl(supabase, 'blogs', existing?.image_url ?? null)
    }

    let pdfUploadUrl: string | null = null
    if (pdfFile && pdfFile.size > 0) {
      pdfUploadUrl = await uploadFile(supabase, pdfFile, {
        bucket: 'blog-pdfs', maxBytes: MAX_PDF_BYTES, allowedTypes: ['application/pdf'],
      })
      if (pdfUploadUrl) await deleteFileByUrl(supabase, 'blog-pdfs', existing?.pdf_url ?? null)
    }

    const fields = readBlogFields(formData, pdfUploadUrl, pdfUrlField)
    if (!fields.title || !fields.author || !fields.category) {
      redirect(`/admin/blogs/${id}/edit?error=Title, author, and category are required`)
    }

    const { error } = await supabase
      .from('blogs')
      .update({ ...fields, ...(image_url ? { image_url } : {}) })
      .eq('id', id)
    if (error) throw new Error(error.message)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update blog'
    redirect(`/admin/blogs/${id}/edit?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/blogs/articles')
  redirect('/admin/blogs')
}

export async function deleteBlog(id: string) {
  await requireAdmin()
  const supabase = await createClient()

  const existing = await getBlog(id)
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) {
    redirect(`/admin/blogs?error=${encodeURIComponent(error.message)}`)
  }

  await deleteFileByUrl(supabase, 'blogs', existing?.image_url ?? null)
  await deleteFileByUrl(supabase, 'blog-pdfs', existing?.pdf_url ?? null)

  revalidatePath('/admin/blogs')
  revalidatePath('/blogs/articles')
  redirect('/admin/blogs')
}
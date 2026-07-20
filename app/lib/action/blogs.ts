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

async function uploadCoverImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File) {
  if (!file || file.size === 0) return null
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('blogs').upload(path, file)
  if (error) throw new Error('Image upload failed: ' + error.message)
  const { data } = supabase.storage.from('blogs').getPublicUrl(path)
  return data.publicUrl
}

function readBlogFields(formData: FormData) {
  const video_url = (formData.get('videoUrl') as string)?.trim() || null
  const pdf_url = (formData.get('pdfUrl') as string)?.trim() || null

  return {
    title: String(formData.get('title') ?? '').trim(),
    subtitle: (formData.get('subtitle') as string) || null,
    content: (formData.get('content') as string) || null,
    author: String(formData.get('author') ?? '').trim(),
    category: String(formData.get('category') ?? '').trim(),
    publish_date: (formData.get('publishDate') as string) || new Date().toISOString().slice(0, 10),
    reading_time: (formData.get('readingTime') as string) || null,
    // Derived directly from whether a URL was actually provided —
    // no separate checkbox to forget to tick.
    has_video: Boolean(video_url),
    has_pdf: Boolean(pdf_url),
    video_url,
    pdf_url,
  }
}

export async function createBlog(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  try {
    const fields = readBlogFields(formData)
    if (!fields.title || !fields.author || !fields.category) {
      redirect('/admin/blogs/new?error=Title, author, and category are required')
    }

    const imageFile = formData.get('image') as File | null
    const image_url = imageFile ? await uploadCoverImage(supabase, imageFile) : null

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
    const fields = readBlogFields(formData)
    if (!fields.title || !fields.author || !fields.category) {
      redirect(`/admin/blogs/${id}/edit?error=Title, author, and category are required`)
    }

    const imageFile = formData.get('image') as File | null
    const image_url = imageFile && imageFile.size > 0 ? await uploadCoverImage(supabase, imageFile) : undefined

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
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) {
    redirect(`/admin/blogs?error=${encodeURIComponent(error.message)}`)
  }
  revalidatePath('/admin/blogs')
  revalidatePath('/blogs/articles')
  redirect('/admin/blogs')
}
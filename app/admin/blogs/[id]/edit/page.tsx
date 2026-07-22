import { redirect, notFound } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getBlog, updateBlog } from '@/app/lib/action/blogs'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../../../_components/AdminSidebar'
import { BlogForm } from '../../_components/BlogForm'

export default async function EditBlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const blog = await getBlog(id)
  if (!blog) notFound()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Blogs" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-semibold mb-1">Edit Blog</h1>
        <p className="text-sm text-gray-500 mb-8">
          Update details for &ldquo;{blog.title}&rdquo;.
        </p>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <BlogForm
          action={updateBlog.bind(null, id)}
          submitLabel="Save Changes"
          initialData={blog}
        />
      </main>
    </div>
  )
}
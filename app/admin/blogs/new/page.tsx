import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { createBlog } from '@/app/lib/action/blogs'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../../_components/AdminSidebar'
import { BlogForm } from '../_components/BlogForm'

export default async function NewBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Blogs" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-semibold mb-1">Add Blog</h1>
        <p className="text-sm text-gray-500 mb-8">This will appear on the blog page once saved.</p>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <BlogForm action={createBlog} submitLabel="Add Blog" />
      </main>
    </div>
  )
}
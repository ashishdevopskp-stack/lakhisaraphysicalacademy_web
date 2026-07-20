import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getBlogs, deleteBlog } from '@/app/lib/action/blogs'
import { AdminSidebar } from '../products/page'

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const blogs = await getBlogs()

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Blogs" />

      <main className="flex-1 p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Blogs</h1>
            <p className="text-sm text-[#9B9BA3]">Manage what shows up on the blog page.</p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="text-sm px-4 py-2 rounded-lg bg-[#7C6AEF] text-white font-medium hover:bg-[#6D5CE0] transition-colors"
          >
            + Add Blog
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
          {blogs.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-[#9B9BA3] mb-4">No blogs yet.</p>
              <Link href="/admin/blogs/new" className="text-sm text-[#7C6AEF] hover:underline">
                Add your first blog
              </Link>
            </div>
          ) : (
            <div>
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-white/[0.06] overflow-hidden shrink-0 flex items-center justify-center">
                      {blog.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-[#9B9BA3]">—</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{blog.title}</p>
                      <p className="text-sm text-[#9B9BA3] truncate">
                        {blog.category} · {blog.author} · {blog.publish_date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-[#9B9BA3]">
                      {blog.views.toLocaleString('en-IN')} views
                    </span>
                    <Link
                      href={`/admin/blogs/${blog.id}/edit`}
                      className="text-sm text-[#9B9BA3] hover:text-[#EDEDEF] transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteBlog.bind(null, blog.id)}>
                      <button type="submit" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
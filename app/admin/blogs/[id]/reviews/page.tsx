import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react'
import { getBlog } from '@/app/lib/action/blogs'
import { getAdminReviews } from '@/app/lib/action/reviews'
import { ReviewManagementView } from '@/app/admin/reviews/_components/ReviewManagementView'

type Params = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Params) {
  const { id } = await params
  const blog = await getBlog(id)
  return {
    title: `Reviews for "${blog?.title || 'Blog'}" | Admin Panel`,
  }
}

export default async function AdminBlogReviewsPage({ params }: Params) {
  const { id } = await params
  const [blog, reviews] = await Promise.all([
    getBlog(id),
    getAdminReviews({ blogId: id }),
  ])

  if (!blog) notFound()

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} /> Back to Blogs List
        </Link>

        <Link
          href={`/blogs/${blog.id}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
        >
          <span>View Public Article</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* Blog Detail Header Card */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 relative overflow-hidden shadow-md">
        <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded-full inline-flex items-center gap-1">
          <FileText size={12} /> Blog Comments &amp; Reviews
        </span>
        <h1 className="font-display text-xl sm:text-2xl font-black text-white leading-tight">
          {blog.title}
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Category: {blog.category} • Author: {blog.author} • Views: {blog.views}
        </p>
      </div>

      {/* Embedded Review Management View for this blog */}
      <ReviewManagementView initialReviews={reviews} />
    </div>
  )
}

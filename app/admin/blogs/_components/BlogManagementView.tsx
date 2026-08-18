"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  Search,
  Eye,
  Calendar,
  User,
  Tag,
  Star,
} from "lucide-react";
import type { DbBlog } from "@/app/lib/action/blogs";
import { deleteBlog } from "@/app/lib/action/blogs";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

export function BlogManagementView({ initialBlogs }: { initialBlogs: DbBlog[] }) {
  const [blogs, setBlogs] = useState<DbBlog[]>(initialBlogs);
  const [query, setQuery] = useState("");
  const [deletingBlog, setDeletingBlog] = useState<DbBlog | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const filteredBlogs = blogs.filter((b) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    );
  });

  function handleDeleteConfirm() {
    if (!deletingBlog) return;
    const targetId = deletingBlog.id;

    startDeleteTransition(async () => {
      await deleteBlog(targetId);
      setBlogs((prev) => prev.filter((b) => b.id !== targetId));
      setDeletingBlog(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Publishing Studio
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {blogs.length} Published Articles
              </span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Academy Blog &amp; News Articles
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Publish fitness tips, physical training guides, and academy updates.
            </p>
          </div>
        </div>

        <Link
          href="/admin/blogs/new"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Publish New Blog</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm max-w-md">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by blog title, author, category..."
          className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Blogs Items List */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-orange-50/20 transition-colors"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                {blog.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileText size={24} className="text-slate-300" />
                )}
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-black text-slate-900">
                    {blog.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ea580c] text-[10px] font-black uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1">
                    <User size={13} className="text-slate-400" />
                    {blog.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-slate-400" />
                    {blog.publish_date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-slate-700">
                    <Eye size={13} className="text-[#ea580c]" />
                    {blog.views.toLocaleString("en-IN")} views
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
              <Link
                href={`/admin/blogs/${blog.id}/reviews`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
                title="View & Moderate Reviews/Comments for this Blog"
              >
                <Star size={14} className="fill-amber-400 text-amber-500" />
                <span>Reviews</span>
              </Link>

              <Link
                href={`/blogs/${blog.id}`}
                target="_blank"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Eye size={14} />
                <span>View</span>
              </Link>

              <Link
                href={`/admin/blogs/${blog.id}/edit`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Pencil size={14} />
                <span>Edit</span>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingBlog(blog)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="py-14 text-center text-slate-500 font-semibold text-xs">
            No blogs found in publishing studio.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingBlog)}
        itemName={deletingBlog?.title}
        isDeleting={isDeletingPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingBlog(null)}
      />
    </div>
  );
}

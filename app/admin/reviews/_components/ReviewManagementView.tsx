'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
  Star, Search, CheckCircle2, XCircle, Trash2, MessageSquare,
  Clock, ShieldAlert, Sparkles, Filter, CornerDownRight, ExternalLink, UserCheck
} from 'lucide-react'
import type { DbReview } from '@/app/lib/action/reviews'
import { updateReviewStatus, replyToReview, deleteReview } from '@/app/lib/action/reviews'
import { ConfirmDeleteModal } from '@/app/admin/_components/ConfirmDeleteModal'

export function ReviewManagementView({
  initialReviews,
}: {
  initialReviews: DbReview[]
}) {
  const [reviews, setReviews] = useState<DbReview[]>(initialReviews)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [ratingFilter, setRatingFilter] = useState<number>(0)

  // Admin Reply modal state
  const [replyingReview, setReplyingReview] = useState<DbReview | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replyPending, startReplyTransition] = useTransition()

  // Delete modal state
  const [deletingReview, setDeletingReview] = useState<DbReview | null>(null)
  const [deletePending, startDeleteTransition] = useTransition()
  const [, startStatusTransition] = useTransition()

  // Compute live statistics
  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
  }

  // Filter logic
  const filteredReviews = reviews.filter((r) => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    if (ratingFilter > 0 && r.rating !== ratingFilter) return false

    if (!search.trim()) return true
    const q = search.toLowerCase().trim()
    return (
      r.name.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q) ||
      (r.email_or_mobile && r.email_or_mobile.toLowerCase().includes(q))
    )
  })

  function handleStatusChange(id: string, newStatus: 'approved' | 'rejected' | 'pending') {
    startStatusTransition(async () => {
      await updateReviewStatus(id, newStatus)
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      )
    })
  }

  function handleSaveReply(e: React.FormEvent) {
    e.preventDefault()
    if (!replyingReview) return

    startReplyTransition(async () => {
      await replyToReview(replyingReview.id, replyText)
      setReviews((prev) =>
        prev.map((r) =>
          r.id === replyingReview.id
            ? { ...r, admin_reply: replyText.trim() || null, replied_at: new Date().toISOString() }
            : r
        )
      )
      setReplyingReview(null)
      setReplyText('')
    })
  }

  function handleDeleteConfirm() {
    if (!deletingReview) return
    const targetId = deletingReview.id

    startDeleteTransition(async () => {
      await deleteReview(targetId)
      setReviews((prev) => prev.filter((r) => r.id !== targetId))
      setDeletingReview(null)
    })
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shadow-sm shrink-0">
            <Star size={24} className="fill-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-700 rounded-full">
                Review Moderation
              </span>
              {stats.pending > 0 && (
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white rounded-full animate-pulse">
                  {stats.pending} Needs Review
                </span>
              )}
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Website &amp; Blog Reviews Moderation
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Approve, reject, reply to, and manage public student ratings and blog comments.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400">Total Submitted</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-black uppercase text-amber-800 flex items-center gap-1">
            <Clock size={12} /> Pending Moderation
          </span>
          <p className="text-2xl font-black text-amber-900 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 shadow-sm">
          <span className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
            <CheckCircle2 size={12} /> Approved &amp; Live
          </span>
          <p className="text-2xl font-black text-emerald-900 mt-1">{stats.approved}</p>
        </div>
        <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-1">
            <XCircle size={12} /> Rejected / Hidden
          </span>
          <p className="text-2xl font-black text-slate-700 mt-1">{stats.rejected}</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 max-w-md w-full">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cadet name, review text, email/mobile..."
              className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter size={12} /> Type:
            </span>
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'website', label: 'Website Reviews' },
              { id: 'blog', label: 'Blog Reviews' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTypeFilter(t.id)}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-full border transition-all cursor-pointer ${
                  typeFilter === t.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-slate-500 mr-1">Status:</span>
            {[
              { id: 'all', label: 'All Status' },
              { id: 'pending', label: `Pending (${stats.pending})` },
              { id: 'approved', label: 'Approved' },
              { id: 'rejected', label: 'Rejected' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStatusFilter(s.id)}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-full border transition-all cursor-pointer ${
                  statusFilter === s.id
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[11px] font-bold text-slate-500 mr-1">Rating:</span>
            {[0, 5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRatingFilter(star)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border transition-all cursor-pointer ${
                  ratingFilter === star
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {star === 0 ? 'All ★' : `${star}★`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Moderation Cards Grid */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => {
          const isPending = rev.status === 'pending'
          const isApproved = rev.status === 'approved'

          return (
            <div
              key={rev.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all space-y-4 shadow-sm relative overflow-hidden ${
                isPending
                  ? 'border-amber-300 bg-amber-50/20 ring-2 ring-amber-400/30'
                  : isApproved
                  ? 'border-slate-200 hover:border-emerald-300'
                  : 'border-slate-200 opacity-75'
              }`}
            >
              {isPending && (
                <div className="h-1 w-full bg-amber-500 absolute top-0 inset-x-0" />
              )}

              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  {rev.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={rev.avatar_url}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {rev.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span>{rev.name}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {rev.type === 'blog' ? 'Blog Comment' : 'Website Review'}
                      </span>
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-500">
                      {rev.email_or_mobile || 'No contact provided'} • Submitted{' '}
                      {new Date(rev.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className={
                          s <= rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }
                      />
                    ))}
                    <span className="text-xs font-black text-amber-900 ml-1">{rev.rating}.0</span>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      rev.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : rev.status === 'pending'
                        ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>
              </div>

              {/* Blog Article Link if blog review */}
              {rev.type === 'blog' && rev.blog_id && (
                <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-bold bg-indigo-50 border border-indigo-100 p-2.5 rounded-xl">
                  <ExternalLink size={14} className="shrink-0 text-indigo-600" />
                  <span>Blog Article Reference ID: {rev.blog_id}</span>
                  <Link
                    href={`/blogs/${rev.blog_id}`}
                    target="_blank"
                    className="ml-auto underline text-[11px] font-black hover:text-indigo-900"
                  >
                    View Blog Article →
                  </Link>
                </div>
              )}

              {/* Review Text */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed whitespace-pre-wrap">
                  “{rev.comment}”
                </p>
              </div>

              {/* Admin Reply Display if present */}
              {rev.admin_reply && (
                <div className="bg-amber-50/80 border-l-4 border-amber-500 p-3.5 rounded-r-2xl text-xs space-y-1 ml-4">
                  <span className="font-black text-amber-900 text-[10px] uppercase flex items-center gap-1">
                    <CornerDownRight size={12} /> LPA Official Admin Reply:
                  </span>
                  <p className="text-slate-900 font-bold">{rev.admin_reply}</p>
                </div>
              )}

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  {rev.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(rev.id, 'approved')}
                      className="px-3.5 py-2 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <CheckCircle2 size={15} />
                      <span>Approve Review</span>
                    </button>
                  )}

                  {rev.status !== 'rejected' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(rev.id, 'rejected')}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <XCircle size={15} />
                      <span>Reject</span>
                    </button>
                  )}

                  {rev.status !== 'pending' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(rev.id, 'pending')}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Set Pending
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingReview(rev)
                      setReplyText(rev.admin_reply || '')
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare size={15} />
                    <span>{rev.admin_reply ? 'Edit Admin Reply' : 'Add Reply'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingReview(rev)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete review"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {filteredReviews.length === 0 && (
          <div className="py-16 text-center text-slate-500 font-semibold text-xs bg-white rounded-3xl border border-slate-200 space-y-2">
            <ShieldAlert size={36} className="mx-auto text-slate-300" />
            <p className="text-sm font-black text-slate-700">No Matching Reviews Found</p>
            <p className="text-xs text-slate-400">Try adjusting your filter or search query.</p>
          </div>
        )}
      </div>

      {/* Admin Reply Modal */}
      {replyingReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setReplyingReview(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles size={18} className="text-amber-600" />
              <h3 className="font-display text-base font-black text-slate-900">
                Official Admin Reply to {replyingReview.name}
              </h3>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 italic">
              “{replyingReview.comment}”
            </div>

            <form onSubmit={handleSaveReply} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Official Academy Response
                </label>
                <textarea
                  required
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Thank you Rahul! Congratulations on your selection in Bihar Police physical test..."
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReplyingReview(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replyPending}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider hover:bg-amber-400 disabled:opacity-50"
                >
                  {replyPending ? 'Saving…' : 'Save Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingReview)}
        itemName={deletingReview ? `Review from "${deletingReview.name}"` : ''}
        isDeleting={deletePending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingReview(null)}
      />
    </div>
  )
}

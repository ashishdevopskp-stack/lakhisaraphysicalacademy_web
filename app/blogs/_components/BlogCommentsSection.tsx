'use client'

import { useState, useTransition } from 'react'
import { Star, MessageSquare, Send, CheckCircle2, User, Sparkles, UserCheck } from 'lucide-react'
import type { DbReview } from '@/app/lib/action/reviews'
import { submitReview } from '@/app/lib/action/reviews'

interface BlogCommentsSectionProps {
  blogId: string
  blogTitle: string
  approvedComments: DbReview[]
}

const RATING_LABELS: Record<number, string> = {
  1: 'Poor / ख़राब',
  2: 'Fair / ठीक-ठाक',
  3: 'Good / अच्छा',
  4: 'Very Good / बहुत अच्छा',
  5: 'Excellent / बेहतरीन Article!',
}

export function BlogCommentsSection({
  blogId,
  blogTitle,
  approvedComments,
}: BlogCommentsSectionProps) {
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState('')
  const [emailOrMobile, setEmailOrMobile] = useState('')
  const [comment, setComment] = useState('')

  const [pending, startTransition] = useTransition()
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter your name and comment.' })
      return
    }

    setStatusMsg(null)

    startTransition(async () => {
      const formData = new FormData()
      formData.append('type', 'blog')
      formData.append('blog_id', blogId)
      formData.append('name', name.trim())
      formData.append('email_or_mobile', emailOrMobile.trim())
      formData.append('rating', String(rating))
      formData.append('comment', comment.trim())

      const res = await submitReview(formData)
      if (res.success) {
        setStatusMsg({ type: 'success', text: res.message })
        setName('')
        setEmailOrMobile('')
        setComment('')
      } else {
        setStatusMsg({ type: 'error', text: res.message })
      }
    })
  }

  const activeStar = hoverRating || rating

  return (
    <div className="mt-14 pt-10 border-t border-slate-200 space-y-10">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider">
          <Sparkles size={14} />
          <span>Reader Feedback &amp; Reviews</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight">
          What do you think about this article?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
          Lakhisarai Physical Academy ke is article ke baare mein apna experience &amp; feedback share karein.
        </p>
      </div>

      {/* Submission Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <h4 className="font-display text-base font-black text-slate-900 flex items-center gap-2">
          <MessageSquare size={18} className="text-amber-600" />
          <span>Leave a Rating &amp; Comment</span>
        </h4>

        {statusMsg?.type === 'success' ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 size={22} />
            </div>
            <h5 className="text-sm font-black text-emerald-950">Thank you for your comment!</h5>
            <p className="text-xs font-semibold text-emerald-800 leading-relaxed max-w-md mx-auto">
              {statusMsg.text}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {statusMsg?.type === 'error' && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                {statusMsg.text}
              </div>
            )}

            {/* Interactive Rating Selector */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4 space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-amber-900">
                Rate this Article *
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <Star
                        size={24}
                        className={
                          star <= activeStar
                            ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                            : 'text-slate-300 fill-slate-100'
                        }
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-800 ml-2">
                  {RATING_LABELS[activeStar] || ''}
                </span>
              </div>
            </div>

            {/* Inputs: Name & Email/Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amit Kumar"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email / Mobile (Optional)</label>
                <input
                  type="text"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  placeholder="Contact info"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Comment Box */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Comment *</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like about this blog post? Ask a question or share your thoughts..."
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={pending}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-black text-xs uppercase tracking-wider hover:bg-slate-800 disabled:opacity-50 flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Send size={15} />
              <span>{pending ? 'Submitting…' : 'Submit Comment for Review'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Approved Blog Comments Display List */}
      <div className="space-y-4">
        <h4 className="font-display text-base font-black text-slate-900 flex items-center justify-between">
          <span>Article Reviews &amp; Comments ({approvedComments.length})</span>
        </h4>

        {approvedComments.length > 0 ? (
          <div className="space-y-3">
            {approvedComments.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-800 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {rev.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <UserCheck size={10} /> Reader
                        </span>
                      </h5>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(rev.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={
                          star <= rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs font-medium text-slate-700 leading-relaxed pl-12">
                  {rev.comment}
                </p>

                {/* Admin Reply */}
                {rev.admin_reply && (
                  <div className="ml-12 mt-2 bg-amber-50 border-l-2 border-amber-500 p-3 rounded-r-xl text-xs space-y-1">
                    <span className="font-extrabold text-amber-900 block text-[10px] uppercase">
                      Academy Response:
                    </span>
                    <p className="text-slate-800 font-semibold">{rev.admin_reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 font-medium">
            No comments yet on this article. Be the first to leave a comment!
          </div>
        )}
      </div>
    </div>
  )
}

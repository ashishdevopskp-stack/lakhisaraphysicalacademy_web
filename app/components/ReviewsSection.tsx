'use client'

import { useState } from 'react'
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight, Plus, Sparkles, UserCheck } from 'lucide-react'
import type { DbReview, ReviewStats } from '@/app/lib/action/reviews'
import { ReviewSubmitModal } from './ReviewSubmitModal'

export function ReviewsSection({
  reviews,
  stats,
}: {
  reviews: DbReview[]
  stats: ReviewStats
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)

  const hasReviews = reviews.length > 0

  function prevSlide() {
    if (reviews.length === 0) return
    setActiveIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  function nextSlide() {
    if (reviews.length === 0) return
    setActiveIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Header & Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Student Feedback &amp; Reviews</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              What Our Cadets Say About Lakhisarai Physical Academy
            </h2>
            <p className="text-sm font-medium text-slate-400">
              Real experiences from students who trained with us for Bihar Police, SSC GD, Army, and Defense physical examinations.
            </p>
          </div>

          {/* Aggregate Rating Score Card */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 shrink-0 flex items-center gap-5 shadow-xl">
            <div className="text-center border-r border-slate-700/80 pr-5">
              <span className="font-display text-4xl sm:text-5xl font-black text-amber-400 leading-none">
                {stats.average > 0 ? stats.average.toFixed(1) : '5.0'}
              </span>
              <span className="text-xs font-extrabold text-slate-400 block mt-1">out of 5.0</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-300">
                Based on <span className="text-amber-400 font-extrabold">{stats.total}</span> Verified Reviews
              </p>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-black text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                <Plus size={14} />
                <span>Share Your Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Slider / Grid */}
        {hasReviews ? (
          <div className="space-y-6">
            {/* Desktop Grid View (Show up to 3 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-800/60 border border-slate-700/70 hover:border-amber-500/40 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-amber-500/5 relative group"
                >
                  <div className="space-y-4">
                    {/* Header: Stars & Quote Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={
                              star <= rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-slate-700 text-slate-700'
                            }
                          />
                        ))}
                      </div>
                      <MessageSquareQuote size={24} className="text-amber-500/30 group-hover:text-amber-500/60 transition-colors" />
                    </div>

                    {/* Review Comment Text */}
                    <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed italic">
                      “{rev.comment}”
                    </p>

                    {/* Admin Reply Box if present */}
                    {rev.admin_reply && (
                      <div className="mt-3 bg-amber-500/10 border-l-2 border-amber-400 p-3 rounded-r-xl text-xs space-y-1">
                        <span className="font-extrabold text-amber-400 block uppercase tracking-wider text-[10px]">
                          LPA Admin Response:
                        </span>
                        <p className="text-slate-300 font-semibold">{rev.admin_reply}</p>
                      </div>
                    )}
                  </div>

                  {/* Student Bio Footer */}
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-700/60 mt-5">
                    {rev.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={rev.avatar_url}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-sm flex items-center justify-center shrink-0 border border-amber-300">
                        {rev.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-sm text-white truncate">{rev.name}</h4>
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <UserCheck size={12} />
                        <span>Verified Cadet</span>
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-500 font-medium">
                      {new Date(rev.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <p className="text-xs font-semibold text-slate-400">
                Showing top verified student reviews. Click below to add your experience.
              </p>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xs uppercase tracking-wider hover:scale-[1.02] shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
              >
                + Share Your Review Now
              </button>
            </div>
          </div>
        ) : (
          /* Empty Reviews State */
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-10 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <Star size={28} />
            </div>
            <h3 className="text-lg font-black text-white">Be the First to Review!</h3>
            <p className="text-xs font-semibold text-slate-400">
              No public reviews have been featured yet. Be the first student to share your experience with Lakhisarai Physical Academy.
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer"
            >
              Write First Review
            </button>
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      <ReviewSubmitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="website"
      />
    </section>
  )
}

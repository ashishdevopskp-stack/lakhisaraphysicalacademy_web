'use client'

import { useState, useTransition } from 'react'
import { Star, X, Upload, CheckCircle2, Loader2, Sparkles, User } from 'lucide-react'
import { submitReview } from '@/app/lib/action/reviews'

interface ReviewSubmitModalProps {
  isOpen: boolean
  onClose: () => void
  type?: 'website' | 'blog'
  blogId?: string
  blogTitle?: string
  onSubmitted?: () => void
}

const RATING_LABELS: Record<number, string> = {
  1: 'Poor / ख़राब',
  2: 'Fair / ठीक-ठाक',
  3: 'Good / अच्छा',
  4: 'Very Good / बहुत अच्छा',
  5: 'Excellent / बेहतरीन (Best Academy!)',
}

export function ReviewSubmitModal({
  isOpen,
  onClose,
  type = 'website',
  blogId,
  blogTitle,
  onSubmitted,
}: ReviewSubmitModalProps) {
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState('')
  const [emailOrMobile, setEmailOrMobile] = useState('')
  const [comment, setComment] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const [pending, startTransition] = useTransition()
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  if (!isOpen) return null

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setStatusMsg({ type: 'error', text: 'Photo size must be under 4MB.' })
        return
      }
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) {
      setStatusMsg({ type: 'error', text: 'Please fill in your name and review message.' })
      return
    }

    setStatusMsg(null)

    startTransition(async () => {
      const formData = new FormData()
      formData.append('type', type)
      if (type === 'blog' && blogId) {
        formData.append('blog_id', blogId)
      }
      formData.append('name', name.trim())
      formData.append('email_or_mobile', emailOrMobile.trim())
      formData.append('rating', String(rating))
      formData.append('comment', comment.trim())
      if (avatarFile) {
        formData.append('avatar', avatarFile)
      }

      const res = await submitReview(formData)
      if (res.success) {
        setStatusMsg({ type: 'success', text: res.message })
        if (onSubmitted) onSubmitted()
      } else {
        setStatusMsg({ type: 'error', text: res.message })
      }
    })
  }

  const activeStar = hoverRating || rating

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 absolute top-0 inset-x-0" />

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header Title */}
        <div className="mb-5 pr-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#ea580c] text-[11px] font-black uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            <span>Share Your Experience</span>
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {type === 'blog' ? 'Article Review / Feedback' : 'Rate Lakhisarai Physical Academy'}
          </h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            {type === 'blog' && blogTitle
              ? `Reviewing: "${blogTitle}"`
              : 'Help future students by sharing your physical training & hostel experience.'}
          </p>
        </div>

        {statusMsg?.type === 'success' ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={26} />
            </div>
            <h3 className="text-base font-black text-emerald-950">Review Submitted Successfully!</h3>
            <p className="text-xs font-semibold text-emerald-800 leading-relaxed max-w-sm mx-auto">
              {statusMsg.text}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {statusMsg?.type === 'error' && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                {statusMsg.text}
              </div>
            )}

            {/* Interactive Star Rating Selector */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                Your Overall Rating *
              </label>
              <div className="flex items-center justify-center gap-1.5 py-1">
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
                      size={28}
                      className={
                        star <= activeStar
                          ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                          : 'text-slate-300 fill-slate-100'
                      }
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs font-extrabold text-amber-700 h-4">
                {RATING_LABELS[activeStar] || 'Select Rating'}
              </p>
            </div>

            {/* Name & Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email or Mobile (Optional)</label>
                <input
                  type="text"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  placeholder="9876543210 or email"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Review Comment Box */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Review / Experience *
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details about physical preparation, hostel facilities, trainers, and your achievements..."
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
              />
            </div>

            {/* Optional Photo Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Profile Photo (Optional)</label>
              <div className="flex items-center gap-3">
                <label className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-3 bg-slate-50 hover:bg-amber-50/40 text-slate-600 text-xs font-bold transition-all cursor-pointer">
                  <Upload size={16} className="text-amber-600 shrink-0" />
                  <span>{avatarFile ? avatarFile.name : 'Upload Your Photo'}</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>

                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                )}
              </div>
            </div>

            {/* Footer Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={pending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xs uppercase tracking-wider hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
              >
                {pending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting Review…</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Submit Review for Moderation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

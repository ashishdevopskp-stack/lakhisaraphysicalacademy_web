'use client'

import { useState, useRef, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import type { DbBlog } from '@/app/lib/action/blogs'
import { BLOG_CATEGORY_LABELS } from '@/app/lib/blogs-data'
import ThumbnailRatioSelector from "@/app/admin/_components/ThumbnailRatioSelector"

const MAX_IMAGE_MB = 10
const MAX_PDF_MB = 15
const URL_PATTERN = /^https?:\/\//
const IMAGE_MAX_DIMENSION = 1600

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

function SubmitButton({ label, blocked }: { label: string; blocked: boolean }) {
  const { pending } = useFormStatus()
  const disabled = pending || blocked
  return (
    <button
      type="submit"
      disabled={disabled}
      className="btn-orange w-full py-3.5 text-sm font-black tracking-wide shadow-xl shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {pending && <Spinner />}
      {pending ? 'Saving & Publishing…' : label}
    </button>
  )
}

async function compressImageToWebp(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return file

  const bitmap = await createImageBitmap(file).catch(() => null)
  if (!bitmap) return file

  let { width, height } = bitmap
  if (Math.max(width, height) > IMAGE_MAX_DIMENSION) {
    const scale = IMAGE_MAX_DIMENSION / Math.max(width, height)
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return file
  ctx.drawImage(bitmap, 0, 0, width, height)

  const tryEncode = (type: string, quality: number) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))

  let blob = await tryEncode('image/webp', 0.82)
  if (!blob) blob = await tryEncode('image/jpeg', 0.82)
  if (!blob || blob.size >= file.size) return file

  const newName = file.name.replace(/\.[^.]+$/, '') + '.webp'
  return new File([blob], newName, { type: 'image/webp' })
}

export function BlogForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbBlog
}) {
  const [fileError, setFileError] = useState<string | null>(null)
  const [pdfFileError, setPdfFileError] = useState<string | null>(null)
  const [videoUrlError, setVideoUrlError] = useState<string | null>(null)
  const [pdfUrlError, setPdfUrlError] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressedInfo, setCompressedInfo] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const imageInputRef = useRef<HTMLInputElement>(null)
  const pdfUrlInputRef = useRef<HTMLInputElement>(null)

  // Custom Category state
  const isCategoryKnown = BLOG_CATEGORY_LABELS.includes(initialData?.category as any)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialData?.category
      ? isCategoryKnown
        ? initialData.category
        : '__custom__'
      : BLOG_CATEGORY_LABELS[0]
  )
  const [customCategoryInput, setCustomCategoryInput] = useState<string>(
    initialData?.category && !isCategoryKnown ? initialData.category : ''
  )

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      setFileError(null)
      setCompressedInfo(null)
      return
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setFileError(`Cover image must be under ${MAX_IMAGE_MB}MB.`)
      e.target.value = ''
      setCompressedInfo(null)
      return
    }
    setFileError(null)

    setIsCompressing(true)
    compressImageToWebp(file)
      .then((compressed) => {
        if (compressed !== file && imageInputRef.current) {
          const container = new DataTransfer()
          container.items.add(compressed)
          imageInputRef.current.files = container.files
          setCompressedInfo(
            `Compressed: ${(file.size / 1024).toFixed(0)}KB ➔ ${(compressed.size / 1024).toFixed(0)}KB (WebP)`
          )
        } else {
          setCompressedInfo(`Original size: ${(file.size / 1024).toFixed(0)}KB`)
        }
      })
      .catch(() => setCompressedInfo(null))
      .finally(() => setIsCompressing(false))
  }

  function handlePdfFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      setPdfFileError(null)
      return
    }
    if (file.size > MAX_PDF_MB * 1024 * 1024) {
      setPdfFileError(`PDF must be under ${MAX_PDF_MB}MB.`)
      e.target.value = ''
      return
    }
    setPdfFileError(null)
    if (pdfUrlInputRef.current) pdfUrlInputRef.current.value = ''
    setPdfUrlError(null)
  }

  function validateUrl(value: string, setError: (v: string | null) => void) {
    const trimmed = value.trim()
    if (trimmed && !URL_PATTERN.test(trimmed)) {
      setError('Must start with http:// or https://')
    } else {
      setError(null)
    }
  }

  const finalCategory =
    selectedCategory === '__custom__' ? customCategoryInput.trim() || 'General' : selectedCategory

  const blocked = Boolean(
    fileError || pdfFileError || videoUrlError || pdfUrlError || isCompressing
  )

  return (
    <form
      action={(formData) => {
        formData.set('category', finalCategory)
        startTransition(() => {
          action(formData)
        })
      }}
      className="space-y-6"
    >
      {/* Thumbnail Image & Aspect Ratio Selector */}
      <ThumbnailRatioSelector
        defaultThumbnailUrl={initialData?.image_url}
        defaultAspectRatio={initialData?.aspect_ratio || "16:9"}
        label="Blog Cover / Thumbnail Image & Ratio"
      />

      {/* Cover Image Upload Zone */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
        <label htmlFor="image" className="block text-xs font-black uppercase tracking-wider text-slate-800">
          {initialData ? 'Replace Cover Image (Optional)' : 'Blog Cover Image'}
        </label>
        <input
          ref={imageInputRef}
          id="image"
          name="image"
          type="file"
          accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.bmp,.heic"
          onChange={handleImageChange}
          className="w-full text-xs text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-slate-100 file:text-xs file:font-black file:text-slate-700 hover:file:bg-slate-200 file:cursor-pointer cursor-pointer"
        />
        {fileError && <p className="text-xs font-bold text-red-600">{fileError}</p>}
        {isCompressing && <p className="text-xs font-bold text-slate-500">⚡ Converting cover image to WebP…</p>}
        {!isCompressing && compressedInfo && (
          <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 inline-block">
            {compressedInfo}
          </p>
        )}
        <p className="text-[11px] text-slate-400">
          All image formats supported. Images are auto-compressed to WebP format in KB to keep loading instant.
        </p>
      </div>

      {/* Title & Subtitle */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <label htmlFor="title" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
            Blog Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={200}
            defaultValue={initialData?.title}
            placeholder="e.g. How to Improve Your 1600m Running Timing"
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
          />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
            Subtitle / Summary <span className="text-slate-400">(Optional)</span>
          </label>
          <input
            id="subtitle"
            name="subtitle"
            type="text"
            maxLength={300}
            defaultValue={initialData?.subtitle ?? undefined}
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
          />
        </div>
      </div>

      {/* Author & Category Dropdown with Custom Mention */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="author" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              maxLength={100}
              defaultValue={initialData?.author ?? 'Ganesh Sir'}
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Blog Category
            </label>
            <select
              id="category"
              name="catSelect"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer"
            >
              {BLOG_CATEGORY_LABELS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="__custom__">➕ Custom (Mention)...</option>
            </select>
          </div>
        </div>

        {/* Custom Mention Input Box */}
        {selectedCategory === '__custom__' && (
          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2 animate-[fadeIn_0.15s_ease-out]">
            <label htmlFor="customCategoryInput" className="block text-xs font-black uppercase tracking-wider text-[#ea580c]">
              Enter Custom Category Name (Mention):
            </label>
            <input
              id="customCategoryInput"
              type="text"
              required
              value={customCategoryInput}
              onChange={(e) => setCustomCategoryInput(e.target.value)}
              placeholder="e.g. Special Army Fitness, Medical Tips, High Jump Guide"
              className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        )}
      </div>

      {/* Date & Reading Time */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="publishDate" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Publish Date
            </label>
            <input
              id="publishDate"
              name="publishDate"
              type="date"
              defaultValue={initialData?.publish_date ?? new Date().toISOString().slice(0, 10)}
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
            />
          </div>

          <div>
            <label htmlFor="readingTime" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Reading Time
            </label>
            <input
              id="readingTime"
              name="readingTime"
              type="text"
              maxLength={30}
              defaultValue={initialData?.reading_time ?? '5 min read'}
              placeholder="e.g. 5 min read"
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
            Blog Article Body / Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={7}
            defaultValue={initialData?.content ?? undefined}
            placeholder="Full article content body"
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all resize-y"
          />
        </div>
      </div>

      <SubmitButton label={submitLabel} blocked={blocked} />
    </form>
  )
}
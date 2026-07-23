'use client'

import { useState, useRef, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import type { DbBlog } from '@/app/lib/action/blogs'
import { BLOG_CATEGORY_LABELS } from '@/app/lib/blogs-data'

const MAX_IMAGE_MB = 5
const MAX_IMAGE_COMPRESSED_TARGET_MB = 1.5 // we try to get under this after compression
const MAX_PDF_MB = 10
const URL_PATTERN = /^https?:\/\//
const IMAGE_MAX_DIMENSION = 1600 // px, longest side

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
      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
    >
      {pending && <Spinner />}
      {pending ? 'Saving…' : label}
    </button>
  )
}

/** Resizes + re-encodes an image in the browser to cut upload size before it hits the server. */
async function compressImage(file: File): Promise<File> {
  // Skip formats that don't benefit / can break canvas decode (e.g. animated gifs, svg)
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return file

  const bitmap = await createImageBitmap(file).catch(() => null)
  if (!bitmap) return file // fall back to original if decode fails

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

  // Try WebP first, fall back to JPEG if the browser can't encode it
  const tryEncode = (type: string, quality: number) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))

  let blob = await tryEncode('image/webp', 0.8)
  let ext = 'webp'
  if (!blob) {
    blob = await tryEncode('image/jpeg', 0.82)
    ext = 'jpg'
  }
  if (!blob) return file // give up, use original

  // If compression somehow made it bigger (rare, e.g. tiny already-optimized images), keep original
  if (blob.size >= file.size) return file

  const newName = file.name.replace(/\.[^.]+$/, '') + `.${ext}`
  return new File([blob], newName, { type: blob.type })
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

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setCompressedInfo(null)
    if (!file) {
      setFileError(null)
      return
    }
    if (!file.type.startsWith('image/')) {
      setFileError('Please choose an image file.')
      e.target.value = ''
      return
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setFileError(`Image must be under ${MAX_IMAGE_MB}MB.`)
      e.target.value = ''
      return
    }
    setFileError(null)
    setIsCompressing(true)
    try {
      const compressed = await compressImage(file)
      if (compressed !== file && imageInputRef.current) {
        const dt = new DataTransfer()
        dt.items.add(compressed)
        imageInputRef.current.files = dt.files
        const savedPct = Math.round((1 - compressed.size / file.size) * 100)
        setCompressedInfo(
          savedPct > 0
            ? `Compressed to ${(compressed.size / 1024 / 1024).toFixed(2)}MB (${savedPct}% smaller).`
            : `Using original (${(file.size / 1024 / 1024).toFixed(2)}MB).`
        )
      }
    } catch {
      // Compression failing is non-fatal — original file still gets uploaded.
      setCompressedInfo(null)
    } finally {
      setIsCompressing(false)
    }
  }

  function handlePdfFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      setPdfFileError(null)
      return
    }
    if (file.type !== 'application/pdf') {
      setPdfFileError('Please choose a PDF file.')
      e.target.value = ''
      return
    }
    if (file.size > MAX_PDF_MB * 1024 * 1024) {
      setPdfFileError(`PDF must be under ${MAX_PDF_MB}MB.`)
      e.target.value = ''
      return
    }
    setPdfFileError(null)
    // If a file is chosen, clear the URL field so we don't send both.
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

  const blocked = Boolean(
    fileError || pdfFileError || videoUrlError || pdfUrlError || isCompressing
  )

  return (
    <form
      action={(formData) => {
        // Wrapping in a transition just keeps the UI responsive while the
        // server action (which includes uploads) runs.
        startTransition(() => {
          action(formData)
        })
      }}
      className="space-y-5"
    >
      {initialData?.image_url && (
        <div>
          <p className="text-sm font-medium mb-2 text-gray-700">Current Cover Image</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={initialData.image_url}
            alt={initialData.title}
            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
          />
        </div>
      )}

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1.5 text-gray-700">
          {initialData ? 'Replace Cover Image (optional)' : 'Cover Image'}
        </label>
        <input
          ref={imageInputRef}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer cursor-pointer"
        />
        {fileError && <p className="text-xs text-red-600 mt-1.5">{fileError}</p>}
        {isCompressing && (
          <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5">
            <Spinner /> Compressing image…
          </p>
        )}
        {!isCompressing && compressedInfo && (
          <p className="text-xs text-green-600 mt-1.5">{compressedInfo}</p>
        )}
        <p className="text-xs text-gray-400 mt-1.5">
          JPG, PNG, or WebP. Max {MAX_IMAGE_MB}MB — large images are auto-compressed before upload.
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
        <input
          id="title" name="title" type="text" required maxLength={200}
          defaultValue={initialData?.title}
          placeholder="e.g. How to Improve Your 1.6 KM Run Time"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium mb-1.5 text-gray-700">
          Subtitle <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="subtitle" name="subtitle" type="text" maxLength={300}
          defaultValue={initialData?.subtitle ?? undefined}
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1.5 text-gray-700">Author</label>
          <input
            id="author" name="author" type="text" required maxLength={100}
            defaultValue={initialData?.author}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1.5 text-gray-700">Category</label>
          <select
            id="category" name="category" required
            defaultValue={initialData?.category ?? BLOG_CATEGORY_LABELS[0]}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            {BLOG_CATEGORY_LABELS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="publishDate" className="block text-sm font-medium mb-1.5 text-gray-700">Publish Date</label>
          <input
            id="publishDate" name="publishDate" type="date"
            defaultValue={initialData?.publish_date ?? new Date().toISOString().slice(0, 10)}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="readingTime" className="block text-sm font-medium mb-1.5 text-gray-700">
            Reading Time <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="readingTime" name="readingTime" type="text" maxLength={30}
            defaultValue={initialData?.reading_time ?? undefined}
            placeholder="e.g. 6 min read"
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1.5 text-gray-700">
          Content <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="content" name="content" rows={6}
          defaultValue={initialData?.content ?? undefined}
          placeholder="Full article body"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors resize-y"
        />
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1.5 text-gray-700">
          Video URL <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="videoUrl"
          name="videoUrl"
          type="url"
          placeholder="https://..."
          defaultValue={initialData?.video_url ?? undefined}
          onBlur={(e) => validateUrl(e.target.value, setVideoUrlError)}
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
        {videoUrlError && <p className="text-xs text-red-600 mt-1.5">{videoUrlError}</p>}
      </div>

      <div className="border border-gray-200 rounded-lg p-4 space-y-3">
        <p className="text-sm font-medium text-gray-700">PDF Attachment <span className="text-gray-400 font-normal">(optional)</span></p>

        {initialData?.pdf_url && (
          <a
            href={initialData.pdf_url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-indigo-600 hover:underline block"
          >
            Current PDF ↗
          </a>
        )}

        <div>
          <label htmlFor="pdfFile" className="block text-xs font-medium mb-1.5 text-gray-600">
            Upload a PDF
          </label>
          <input
            id="pdfFile"
            name="pdfFile"
            type="file"
            accept="application/pdf"
            onChange={handlePdfFileChange}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer cursor-pointer"
          />
          {pdfFileError && <p className="text-xs text-red-600 mt-1.5">{pdfFileError}</p>}
          <p className="text-xs text-gray-400 mt-1.5">Max {MAX_PDF_MB}MB.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or link one</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div>
          <label htmlFor="pdfUrl" className="block text-xs font-medium mb-1.5 text-gray-600">
            PDF URL
          </label>
          <input
            ref={pdfUrlInputRef}
            id="pdfUrl"
            name="pdfUrl"
            type="url"
            placeholder="https://..."
            defaultValue={initialData?.pdf_url ?? undefined}
            onBlur={(e) => validateUrl(e.target.value, setPdfUrlError)}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
          {pdfUrlError && <p className="text-xs text-red-600 mt-1.5">{pdfUrlError}</p>}
          <p className="text-xs text-gray-400 mt-1.5">
            Uploading a file above takes priority over this link.
          </p>
        </div>
      </div>

      <SubmitButton label={submitLabel} blocked={blocked} />
    </form>
  )
}
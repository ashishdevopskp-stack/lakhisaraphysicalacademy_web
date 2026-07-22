'use client'

import { useState } from 'react'
import type { DbBlog } from '@/app/lib/action/blogs'
import { BLOG_CATEGORY_LABELS } from '@/app/lib/blogs-data'

const MAX_IMAGE_MB = 5
const URL_PATTERN = /^https?:\/\//

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
  const [videoUrlError, setVideoUrlError] = useState<string | null>(null)
  const [pdfUrlError, setPdfUrlError] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
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
  }

  function validateUrl(value: string, setError: (v: string | null) => void) {
    const trimmed = value.trim()
    if (trimmed && !URL_PATTERN.test(trimmed)) {
      setError('Must start with http:// or https://')
    } else {
      setError(null)
    }
  }

  return (
    <form action={action} className="space-y-5">
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
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer cursor-pointer"
        />
        {fileError && <p className="text-xs text-red-600 mt-1.5">{fileError}</p>}
        <p className="text-xs text-gray-400 mt-1.5">JPG, PNG, or WebP. Max {MAX_IMAGE_MB}MB.</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div>
          <label htmlFor="pdfUrl" className="block text-sm font-medium mb-1.5 text-gray-700">
            PDF URL <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="pdfUrl"
            name="pdfUrl"
            type="url"
            placeholder="https://..."
            defaultValue={initialData?.pdf_url ?? undefined}
            onBlur={(e) => validateUrl(e.target.value, setPdfUrlError)}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
          {pdfUrlError && <p className="text-xs text-red-600 mt-1.5">{pdfUrlError}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  )
}
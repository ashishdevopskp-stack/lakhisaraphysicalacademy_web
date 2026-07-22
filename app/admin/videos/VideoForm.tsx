'use client'

import { useState } from 'react'
import type { DbVideo } from '@/app/lib/action/videos'
import { VIDEO_CATEGORY_LABELS, VIDEO_STATUSES } from '@/app/lib/videos-data'

const MAX_IMAGE_MB = 5
const YOUTUBE_PATTERN = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/

export function VideoForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbVideo
}) {
  const [fileError, setFileError] = useState<string | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)

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

  function handleUrlBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value.trim()
    if (value && !YOUTUBE_PATTERN.test(value)) {
      setUrlError('Please enter a valid YouTube URL.')
    } else {
      setUrlError(null)
    }
  }

  return (
    <form action={action} className="space-y-5">
      {initialData?.thumbnail_url && (
        <div>
          <p className="text-sm font-medium mb-2 text-gray-700">Current Thumbnail</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={initialData.thumbnail_url}
            alt={initialData.title}
            className="w-40 h-24 object-cover rounded-lg border border-gray-200"
          />
        </div>
      )}

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium mb-1.5 text-gray-700">
          {initialData ? 'Replace Thumbnail (optional)' : 'Thumbnail (optional)'}
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
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
          placeholder="e.g. Army Physical Test Guidance — Complete Breakdown"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1.5 text-gray-700">
          Description <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="description" name="description" rows={3} maxLength={500}
          defaultValue={initialData?.description ?? undefined}
          placeholder="Short description shown on the video card"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors resize-none"
        />
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1.5 text-gray-700">YouTube Video URL</label>
        <input
          id="videoUrl" name="videoUrl" type="url" required
          defaultValue={initialData?.video_url}
          onBlur={handleUrlBlur}
          placeholder="https://youtube.com/watch?v=…"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
        {urlError && <p className="text-xs text-red-600 mt-1.5">{urlError}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1.5 text-gray-700">Category</label>
          <select
            id="category" name="category" required
            defaultValue={initialData?.category ?? VIDEO_CATEGORY_LABELS[0]}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            {VIDEO_CATEGORY_LABELS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1.5 text-gray-700">Status</label>
          <select
            id="status" name="status" required
            defaultValue={initialData?.status ?? 'Published'}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            {VIDEO_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:items-end">
        <div>
          <label htmlFor="publishDate" className="block text-sm font-medium mb-1.5 text-gray-700">Publish Date</label>
          <input
            id="publishDate" name="publishDate" type="date" required
            defaultValue={initialData?.publish_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 sm:pb-2.5">
          <input
            id="featured" name="featured" type="checkbox"
            defaultChecked={initialData?.featured ?? false}
            className="w-4 h-4 rounded border-gray-300 accent-indigo-600"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured video</label>
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
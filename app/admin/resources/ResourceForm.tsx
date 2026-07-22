'use client'

import { useState } from 'react'
import type { DbResource } from '@/app/lib/action/resources'
import { CATEGORIES } from '@/app/lib/resourses-data'

const MAX_FILE_MB = 10
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']
const URL_PATTERN = /^https?:\/\//

export function ResourceForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbResource
}) {
  const [fileError, setFileError] = useState<string | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      setFileError(null)
      return
    }
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setFileError(`File type not allowed. Use: ${ALLOWED_EXTENSIONS.join(', ')}`)
      e.target.value = ''
      return
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File must be under ${MAX_FILE_MB}MB.`)
      e.target.value = ''
      return
    }
    setFileError(null)
  }

  function handleUrlBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value.trim()
    setUrlError(value && !URL_PATTERN.test(value) ? 'Must start with http:// or https://' : null)
  }

  return (
    <form action={action} className="space-y-5">
      {initialData?.file_url && (
        <div>
          <p className="text-sm font-medium mb-2 text-gray-700">Current File</p>
          <a
            href={initialData.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:underline"
          >
            View current file
          </a>
        </div>
      )}

      <div>
        <label htmlFor="file" className="block text-sm font-medium mb-1.5 text-gray-700">
          {initialData ? 'Replace File (optional)' : 'File'}
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer cursor-pointer"
        />
        {fileError && <p className="text-xs text-red-600 mt-1.5">{fileError}</p>}
        <p className="text-xs text-gray-400 mt-1.5">PDF, DOC, DOCX, JPG, or PNG. Max {MAX_FILE_MB}MB.</p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
        <input
          id="title" name="title" type="text" required maxLength={200}
          defaultValue={initialData?.title}
          placeholder="e.g. Physical Standards Chart 2026"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1.5 text-gray-700">Description</label>
        <textarea
          id="description" name="description" required rows={4} maxLength={500}
          defaultValue={initialData?.description}
          placeholder="Short description shown on the resource card"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors resize-y"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1.5 text-gray-700">Category</label>
          <select
            id="category" name="category" required
            defaultValue={initialData?.category ?? CATEGORIES[0].label}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c.label} value={c.label}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="publishDate" className="block text-sm font-medium mb-1.5 text-gray-700">Publish Date</label>
          <input
            id="publishDate" name="publishDate" type="date"
            defaultValue={initialData?.publish_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1.5 text-gray-700">
          Video URL <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="videoUrl"
          name="videoUrl"
          type="url"
          placeholder="https://youtube.com/…"
          defaultValue={initialData?.video_url ?? undefined}
          onBlur={handleUrlBlur}
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
        {urlError && <p className="text-xs text-red-600 mt-1.5">{urlError}</p>}
        <p className="mt-1.5 text-xs text-gray-400">
          A &quot;Watch Video&quot; button will show on this resource if set.
        </p>
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
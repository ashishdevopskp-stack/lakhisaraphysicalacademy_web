'use client'

import { useState } from 'react'
import type { DbResult } from '@/app/lib/action/results'
import { DEPARTMENTS, STATUS_OPTIONS } from '@/app/lib/results-data'

const MAX_IMAGE_MB = 5
const URL_PATTERN = /^https?:\/\//

export function ResultForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbResult
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
    setUrlError(value && !URL_PATTERN.test(value) ? 'Must start with http:// or https://' : null)
  }

  return (
    <form action={action} className="space-y-5">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      {initialData?.photo_url && (
        <div>
          <p className="text-sm font-medium mb-2 text-gray-700">Current Photo</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={initialData.photo_url}
            alt={initialData.name}
            className="w-24 h-24 rounded-full object-cover border border-gray-200"
          />
        </div>
      )}

      <div>
        <label htmlFor="photo" className="block text-sm font-medium mb-1.5 text-gray-700">
          {initialData ? 'Replace Photo (optional)' : 'Photo (optional)'}
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer cursor-pointer"
        />
        {fileError && <p className="text-xs text-red-600 mt-1.5">{fileError}</p>}
        <p className="text-xs text-gray-400 mt-1.5">JPG, PNG, or WebP. Max {MAX_IMAGE_MB}MB.</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-gray-700">Full Name</label>
        <input
          id="name" name="name" type="text" required maxLength={100}
          defaultValue={initialData?.name}
          placeholder="e.g. Rohit Kumar"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="post" className="block text-sm font-medium mb-1.5 text-gray-700">Selected Post</label>
          <input
            id="post" name="post" type="text" required maxLength={100}
            defaultValue={initialData?.post}
            placeholder="e.g. Agniveer (GD)"
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="exam" className="block text-sm font-medium mb-1.5 text-gray-700">Exam Name</label>
          <input
            id="exam" name="exam" type="text" required maxLength={100}
            defaultValue={initialData?.exam}
            placeholder="e.g. Army Agniveer"
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="department" className="block text-sm font-medium mb-1.5 text-gray-700">Department / Category</label>
          <select
            id="department" name="department" required
            defaultValue={initialData?.department ?? DEPARTMENTS[0]}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1.5 text-gray-700">Status</label>
          <select
            id="status" name="status" required
            defaultValue={initialData?.status ?? 'Selected'}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="district" className="block text-sm font-medium mb-1.5 text-gray-700">District</label>
          <input
            id="district" name="district" type="text" required maxLength={100}
            defaultValue={initialData?.district}
            placeholder="e.g. Lakhisarai"
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium mb-1.5 text-gray-700">Year</label>
          <input
            id="year" name="year" type="text" required maxLength={10}
            defaultValue={initialData?.year}
            placeholder="e.g. 2026"
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="rankScore" className="block text-sm font-medium mb-1.5 text-gray-700">
          Rank / Score <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="rankScore" name="rankScore" type="text" maxLength={50}
          defaultValue={initialData?.rank_score ?? undefined}
          placeholder="e.g. AIR 214"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="testimonial" className="block text-sm font-medium mb-1.5 text-gray-700">
          Testimonial <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="testimonial" name="testimonial" rows={4} maxLength={1000}
          defaultValue={initialData?.testimonial ?? undefined}
          placeholder="What this student said about training at the academy"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors resize-y"
        />
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1.5 text-gray-700">
          YouTube URL <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="videoUrl"
          name="videoUrl"
          type="url"
          placeholder="https://..."
          defaultValue={initialData?.video_url ?? undefined}
          onBlur={handleUrlBlur}
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
        {urlError && <p className="text-xs text-red-600 mt-1.5">{urlError}</p>}
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
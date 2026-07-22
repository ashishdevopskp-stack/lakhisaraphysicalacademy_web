'use client'

import { useState } from 'react'
import type { DbEvent } from '@/app/lib/action/events'
import { CATEGORIES } from '@/app/lib/events-data'

const URL_PATTERN = /^https?:\/\//

export function EventForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbEvent
}) {
  const [urlError, setUrlError] = useState<string | null>(null)

  function handleUrlBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value.trim()
    setUrlError(value && !URL_PATTERN.test(value) ? 'Must start with http:// or https://' : null)
  }

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
        <input
          id="title" name="title" type="text" required maxLength={200}
          defaultValue={initialData?.title}
          placeholder="e.g. Guest Physical Test"
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
          <label htmlFor="category" className="block text-sm font-medium mb-1.5 text-gray-700">Category</label>
          <select
            id="category" name="category" required
            defaultValue={initialData?.category ?? CATEGORIES[0]}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1.5 text-gray-700">Status</label>
          <select
            id="status" name="status" required
            defaultValue={initialData?.status ?? 'Open'}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium mb-1.5 text-gray-700">Event Date</label>
          <input
            id="eventDate" name="eventDate" type="date" required
            defaultValue={initialData?.event_date ?? new Date().toISOString().slice(0, 10)}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="timeLabel" className="block text-sm font-medium mb-1.5 text-gray-700">
            Time <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="timeLabel" name="timeLabel" type="text" maxLength={60}
            defaultValue={initialData?.time_label ?? undefined}
            placeholder="e.g. 06:00 AM – 09:00 AM"
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="venue" className="block text-sm font-medium mb-1.5 text-gray-700">Venue</label>
        <input
          id="venue" name="venue" type="text" required maxLength={200}
          defaultValue={initialData?.venue}
          placeholder="e.g. K.R.K. Ground, Lakhisarai"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1.5 text-gray-700">
          Description <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="description" name="description" rows={4}
          defaultValue={initialData?.description ?? undefined}
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors resize-y"
        />
      </div>

      <div>
        <label htmlFor="highlights" className="block text-sm font-medium mb-1.5 text-gray-700">
          Highlights <span className="text-gray-400">(one per line)</span>
        </label>
        <textarea
          id="highlights" name="highlights" rows={4}
          defaultValue={initialData?.highlights?.join('\n') ?? undefined}
          placeholder={'Timed 1.6 km run\nStanding long jump assessment\nOne-to-one feedback'}
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors resize-y"
        />
      </div>

      <div>
        <label htmlFor="eligibility" className="block text-sm font-medium mb-1.5 text-gray-700">
          Eligibility <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="eligibility" name="eligibility" type="text" maxLength={200}
          defaultValue={initialData?.eligibility ?? undefined}
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="seats" className="block text-sm font-medium mb-1.5 text-gray-700">
            Seats <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="seats" name="seats" type="text" placeholder="e.g. 40 seats" maxLength={30}
            defaultValue={initialData?.seats ?? undefined}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastRegistration" className="block text-sm font-medium mb-1.5 text-gray-700">
            Last Registration Date <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="lastRegistration" name="lastRegistration" type="text" placeholder="e.g. 23 July 2026" maxLength={30}
            defaultValue={initialData?.last_registration ?? undefined}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="youtubeUrl" className="block text-sm font-medium mb-1.5 text-gray-700">
          YouTube URL <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="youtubeUrl" name="youtubeUrl" type="url" placeholder="https://youtube.com/..."
          defaultValue={initialData?.youtube_url ?? undefined}
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
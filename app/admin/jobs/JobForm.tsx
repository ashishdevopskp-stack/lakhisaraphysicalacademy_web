import type { DbJob } from '@/app/lib/action/jobs'
import { JOB_CATEGORY_LABELS, JOB_STATUSES } from '@/app/lib/jobs-data'

export function JobForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbJob
}) {
  return (
    <form action={action} className="space-y-5">
      {initialData?.pdf_url && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Current Notification PDF</p>
          <a
            href={initialData.pdf_url}
            target="_blank"
            className="text-sm text-indigo-600 hover:underline"
          >
            View current PDF
          </a>
        </div>
      )}

      <div>
        <label htmlFor="pdf" className="block text-sm font-medium text-gray-700 mb-1.5">
          {initialData ? 'Replace Notification PDF (optional)' : 'Notification PDF (optional)'}
        </label>
        <input
          id="pdf"
          name="pdf"
          type="file"
          accept=".pdf"
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:text-gray-900 hover:file:bg-gray-200 file:cursor-pointer cursor-pointer"
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
        <input
          id="title" name="title" type="text" required
          defaultValue={initialData?.title}
          placeholder="e.g. Indian Army Agniveer Recruitment"
          className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1.5">
          Subtitle <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="subtitle" name="subtitle" type="text"
          defaultValue={initialData?.subtitle ?? undefined}
          placeholder="e.g. Open Rally for Agniveer (GD, Technical, Clerk)"
          className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1.5">Organization</label>
          <input
            id="organization" name="organization" type="text" required
            defaultValue={initialData?.organization}
            placeholder="e.g. Indian Army"
            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
          <input
            id="location" name="location" type="text" required
            defaultValue={initialData?.location}
            placeholder="e.g. Bihar or All India"
            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
          <select
            id="category" name="category" required
            defaultValue={initialData?.category ?? JOB_CATEGORY_LABELS[0]}
            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            {JOB_CATEGORY_LABELS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
          <select
            id="status" name="status" required
            defaultValue={initialData?.status ?? 'New'}
            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            {JOB_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="notificationDate" className="block text-sm font-medium text-gray-700 mb-1.5">Notification Date</label>
          <input
            id="notificationDate" name="notificationDate" type="date" required
            defaultValue={initialData?.notification_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700 mb-1.5">Last Date to Apply</label>
          <input
            id="lastDate" name="lastDate" type="date" required
            defaultValue={initialData?.last_date?.slice(0, 10)}
            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
          Video URL <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="videoUrl" name="videoUrl" type="text"
          placeholder="https://youtube.com/…"
          defaultValue={initialData?.video_url ?? undefined}
          className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="detailsUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
          Read More Link <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="detailsUrl" name="detailsUrl" type="text"
          placeholder="https://… (full article or official notification page)"
          defaultValue={initialData?.details_url ?? undefined}
          className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
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
import type { DbResource } from '@/app/lib/action/resources'
import { CATEGORIES } from '@/app/lib/resourses-data'

export function ResourceForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbResource
}) {
  return (
    <form action={action} className="space-y-5">
      {initialData?.file_url && (
        <div>
          <p className="text-sm font-medium mb-2">Current File</p>
          <a
            href={initialData.file_url}
            target="_blank"
            className="text-sm text-[#7C6AEF] hover:underline"
          >
            View current file
          </a>
        </div>
      )}

      <div>
        <label htmlFor="file" className="block text-sm font-medium mb-1.5">
          {initialData ? 'Replace File (optional)' : 'File'}
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="w-full text-sm text-[#9B9BA3] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-white/[0.06] file:text-sm file:text-[#EDEDEF] hover:file:bg-white/[0.1] file:cursor-pointer cursor-pointer"
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1.5">Title</label>
        <input
          id="title" name="title" type="text" required
          defaultValue={initialData?.title}
          placeholder="e.g. Physical Standards Chart 2026"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1.5">Description</label>
        <textarea
          id="description" name="description" required rows={4}
          defaultValue={initialData?.description}
          placeholder="Short description shown on the resource card"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors resize-y"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1.5">Category</label>
          <select
            id="category" name="category" required
            defaultValue={initialData?.category ?? CATEGORIES[0].label}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c.label} value={c.label}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="publishDate" className="block text-sm font-medium mb-1.5">Publish Date</label>
          <input
            id="publishDate" name="publishDate" type="date"
            defaultValue={initialData?.publish_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1.5">
          Video URL <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <input
          id="videoUrl"
          name="videoUrl"
          type="text"
          placeholder="https://youtube.com/…"
          defaultValue={initialData?.video_url ?? undefined}
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
        <p className="mt-1.5 text-xs text-[#9B9BA3]">
          A &quot;Watch Video&quot; button will show on this resource if set.
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-[#7C6AEF] hover:bg-[#6D5CE0] text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  )
}
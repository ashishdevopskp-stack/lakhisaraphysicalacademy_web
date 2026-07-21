import type { DbVideo } from '@/app/lib/action/videos'
import { VIDEO_CATEGORY_LABELS, VIDEO_STATUSES } from '@/app/lib/videos-data'

export function VideoForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbVideo
}) {
  return (
    <form action={action} className="space-y-5">
      {initialData?.thumbnail_url && (
        <div>
          <p className="text-sm font-medium mb-2">Current Thumbnail</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={initialData.thumbnail_url}
            alt={initialData.title}
            className="w-40 h-24 object-cover rounded-lg border border-white/[0.08]"
          />
        </div>
      )}

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium mb-1.5">
          {initialData ? 'Replace Thumbnail (optional)' : 'Thumbnail (optional)'}
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/*"
          className="w-full text-sm text-[#9B9BA3] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-white/[0.06] file:text-sm file:text-[#EDEDEF] hover:file:bg-white/[0.1] file:cursor-pointer cursor-pointer"
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1.5">Title</label>
        <input
          id="title" name="title" type="text" required
          defaultValue={initialData?.title}
          placeholder="e.g. Army Physical Test Guidance — Complete Breakdown"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1.5">
          Description <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <textarea
          id="description" name="description" rows={3}
          defaultValue={initialData?.description ?? undefined}
          placeholder="Short description shown on the video card"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors resize-none"
        />
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1.5">YouTube Video URL</label>
        <input
          id="videoUrl" name="videoUrl" type="text" required
          defaultValue={initialData?.video_url}
          placeholder="https://youtube.com/watch?v=…"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1.5">Category</label>
          <select
            id="category" name="category" required
            defaultValue={initialData?.category ?? VIDEO_CATEGORY_LABELS[0]}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          >
            {VIDEO_CATEGORY_LABELS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1.5">Status</label>
          <select
            id="status" name="status" required
            defaultValue={initialData?.status ?? 'Published'}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          >
            {VIDEO_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <label htmlFor="publishDate" className="block text-sm font-medium mb-1.5">Publish Date</label>
          <input
            id="publishDate" name="publishDate" type="date" required
            defaultValue={initialData?.publish_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 pb-2.5">
          <input
            id="featured" name="featured" type="checkbox"
            defaultChecked={initialData?.featured ?? false}
            className="w-4 h-4 rounded border-white/[0.08] bg-[#17181D] accent-[#7C6AEF]"
          />
          <label htmlFor="featured" className="text-sm font-medium">Featured video</label>
        </div>
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
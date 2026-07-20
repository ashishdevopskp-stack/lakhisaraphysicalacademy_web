import type { DbBlog } from '@/app/lib/action/blogs'
import { BLOG_CATEGORY_LABELS } from '@/app/lib/blogs-data'

export function BlogForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbBlog
}) {
  return (
    <form action={action} className="space-y-5">
      {initialData?.image_url && (
        <div>
          <p className="text-sm font-medium mb-2">Current Cover Image</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={initialData.image_url}
            alt={initialData.title}
            className="w-24 h-24 rounded-lg object-cover border border-white/[0.06]"
          />
        </div>
      )}

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1.5">
          {initialData ? 'Replace Cover Image (optional)' : 'Cover Image'}
        </label>
        <input
          id="image"
          name="image"
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
          placeholder="e.g. How to Improve Your 1.6 KM Run Time"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium mb-1.5">
          Subtitle <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <input
          id="subtitle" name="subtitle" type="text"
          defaultValue={initialData?.subtitle ?? undefined}
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1.5">Author</label>
          <input
            id="author" name="author" type="text" required
            defaultValue={initialData?.author}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1.5">Category</label>
          <select
            id="category" name="category" required
            defaultValue={initialData?.category ?? BLOG_CATEGORY_LABELS[0]}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          >
            {BLOG_CATEGORY_LABELS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="publishDate" className="block text-sm font-medium mb-1.5">Publish Date</label>
          <input
            id="publishDate" name="publishDate" type="date"
            defaultValue={initialData?.publish_date ?? new Date().toISOString().slice(0, 10)}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="readingTime" className="block text-sm font-medium mb-1.5">
            Reading Time <span className="text-[#9B9BA3]">(optional)</span>
          </label>
          <input
            id="readingTime" name="readingTime" type="text"
            defaultValue={initialData?.reading_time ?? undefined}
            placeholder="e.g. 6 min read"
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1.5">
          Content <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <textarea
          id="content" name="content" rows={6}
          defaultValue={initialData?.content ?? undefined}
          placeholder="Full article body"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors resize-y"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium mb-1.5">
            Video URL <span className="text-[#9B9BA3]">(optional)</span>
          </label>
          <input
            id="videoUrl"
            name="videoUrl"
            type="text"
            placeholder="https://..."
            defaultValue={initialData?.video_url ?? undefined}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="pdfUrl" className="block text-sm font-medium mb-1.5">
            PDF URL <span className="text-[#9B9BA3]">(optional)</span>
          </label>
          <input
            id="pdfUrl"
            name="pdfUrl"
            type="text"
            placeholder="https://..."
            defaultValue={initialData?.pdf_url ?? undefined}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
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
import type { DbResult } from '@/app/lib/action/results'
import { DEPARTMENTS, STATUS_OPTIONS } from '@/app/lib/results-data'

export function ResultForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbResult
}) {
  return (
    <form action={action} className="space-y-5">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      {initialData?.photo_url && (
        <div>
          <p className="text-sm font-medium mb-2">Current Photo</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={initialData.photo_url}
            alt={initialData.name}
            className="w-24 h-24 rounded-full object-cover border border-white/[0.06]"
          />
        </div>
      )}

      <div>
        <label htmlFor="photo" className="block text-sm font-medium mb-1.5">
          {initialData ? 'Replace Photo (optional)' : 'Photo (optional)'}
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          className="w-full text-sm text-[#9B9BA3] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-white/[0.06] file:text-sm file:text-[#EDEDEF] hover:file:bg-white/[0.1] file:cursor-pointer cursor-pointer"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">Full Name</label>
        <input
          id="name" name="name" type="text" required
          defaultValue={initialData?.name}
          placeholder="e.g. Rohit Kumar"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="post" className="block text-sm font-medium mb-1.5">Selected Post</label>
          <input
            id="post" name="post" type="text" required
            defaultValue={initialData?.post}
            placeholder="e.g. Agniveer (GD)"
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="exam" className="block text-sm font-medium mb-1.5">Exam Name</label>
          <input
            id="exam" name="exam" type="text" required
            defaultValue={initialData?.exam}
            placeholder="e.g. Army Agniveer"
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="department" className="block text-sm font-medium mb-1.5">Department / Category</label>
          <select
            id="department" name="department" required
            defaultValue={initialData?.department ?? DEPARTMENTS[0]}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1.5">Status</label>
          <select
            id="status" name="status" required
            defaultValue={initialData?.status ?? 'Selected'}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="district" className="block text-sm font-medium mb-1.5">District</label>
          <input
            id="district" name="district" type="text" required
            defaultValue={initialData?.district}
            placeholder="e.g. Lakhisarai"
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium mb-1.5">Year</label>
          <input
            id="year" name="year" type="text" required
            defaultValue={initialData?.year}
            placeholder="e.g. 2026"
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="rankScore" className="block text-sm font-medium mb-1.5">
          Rank / Score <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <input
          id="rankScore" name="rankScore" type="text"
          defaultValue={initialData?.rank_score ?? undefined}
          placeholder="e.g. AIR 214"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="testimonial" className="block text-sm font-medium mb-1.5">
          Testimonial <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <textarea
          id="testimonial" name="testimonial" rows={4}
          defaultValue={initialData?.testimonial ?? undefined}
          placeholder="What this student said about training at the academy"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors resize-y"
        />
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1.5">
          YouTube URL <span className="text-[#9B9BA3]">(optional)</span>
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

      <button
        type="submit"
        className="w-full bg-[#7C6AEF] hover:bg-[#6D5CE0] text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  )
}
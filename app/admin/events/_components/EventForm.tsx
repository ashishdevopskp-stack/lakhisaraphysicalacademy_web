import type { DbEvent } from '@/app/lib/action/events'
import { CATEGORIES } from '@/app/lib/events-data'

export function EventForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbEvent
}) {
  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1.5">Title</label>
        <input
          id="title" name="title" type="text" required
          defaultValue={initialData?.title}
          placeholder="e.g. Guest Physical Test"
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
          <label htmlFor="category" className="block text-sm font-medium mb-1.5">Category</label>
          <select
            id="category" name="category" required
            defaultValue={initialData?.category ?? CATEGORIES[0]}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1.5">Status</label>
          <select
            id="status" name="status" required
            defaultValue={initialData?.status ?? 'Open'}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium mb-1.5">Event Date</label>
          <input
            id="eventDate" name="eventDate" type="date" required
            defaultValue={initialData?.event_date ?? new Date().toISOString().slice(0, 10)}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="timeLabel" className="block text-sm font-medium mb-1.5">
            Time <span className="text-[#9B9BA3]">(optional)</span>
          </label>
          <input
            id="timeLabel" name="timeLabel" type="text"
            defaultValue={initialData?.time_label ?? undefined}
            placeholder="e.g. 06:00 AM – 09:00 AM"
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="venue" className="block text-sm font-medium mb-1.5">Venue</label>
        <input
          id="venue" name="venue" type="text" required
          defaultValue={initialData?.venue}
          placeholder="e.g. K.R.K. Ground, Lakhisarai"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1.5">
          Description <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <textarea
          id="description" name="description" rows={4}
          defaultValue={initialData?.description ?? undefined}
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors resize-y"
        />
      </div>

      <div>
        <label htmlFor="highlights" className="block text-sm font-medium mb-1.5">
          Highlights <span className="text-[#9B9BA3]">(one per line)</span>
        </label>
        <textarea
          id="highlights" name="highlights" rows={4}
          defaultValue={initialData?.highlights?.join('\n') ?? undefined}
          placeholder={'Timed 1.6 km run\nStanding long jump assessment\nOne-to-one feedback'}
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors resize-y"
        />
      </div>

      <div>
        <label htmlFor="eligibility" className="block text-sm font-medium mb-1.5">
          Eligibility <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <input
          id="eligibility" name="eligibility" type="text"
          defaultValue={initialData?.eligibility ?? undefined}
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="seats" className="block text-sm font-medium mb-1.5">
            Seats <span className="text-[#9B9BA3]">(optional)</span>
          </label>
          <input
            id="seats" name="seats" type="text" placeholder="e.g. 40 seats"
            defaultValue={initialData?.seats ?? undefined}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastRegistration" className="block text-sm font-medium mb-1.5">
            Last Registration Date <span className="text-[#9B9BA3]">(optional)</span>
          </label>
          <input
            id="lastRegistration" name="lastRegistration" type="text" placeholder="e.g. 23 July 2026"
            defaultValue={initialData?.last_registration ?? undefined}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="youtubeUrl" className="block text-sm font-medium mb-1.5">
          YouTube URL <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <input
          id="youtubeUrl" name="youtubeUrl" type="text" placeholder="https://youtube.com/..."
          defaultValue={initialData?.youtube_url ?? undefined}
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
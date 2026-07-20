import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getEvents, deleteEvent } from '@/app/lib/action/events'
import { AdminSidebar } from '../products/page'

const EVENT_STATUS_STYLES: Record<string, string> = {
  Open: 'bg-green-500/10 text-green-400',
  Closed: 'bg-white/[0.06] text-[#9B9BA3]',
}

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const events = await getEvents()

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Events" />

      <main className="flex-1 p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Events</h1>
            <p className="text-sm text-[#9B9BA3]">Manage what shows up on the events page.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/events/gallery"
              className="text-sm px-4 py-2 rounded-lg border border-white/[0.08] hover:bg-white/[0.04] transition-colors"
            >
              Manage Gallery
            </Link>
            <Link
              href="/admin/events/new"
              className="text-sm px-4 py-2 rounded-lg bg-[#7C6AEF] text-white font-medium hover:bg-[#6D5CE0] transition-colors"
            >
              + Add Event
            </Link>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
          {events.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-[#9B9BA3] mb-4">No events yet.</p>
              <Link href="/admin/events/new" className="text-sm text-[#7C6AEF] hover:underline">
                Add your first event
              </Link>
            </div>
          ) : (
            <div>
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-sm text-[#9B9BA3] truncate">
                      {event.category} · {event.venue} · {event.event_date}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className={'text-xs px-2.5 py-1 rounded-full ' + EVENT_STATUS_STYLES[event.status]}>
                      {event.status}
                    </span>
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="text-sm text-[#9B9BA3] hover:text-[#EDEDEF] transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteEvent.bind(null, event.id)}>
                      <button type="submit" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getEvents, deleteEvent } from '@/app/lib/action/events'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'

const EVENT_STATUS_STYLES: Record<string, string> = {
  Open: 'bg-green-50 text-green-700 border border-green-200',
  Closed: 'bg-gray-100 text-gray-600 border border-gray-200',
}

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  let events: Awaited<ReturnType<typeof getEvents>> = []
  let loadError: string | null = null
  try {
    events = await getEvents()
  } catch {
    loadError = 'Could not load events right now. Please refresh the page.'
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Events" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Events</h1>
            <p className="text-sm text-gray-500">Manage what shows up on the events page.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/events/gallery"
              className="text-sm px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
            >
              Manage Gallery
            </Link>
            <Link
              href="/admin/events/new"
              className="text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              + Add Event
            </Link>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        {loadError && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {loadError}
          </p>
        )}

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {events.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500 mb-4">
                {loadError ? 'No events to show.' : 'No events yet.'}
              </p>
              {!loadError && (
                <Link href="/admin/events/new" className="text-sm text-indigo-600 hover:underline">
                  Add your first event
                </Link>
              )}
            </div>
          ) : (
            <div>
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {event.category} · {event.venue} · {event.event_date}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:ml-4">
                    <span className={'text-xs px-2.5 py-1 rounded-full ' + (EVENT_STATUS_STYLES[event.status] ?? EVENT_STATUS_STYLES.Closed)}>
                      {event.status}
                    </span>
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteEvent.bind(null, event.id)}>
                      <button type="submit" className="text-sm text-red-600 hover:text-red-700 transition-colors">
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
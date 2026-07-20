import { redirect, notFound } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getEvent, updateEvent } from '@/app/lib/action/events'
import { AdminSidebar } from '../../../products/page'
import { EventForm } from '../../_components/EventForm'

export default async function EditEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const event = await getEvent(id)
  if (!event) notFound()

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Events" />
      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-2xl font-semibold mb-1">Edit Event</h1>
        <p className="text-sm text-[#9B9BA3] mb-8">
          Update details for &ldquo;{event.title}&rdquo;.
        </p>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <EventForm
          action={updateEvent.bind(null, id)}
          submitLabel="Save Changes"
          initialData={event}
        />
      </main>
    </div>
  )
}
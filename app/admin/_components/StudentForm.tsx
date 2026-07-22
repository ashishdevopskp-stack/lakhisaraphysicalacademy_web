'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createStudent, updateStudent, getRoomsByHostel, type Student } from '@/app/lib/action/students'

type Hostel = { id: string; name: string }
type Room = { id: string; room_number: string }

export function StudentForm({
  mode,
  student,
  hostels,
}: {
  mode: 'new' | 'edit'
  student?: Student
  hostels: Hostel[]
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [hostelId, setHostelId] = useState(student?.hostel_id ?? '')
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    if (!hostelId) { setRooms([]); return }
    getRoomsByHostel(hostelId).then(setRooms).catch(() => setRooms([]))
  }, [hostelId])

  async function onSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      try {
        if (mode === 'new') await createStudent(formData)
        else await updateStudent(student!.id, formData)
        router.push('/admin/students')
        router.refresh()
      } catch (e: any) {
        setError(e?.message ?? 'Something went wrong')
      }
    })
  }

  return (
    <form action={onSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-xl space-y-5">
      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
        <input
          name="name" required defaultValue={student?.name}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. Prashant Kumar"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          name="phone" defaultValue={student?.phone ?? ''}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="9370427046"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
          <select
            name="hostel_id" value={hostelId} onChange={(e) => setHostelId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select hostel</option>
            {hostels.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
          <select
            name="room_id" defaultValue={student?.room_id ?? ''} disabled={!hostelId}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select room</option>
            {rooms.map((r) => <option key={r.id} value={r.id}>{r.room_number}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bed Number</label>
          <input
            name="bed_number" defaultValue={student?.bed_number ?? ''}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="A"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
          <input
            name="batch" defaultValue={student?.batch ?? ''}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="2026-A"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit" disabled={pending}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
        >
          {pending ? 'Saving…' : mode === 'new' ? 'Add Student' : 'Save Changes'}
        </button>
        <button
          type="button" onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
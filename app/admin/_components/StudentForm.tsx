'use client'

import { useEffect, useState, useTransition, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, Loader2 } from 'lucide-react'
import {
  createStudent,
  updateStudent,
  createHostel,
  createRoom,
  getRoomsByHostel,
  getBedNumbersByRoom,
  type Student,
  type Hostel,
  type Room,
} from '@/app/lib/action/students'

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400'
const iconBtnClass =
  'p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed'
const smallPrimaryBtnClass =
  'px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 whitespace-nowrap'
const primaryBtnClass =
  'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60'
const secondaryBtnClass =
  'px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50'

export function StudentForm({
  mode,
  student,
  hostels: initialHostels,
}: {
  mode: 'new' | 'edit'
  student?: Student
  hostels: Hostel[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [hostels, setHostels] = useState<Hostel[]>(initialHostels)
  const [hostelId, setHostelId] = useState(student?.hostel_id ?? '')
  const [addingHostel, setAddingHostel] = useState(false)
  const [newHostelName, setNewHostelName] = useState('')
  const [savingHostel, setSavingHostel] = useState(false)

  const [rooms, setRooms] = useState<Room[]>([])
  const [roomId, setRoomId] = useState(student?.room_id ?? '')
  const [addingRoom, setAddingRoom] = useState(false)
  const [newRoomNumber, setNewRoomNumber] = useState('')
  const [savingRoom, setSavingRoom] = useState(false)
  const [loadingRooms, setLoadingRooms] = useState(false)

  const [bedNumbers, setBedNumbers] = useState<string[]>([])
  const [bedNumber, setBedNumber] = useState(student?.bed_number ?? '')
  const [addingBed, setAddingBed] = useState(false)
  const [newBedNumber, setNewBedNumber] = useState('')

  useEffect(() => {
    if (!hostelId) {
      setRooms([])
      return
    }
    setLoadingRooms(true)
    getRoomsByHostel(hostelId)
      .then(setRooms)
      .finally(() => setLoadingRooms(false))
  }, [hostelId])

  useEffect(() => {
    if (!roomId) {
      setBedNumbers([])
      return
    }
    getBedNumbersByRoom(roomId, student?.id).then(setBedNumbers)
  }, [roomId, student?.id])

  async function handleAddHostel() {
    if (!newHostelName.trim()) return
    setSavingHostel(true)
    setError(null)
    try {
      const created = await createHostel(newHostelName)
      setHostels((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)))
      setHostelId(created.id)
      setNewHostelName('')
      setAddingHostel(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add hostel')
    } finally {
      setSavingHostel(false)
    }
  }

  async function handleAddRoom() {
    if (!newRoomNumber.trim() || !hostelId) return
    setSavingRoom(true)
    setError(null)
    try {
      const created = await createRoom(hostelId, newRoomNumber)
      setRooms((prev) => [...prev, created].sort((a, b) => a.room_number.localeCompare(b.room_number)))
      setRoomId(created.id)
      setNewRoomNumber('')
      setAddingRoom(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add room')
    } finally {
      setSavingRoom(false)
    }
  }

  function handleAddBed() {
    if (!newBedNumber.trim()) return
    const value = newBedNumber.trim()
    setBedNumber(value)
    setBedNumbers((prev) => Array.from(new Set([...prev, value])))
    setNewBedNumber('')
    setAddingBed(false)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.set('hostel_id', hostelId)
    formData.set('room_id', roomId)
    formData.set('bed_number', bedNumber)

    startTransition(async () => {
      try {
        if (mode === 'new') {
          await createStudent(formData)
        } else if (student) {
          await updateStudent(student.id, formData)
        }
        router.push('/admin/students')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-2xl">
      {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name" required>
          <input name="name" defaultValue={student?.name} required className={inputClass} />
        </Field>

        <Field label="Father's Name">
          <input name="father_name" defaultValue={student?.father_name ?? ''} className={inputClass} />
        </Field>

        <Field label="Admission ID">
          <input name="admission_id" defaultValue={student?.admission_id ?? ''} className={inputClass} />
        </Field>

        <Field label="Phone">
          <input name="phone" defaultValue={student?.phone ?? ''} className={inputClass} />
        </Field>

        <Field label="Hostel">
          {!addingHostel ? (
            <div className="flex gap-2">
              <select
                value={hostelId}
                onChange={(e) => {
                  setHostelId(e.target.value)
                  setRoomId('')
                  setBedNumber('')
                }}
                className={inputClass}
              >
                <option value="">Select hostel</option>
                {hostels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => setAddingHostel(true)} className={iconBtnClass} aria-label="Add hostel">
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                autoFocus
                value={newHostelName}
                onChange={(e) => setNewHostelName(e.target.value)}
                placeholder="New hostel name"
                className={inputClass}
              />
              <button type="button" onClick={handleAddHostel} disabled={savingHostel} className={smallPrimaryBtnClass}>
                {savingHostel ? <Loader2 size={14} className="animate-spin" /> : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingHostel(false)
                  setNewHostelName('')
                }}
                className={iconBtnClass}
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </Field>

        <Field label="Room Number">
          {!addingRoom ? (
            <div className="flex gap-2">
              <select
                value={roomId}
                onChange={(e) => {
                  setRoomId(e.target.value)
                  setBedNumber('')
                }}
                disabled={!hostelId || loadingRooms}
                className={inputClass}
              >
                <option value="">{hostelId ? 'Select room' : 'Select hostel first'}</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.room_number}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setAddingRoom(true)}
                disabled={!hostelId}
                className={iconBtnClass}
                aria-label="Add room"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                autoFocus
                value={newRoomNumber}
                onChange={(e) => setNewRoomNumber(e.target.value)}
                placeholder="New room number"
                className={inputClass}
              />
              <button type="button" onClick={handleAddRoom} disabled={savingRoom} className={smallPrimaryBtnClass}>
                {savingRoom ? <Loader2 size={14} className="animate-spin" /> : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingRoom(false)
                  setNewRoomNumber('')
                }}
                className={iconBtnClass}
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </Field>

        <Field label="Bed Number">
          {!addingBed ? (
            <div className="flex gap-2">
              <select
                value={bedNumber}
                onChange={(e) => setBedNumber(e.target.value)}
                disabled={!roomId}
                className={inputClass}
              >
                <option value="">{roomId ? 'Select bed' : 'Select room first'}</option>
                {bedNumbers.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
                {bedNumber && !bedNumbers.includes(bedNumber) && <option value={bedNumber}>{bedNumber}</option>}
              </select>
              <button
                type="button"
                onClick={() => setAddingBed(true)}
                disabled={!roomId}
                className={iconBtnClass}
                aria-label="Add bed number"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                autoFocus
                value={newBedNumber}
                onChange={(e) => setNewBedNumber(e.target.value)}
                placeholder="New bed number"
                className={inputClass}
              />
              <button type="button" onClick={handleAddBed} className={smallPrimaryBtnClass}>
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingBed(false)
                  setNewBedNumber('')
                }}
                className={iconBtnClass}
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </Field>

        <Field label="Batch">
          <input name="batch" defaultValue={student?.batch ?? ''} className={inputClass} />
        </Field>
      </div>

      <div className="flex gap-3 mt-6">
        <button type="submit" disabled={isPending} className={primaryBtnClass}>
          {isPending ? <Loader2 size={16} className="animate-spin" /> : mode === 'new' ? 'Add Student' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/students')} className={secondaryBtnClass}>
          Cancel
        </button>
      </div>
    </form>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  )
}
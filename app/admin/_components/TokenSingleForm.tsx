'use client'

import { useRef, useState, useTransition } from 'react'
import { generateSingleToken } from '@/app/lib/action/tokens'
import { TokenCard, type TokenCardData } from './TokenCard'
import type { Student } from '@/app/lib/action/students'

type MealPlan = { id: string; name: string; slots: string[] }

export function TokenSingleForm({ students, mealPlans }: { students: Student[]; mealPlans: MealPlan[] }) {
  const [studentId, setStudentId] = useState('')
  const [mealPlanId, setMealPlanId] = useState(mealPlans[0]?.id ?? '')
  const [selectedSlots, setSelectedSlots] = useState<string[]>(mealPlans[0]?.slots ?? [])
  const [validMonths, setValidMonths] = useState(1)
  const [saved, setSaved] = useState<TokenCardData | null>(null)
  const [pending, startTransition] = useTransition()
  const cardRef = useRef<HTMLDivElement>(null)

  const plan = mealPlans.find((p) => p.id === mealPlanId)

  function onPlanChange(id: string) {
    setMealPlanId(id)
    const p = mealPlans.find((mp) => mp.id === id)
    setSelectedSlots(p?.slots ?? [])
  }

  function toggleSlot(slot: string) {
    setSelectedSlots((prev) => (prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]))
  }

  function handleGenerate() {
    if (!studentId || !mealPlanId || selectedSlots.length === 0) return
    startTransition(async () => {
      const row = await generateSingleToken({ studentId, mealPlanId, selectedSlots, validMonths })
      setSaved({
        tokenNo: String(row.token_number).padStart(2, '0'),
        serial: row.serial_number,
        date: new Date(row.date_of_allotment).toLocaleDateString('en-GB'),
        studentName: row.students?.name ?? '',
        hostelName: row.students?.hostels?.name ?? 'Hostel',
        roomNumber: row.students?.rooms?.room_number ?? '',
        bedNumber: row.students?.bed_number,
        slots: row.selected_slots ?? selectedSlots,
        validMonths,
      })
    })
  }

  async function downloadPDF() {
    if (!cardRef.current) return
    const html2canvas = (await import('html2canvas')).default
    const { jsPDF } = await import('jspdf')
    const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: '#fdf6ee' })
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ unit: 'pt', format: [canvas.width / 2, canvas.height / 2] })
    pdf.addImage(img, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
    pdf.save(`token-${saved?.serial ?? 'card'}.pdf`)
  }

  function printCard() {
    window.print()
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
          <select
            value={studentId} onChange={(e) => setStudentId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.hostels?.name ?? 'Hostel'} Room {s.rooms?.room_number ?? '—'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meal Plan</label>
          <select
            value={mealPlanId} onChange={(e) => onPlanChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {mealPlans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        {plan && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Slots</label>
            <div className="flex flex-wrap gap-2">
              {plan.slots.map((slot) => (
                <button
                  key={slot} type="button" onClick={() => toggleSlot(slot)}
                  className={
                    'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ' +
                    (selectedSlots.includes(slot)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50')
                  }
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valid For (months)</label>
          <input
            type="number" min={1} value={validMonths}
            onChange={(e) => setValidMonths(parseInt(e.target.value) || 1)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleGenerate} disabled={pending || !studentId}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {pending ? 'Saving…' : 'Save Token'}
          </button>
          {saved && (
            <>
              <button onClick={printCard} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Print
              </button>
              <button onClick={downloadPDF} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Download PDF
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        {saved ? (
          <div ref={cardRef}>
            <TokenCard data={saved} />
          </div>
        ) : (
          <div className="w-[520px] h-[260px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Card preview appears here after saving
          </div>
        )}
      </div>
    </div>
  )
}
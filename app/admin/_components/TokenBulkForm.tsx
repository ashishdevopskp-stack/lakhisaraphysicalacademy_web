'use client'

import { useState, useTransition } from 'react'
import { getStudentsFiltered, getRoomsByHostel } from '@/app/lib/action/students'
import { bulkGenerateTokens } from '@/app/lib/action/tokens'
import { TokenCard, type TokenCardData } from './TokenCard'

type Hostel = { id: string; name: string }
type Room = { id: string; room_number: string }
type MealPlan = { id: string; name: string; slots: string[] }
type StudentPick = {
  id: string
  name: string
  hostels?: { name: string } | null
  rooms?: { room_number: string } | null
  bed_number: string | null
}

export function TokenBulkForm({ hostels, mealPlans }: { hostels: Hostel[]; mealPlans: MealPlan[] }) {
  const [hostelId, setHostelId] = useState('')
  const [rooms, setRooms] = useState<Room[]>([])
  const [roomId, setRoomId] = useState('')
  const [batch, setBatch] = useState('')
  const [mealPlanId, setMealPlanId] = useState(mealPlans[0]?.id ?? '')
  const [selectedSlots, setSelectedSlots] = useState<string[]>(mealPlans[0]?.slots ?? [])
  const [validMonths, setValidMonths] = useState(1)
  const [perPage, setPerPage] = useState(2)

  const [matched, setMatched] = useState<StudentPick[] | null>(null)
  const [tokens, setTokens] = useState<TokenCardData[]>([])
  const [pending, startTransition] = useTransition()
  const [exporting, setExporting] = useState(false)

  const plan = mealPlans.find((p) => p.id === mealPlanId)

  function onHostelChange(id: string) {
    setHostelId(id)
    setRoomId('')
    if (!id) { setRooms([]); return }
    getRoomsByHostel(id).then(setRooms)
  }

  function onPlanChange(id: string) {
    setMealPlanId(id)
    setSelectedSlots(mealPlans.find((p) => p.id === id)?.slots ?? [])
  }

  function toggleSlot(slot: string) {
    setSelectedSlots((prev) => (prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]))
  }

  function findStudents() {
    startTransition(async () => {
      const students = await getStudentsFiltered({
        hostelId: hostelId || undefined,
        roomId: roomId || undefined,
        batch: batch || undefined,
      })
      setMatched(students)
      setTokens([])
    })
  }

  function generateTokens() {
    if (!matched || matched.length === 0 || !mealPlanId) return
    startTransition(async () => {
      const rows = await bulkGenerateTokens({
        studentIds: matched.map((s) => s.id),
        mealPlanId,
        selectedSlots,
        validMonths,
      })

      setTokens(
        rows.map((row: any) => ({
          tokenNo: String(row.token_number).padStart(2, '0'),
          serial: row.serial_number,
          issueDate: new Date(row.date_of_allotment).toLocaleDateString('en-GB'),
          expiryDate: new Date(row.expiry_date).toLocaleDateString('en-GB'),
          studentName: row.students?.name ?? '',
          hostelName: row.students?.hostels?.name ?? 'Hostel',
          roomNumber: row.students?.rooms?.room_number ?? '',
          bedNumber: row.students?.bed_number,
          slots: row.selected_slots ?? selectedSlots,
        }))
      )
    })
  }

  async function exportPDF() {
    if (tokens.length === 0) return
    setExporting(true)
    const html2canvas = (await import('html2canvas-pro')).default
    const { jsPDF } = await import('jspdf')

    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()
    const margin = 24
    const cols = perPage <= 2 ? 1 : 2
    const rows = Math.ceil(perPage / cols)
    const cellW = (pageW - margin * 2) / cols
    const cellH = (pageH - margin * 2) / rows

    const bank = document.getElementById('token-bulk-bank')!
    const cardEls = bank.querySelectorAll('.bulk-card')

    let idx = 0
    for (const el of Array.from(cardEls)) {
      // bank cards are pinned to a fixed 600px width (see below), so this
      // capture is always consistent quality regardless of the device
      // that triggered the export.
      const canvas = await html2canvas(el as HTMLElement, { scale: 2, backgroundColor: '#fdf6ee' })
      const img = canvas.toDataURL('image/png')
      const posInPage = idx % perPage
      if (idx > 0 && posInPage === 0) pdf.addPage()

      const col = posInPage % cols
      const row = Math.floor(posInPage / cols)
      const ratio = canvas.height / canvas.width
      let w = cellW - 12, h = w * ratio
      if (h > cellH - 12) { h = cellH - 12; w = h / ratio }
      const x = margin + col * cellW + (cellW - w) / 2
      const y = margin + row * cellH + (cellH - h) / 2
      pdf.addImage(img, 'PNG', x, y, w, h)
      idx++
    }

    pdf.save('bhojan-tokens-bulk.pdf')
    setExporting(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
            <select
              value={hostelId} onChange={(e) => onHostelChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Hostels</option>
              {hostels.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
            <select
              value={roomId} onChange={(e) => setRoomId(e.target.value)} disabled={!hostelId}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Rooms</option>
              {rooms.map((r) => <option key={r.id} value={r.id}>{r.room_number}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
            <input
              value={batch} onChange={(e) => setBatch(e.target.value)}
              placeholder="e.g. 2026-A"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={findStudents} disabled={pending}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              {pending ? 'Searching…' : 'Find Students'}
            </button>
          </div>
        </div>

        {matched && (
          <p className="text-sm text-gray-600 mt-4">
            <b>{matched.length}</b> student{matched.length !== 1 ? 's' : ''} matched.
          </p>
        )}
      </div>

      {matched && matched.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meal Plan</label>
            <select
              value={mealPlanId} onChange={(e) => onPlanChange(e.target.value)}
              className="w-full sm:w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valid For (months)</label>
              <input
                type="number" min={1} value={validMonths}
                onChange={(e) => setValidMonths(parseInt(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cards Per PDF Page</label>
              <select
                value={perPage} onChange={(e) => setPerPage(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {[1, 2, 4, 6, 8].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <button
                onClick={generateTokens} disabled={pending}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {pending ? 'Generating…' : `Generate ${matched.length} Tokens`}
              </button>
              {tokens.length > 0 && (
                <button
                  onClick={exportPDF} disabled={exporting}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {exporting ? 'Building PDF…' : 'Download All as PDF'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {tokens.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-3">{tokens.length} tokens generated — preview below.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tokens.slice(0, 6).map((t) => <TokenCard key={t.serial} data={t} />)}
          </div>
          {tokens.length > 6 && <p className="text-xs text-gray-400 mt-2">+{tokens.length - 6} more included in the PDF export.</p>}
        </div>
      )}

      {/* hidden export bank — each card pinned to a fixed 600px width so
         the exported PDF is always the same quality regardless of screen size */}
      <div id="token-bulk-bank" style={{ position: 'fixed', left: -9999, top: 0 }}>
        {tokens.map((t) => (
          <div key={t.serial} className="bulk-card" style={{ width: 600 }}>
            <TokenCard data={t} />
          </div>
        ))}
      </div>
    </div>
  )
}
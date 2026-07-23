'use client'

import { useRef, useState, useTransition } from 'react'
import { generateSingleToken, generateManualToken } from '@/app/lib/action/tokens'
import { TokenCard, type TokenCardData } from './TokenCard'
import type { Student, Hostel } from '@/app/lib/action/students'

type MealPlan = { id: string; name: string; slots: string[] }
type Mode = 'existing' | 'manual'

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'

// Target output width (px) for the downloaded/printed image, regardless
// of how small the card is actually rendered on the viewer's screen.
const CAPTURE_TARGET_WIDTH = 1800

export function TokenSingleForm({
  students,
  mealPlans,
  hostels,
}: {
  students: Student[]
  mealPlans: MealPlan[]
  hostels: Hostel[]
}) {
  const [mode, setMode] = useState<Mode>('existing')
  const [studentId, setStudentId] = useState('')

  // manual entry fields
  const [manualName, setManualName] = useState('')
  const [manualHostel, setManualHostel] = useState('')
  const [manualRoom, setManualRoom] = useState('')
  const [manualBed, setManualBed] = useState('')

  const [mealPlanId, setMealPlanId] = useState(mealPlans[0]?.id ?? '')
  const [selectedSlots, setSelectedSlots] = useState<string[]>(mealPlans[0]?.slots ?? [])
  const [validMonths, setValidMonths] = useState(1)
  const [saved, setSaved] = useState<TokenCardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [busy, setBusy] = useState<'print' | 'download' | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const plan = mealPlans.find((p) => p.id === mealPlanId)
  const canGenerate =
    !!mealPlanId && selectedSlots.length > 0 && (mode === 'existing' ? !!studentId : manualName.trim().length > 0)

  function onPlanChange(id: string) {
    setMealPlanId(id)
    setSelectedSlots(mealPlans.find((mp) => mp.id === id)?.slots ?? [])
  }

  function toggleSlot(slot: string) {
    setSelectedSlots((prev) => (prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]))
  }

  function toCardData(row: any): TokenCardData {
    const hostelName = row.students?.hostels?.name ?? row.manual_hostel_name ?? 'Hostel'
    const roomNumber = row.students?.rooms?.room_number ?? row.manual_room_number ?? '—'
    const bedNumber = row.students?.bed_number ?? row.manual_bed_number ?? null
    const name = row.students?.name ?? row.manual_name ?? ''
    return {
      tokenNo: String(row.token_number).padStart(2, '0'),
      serial: row.serial_number,
      issueDate: new Date(row.date_of_allotment).toLocaleDateString('en-GB'),
      expiryDate: new Date(row.expiry_date).toLocaleDateString('en-GB'),
      studentName: name,
      hostelName,
      roomNumber,
      bedNumber,
      slots: row.selected_slots ?? selectedSlots,
    }
  }

  function handleGenerate() {
    if (!canGenerate) return
    setError(null)
    startTransition(async () => {
      try {
        const row =
          mode === 'existing'
            ? await generateSingleToken({ studentId, mealPlanId, selectedSlots, validMonths })
            : await generateManualToken({
                name: manualName,
                hostelName: manualHostel,
                roomNumber: manualRoom,
                bedNumber: manualBed,
                mealPlanId,
                selectedSlots,
                validMonths,
              })
        setSaved(toCardData(row))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not generate token')
      }
    })
  }

  async function renderCanvas() {
    if (!cardRef.current) return null
    const html2canvas = (await import('html2canvas-pro')).default
    // The card is fluid on screen (mobile-responsive), so its rendered
    // width varies by device. Scale capture up/down to hit a consistent
    // target resolution either way — sharp on a phone, not oversized on desktop.
    const renderedWidth = cardRef.current.offsetWidth || 600
    const scale = Math.min(5, Math.max(2, CAPTURE_TARGET_WIDTH / renderedWidth))
    return html2canvas(cardRef.current, { scale, backgroundColor: '#fdf6ee' })
  }

  async function downloadImage() {
    setBusy('download')
    try {
      const canvas = await renderCanvas()
      if (!canvas) return
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `token-${saved?.serial ?? 'card'}.png`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
      }, 'image/png')
    } finally {
      setBusy(null)
    }
  }

  async function printCard() {
    setBusy('print')
    try {
      const canvas = await renderCanvas()
      if (!canvas) return
      const img = canvas.toDataURL('image/png')

      const printWindow = window.open('', '_blank', 'width=800,height=900')
      if (!printWindow) return

      printWindow.document.write(`
        <html>
          <head>
            <title>Bhojan Token</title>
            <meta charset="utf-8" />
            <style>
              @page { size: A4; margin: 0; }
              html, body {
                margin: 0;
                width: 210mm;
                height: 297mm;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
              }
              img {
                width: 140mm;
                height: auto;
                border: 1px dashed #999;
              }
            </style>
          </head>
          <body>
            <img src="${img}" />
          </body>
        </html>
      `)
      printWindow.document.close()

      const printImg = printWindow.document.querySelector('img')
      const triggerPrint = () => {
        printWindow.focus()
        printWindow.print()
        printWindow.close()
      }
      if (printImg && !printImg.complete) {
        printImg.addEventListener('load', triggerPrint)
        printImg.addEventListener('error', triggerPrint)
        setTimeout(triggerPrint, 1200)
      } else {
        setTimeout(triggerPrint, 150)
      }
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 space-y-5">
        {error && <div className="px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('existing')}
            className={
              'flex-1 px-3 py-2 rounded-lg text-sm font-medium border ' +
              (mode === 'existing' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300')
            }
          >
            Existing Student
          </button>
          <button
            type="button"
            onClick={() => setMode('manual')}
            className={
              'flex-1 px-3 py-2 rounded-lg text-sm font-medium border ' +
              (mode === 'manual' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300')
            }
          >
            Manual Entry
          </button>
        </div>

        {mode === 'existing' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
            <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className={inputClass}>
              <option value="">Select student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.hostels?.name ?? 'Hostel'} Room {s.rooms?.room_number ?? '—'}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input value={manualName} onChange={(e) => setManualName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
              <input
                list="hostel-suggestions"
                value={manualHostel}
                onChange={(e) => setManualHostel(e.target.value)}
                className={inputClass}
              />
              <datalist id="hostel-suggestions">
                {hostels.map((h) => (
                  <option key={h.id} value={h.name} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
              <input value={manualRoom} onChange={(e) => setManualRoom(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bed</label>
              <input value={manualBed} onChange={(e) => setManualBed(e.target.value)} className={inputClass} />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meal Plan</label>
          <select value={mealPlanId} onChange={(e) => onPlanChange(e.target.value)} className={inputClass}>
            {mealPlans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {plan && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Slots</label>
            <div className="flex flex-wrap gap-2">
              {plan.slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleSlot(slot)}
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
            type="number"
            min={1}
            value={validMonths}
            onChange={(e) => setValidMonths(parseInt(e.target.value) || 1)}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleGenerate}
            disabled={pending || !canGenerate}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {pending ? 'Saving…' : 'Save Token'}
          </button>
          {saved && (
            <>
              <button
                onClick={printCard}
                disabled={busy !== null}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {busy === 'print' ? 'Printing…' : 'Print'}
              </button>
              <button
                onClick={downloadImage}
                disabled={busy !== null}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {busy === 'download' ? 'Saving…' : 'Download Image'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Preview column: centers and shrinks the card to fit any screen,
         no horizontal scrolling ever needed here */}
      <div className="w-full flex justify-center px-1">
        {saved ? (
          <div ref={cardRef} className="w-full max-w-[600px]">
            <TokenCard data={saved} />
          </div>
        ) : (
          <div className="w-full max-w-[600px] h-[280px] sm:h-[340px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm text-center px-4">
            Card preview appears here after saving
          </div>
        )}
      </div>
    </div>
  )
}
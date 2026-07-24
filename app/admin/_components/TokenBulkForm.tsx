'use client'

import { useState, useTransition } from 'react'
import { getStudents } from '@/app/lib/action/students'
import { bulkGenerateTokens } from '@/app/lib/action/tokens'
import { TokenCard, type TokenCardData } from './TokenCard'

const CARDS_PER_PAGE = 2

export function TokenBulkForm() {
  const [validFrom, setValidFrom] = useState('')
  const [validTill, setValidTill] = useState('')

  const [matchedCount, setMatchedCount] = useState<number | null>(null)
  const [tokens, setTokens] = useState<TokenCardData[]>([])
  const [pending, startTransition] = useTransition()
  const [exporting, setExporting] = useState(false)

  function generateTokens() {
    if (!validFrom || !validTill) return
    startTransition(async () => {
      const students = await getStudents()
      if (students.length === 0) {
        setMatchedCount(0)
        setTokens([])
        return
      }

      const rows = await bulkGenerateTokens({
        studentIds: students.map((s) => s.id),
        validFrom,
        validTill,
      })

      setMatchedCount(students.length)
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
          slots: row.selected_slots ?? [],
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
    // fixed: 2 cards per page, stacked vertically
    const cellW = pageW - margin * 2
    const cellH = (pageH - margin * 2) / CARDS_PER_PAGE

    const bank = document.getElementById('token-bulk-bank')!
    const cardEls = bank.querySelectorAll('.bulk-card')

    let idx = 0
    for (const el of Array.from(cardEls)) {
      // bank cards are pinned to a fixed 600px width (see below), so this
      // capture is always consistent quality regardless of the device
      // that triggered the export.
      const canvas = await html2canvas(el as HTMLElement, { scale: 2, backgroundColor: '#fdf6ee' })
      const img = canvas.toDataURL('image/png')
      const posInPage = idx % CARDS_PER_PAGE
      if (idx > 0 && posInPage === 0) pdf.addPage()

      const row = posInPage
      const ratio = canvas.height / canvas.width
      let w = cellW - 12, h = w * ratio
      if (h > cellH - 12) { h = cellH - 12; w = h / ratio }
      const x = margin + (cellW - w) / 2
      const y = margin + row * cellH + (cellH - h) / 2
      pdf.addImage(img, 'PNG', x, y, w, h)
      idx++
    }

    pdf.save('bhojan-tokens-bulk.pdf')
    setExporting(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
            <input
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valid Till</label>
            <input
              type="date"
              value={validTill}
              min={validFrom || undefined}
              onChange={(e) => setValidTill(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={generateTokens}
            disabled={pending || !validFrom || !validTill}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {pending ? 'Generating…' : 'Generate All Tokens'}
          </button>
          {tokens.length > 0 && (
            <button
              onClick={exportPDF}
              disabled={exporting}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              {exporting ? 'Building PDF…' : 'Download All as PDF'}
            </button>
          )}
        </div>

        {matchedCount !== null && (
          <p className="text-sm text-gray-600">
            <b>{matchedCount}</b> student{matchedCount !== 1 ? 's' : ''} found
            {tokens.length > 0 ? ` — ${tokens.length} tokens generated.` : '.'}
          </p>
        )}
      </div>

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
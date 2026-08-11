'use client'

import { useState, useEffect, useTransition } from 'react'
import { getStudents, type StudentWithDetails } from '@/app/lib/action/students'
import { bulkGenerateTokens } from '@/app/lib/action/tokens'
import { TokenCard, CompactTokenCard, type TokenCardData } from './TokenCard'
import { CheckSquare, Square, Download, Calendar, Layers, Check } from 'lucide-react'

const CARDS_PER_PAGE = 9

interface StudentSelection {
  student: StudentWithDetails
  selected: boolean
  validFrom: string
  validTill: string
}

export function TokenBulkForm() {
  const [defaultValidFrom, setDefaultValidFrom] = useState('')
  const [defaultValidTill, setDefaultValidTill] = useState('')

  const [studentSelections, setStudentSelections] = useState<StudentSelection[]>([])
  const [loadingStudents, setLoadingStudents] = useState(true)

  const [matchedCount, setMatchedCount] = useState<number | null>(null)
  const [tokens, setTokens] = useState<TokenCardData[]>([])
  const [pending, startTransition] = useTransition()
  const [exporting, setExporting] = useState(false)

  // Fetch full student list on mount
  useEffect(() => {
    async function load() {
      try {
        const students = await getStudents()
        const today = new Date().toISOString().split('T')[0]
        const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        
        setDefaultValidFrom(today)
        setDefaultValidTill(nextMonth)

        setStudentSelections(
          students.map((s) => ({
            student: s,
            selected: true,
            validFrom: today,
            validTill: nextMonth,
          }))
        )
      } catch (err) {
        console.error('Failed to load students:', err)
      } finally {
        setLoadingStudents(false)
      }
    }
    load()
  }, [])

  // Apply default dates to all selected students
  function applyDefaultDatesToSelected() {
    if (!defaultValidFrom || !defaultValidTill) return
    setStudentSelections((prev) =>
      prev.map((item) =>
        item.selected
          ? { ...item, validFrom: defaultValidFrom, validTill: defaultValidTill }
          : item
      )
    )
  }

  // Toggle select all
  function toggleSelectAll(select: boolean) {
    setStudentSelections((prev) => prev.map((item) => ({ ...item, selected: select })))
  }

  // Toggle individual student
  function toggleStudent(id: string) {
    setStudentSelections((prev) =>
      prev.map((item) =>
        item.student.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  // Update dates for an individual student
  function updateStudentDate(id: string, field: 'validFrom' | 'validTill', value: string) {
    setStudentSelections((prev) =>
      prev.map((item) =>
        item.student.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const selectedCount = studentSelections.filter((s) => s.selected).length

  // Quick 9 Dummy Tokens generator for testing A4 print layout
  function generate9DummyTokens() {
    const today = new Date().toLocaleDateString('en-GB')
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')

    const dummyCards: TokenCardData[] = Array.from({ length: 9 }, (_, i) => {
      const num = i + 1
      return {
        tokenNo: String(num).padStart(2, '0'),
        serial: `LPA-2026-${1000 + num}`,
        issueDate: today,
        expiryDate: nextMonth,
        studentName: `Dummy Student ${num}`,
        hostelName: i % 2 === 0 ? 'JAY SHANKAR' : 'GIRLS HOSTEL',
        roomNumber: `${101 + (i % 5)}`,
        bedNumber: `${(i % 3) + 1}`,
        slots: ['Breakfast', 'Lunch', 'Dinner'],
      }
    })

    setMatchedCount(9)
    setTokens(dummyCards)
  }

  function generateSelectedTokens() {
    const selectedItems = studentSelections.filter((s) => s.selected)
    if (selectedItems.length === 0) return

    startTransition(async () => {
      const generatedCards: TokenCardData[] = []

      // Generate tokens for selected students with their custom or default valid dates
      for (const item of selectedItems) {
        const rows = await bulkGenerateTokens({
          studentIds: [item.student.id],
          validFrom: item.validFrom || defaultValidFrom,
          validTill: item.validTill || defaultValidTill,
        })

        if (rows && rows.length > 0) {
          const row = rows[0]
          generatedCards.push({
            tokenNo: String(row.token_number).padStart(2, '0'),
            serial: row.serial_number,
            issueDate: new Date(row.date_of_allotment).toLocaleDateString('en-GB'),
            expiryDate: new Date(row.expiry_date).toLocaleDateString('en-GB'),
            studentName: row.students?.name ?? item.student.name,
            hostelName: row.students?.hostels?.name ?? item.student.hostels?.name ?? 'Hostel',
            roomNumber: row.students?.rooms?.room_number ?? item.student.rooms?.room_number ?? '—',
            bedNumber: row.students?.bed_number ?? item.student.bed_number,
            slots: row.selected_slots ?? ['Breakfast', 'Lunch', 'Dinner'],
          })
        }
      }

      setMatchedCount(selectedItems.length)
      setTokens(generatedCards)
    })
  }

  async function exportPDF() {
    if (tokens.length === 0) return
    setExporting(true)
    const html2canvas = (await import('html2canvas-pro')).default
    const { jsPDF } = await import('jspdf')

    // A4 dimensions: 595.28 pt x 841.89 pt
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
    const pageW = 595.28
    const pageH = 841.89

    const marginX = 16
    const marginY = 16
    const colGap = 10
    const rowGap = 10

    // 3 columns x 3 rows = 9 cards per A4 page (high readability)
    const cols = 3
    const rows = 3

    const cellW = (pageW - marginX * 2 - colGap * (cols - 1)) / cols
    const cellH = (pageH - marginY * 2 - rowGap * (rows - 1)) / rows

    const bank = document.getElementById('token-bulk-bank')!
    const cardEls = bank.querySelectorAll('.compact-bulk-card')

    let idx = 0
    for (const el of Array.from(cardEls)) {
      const canvas = await html2canvas(el as HTMLElement, { scale: 3, backgroundColor: '#ffffff' })
      const img = canvas.toDataURL('image/png')
      const posInPage = idx % CARDS_PER_PAGE

      if (idx > 0 && posInPage === 0) pdf.addPage()

      const col = posInPage % cols
      const row = Math.floor(posInPage / cols)

      const imgRatio = canvas.width / canvas.height
      let drawW = cellW
      let drawH = drawW / imgRatio
      if (drawH > cellH) {
        drawH = cellH
        drawW = drawH * imgRatio
      }

      const x = marginX + col * (cellW + colGap) + (cellW - drawW) / 2
      const y = marginY + row * (cellH + rowGap) + (cellH - drawH) / 2

      pdf.addImage(img, 'PNG', x, y, drawW, drawH)
      idx++
    }

    pdf.save('bhojan-tokens-9perA4.pdf')
    setExporting(false)
  }

  return (
    <div className="space-y-6">
      {/* Date Configuration Box */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Calendar size={18} className="text-indigo-600" />
            Default Token Validity Dates
          </h2>
          <button
            type="button"
            onClick={generate9DummyTokens}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 transition-colors"
          >
            <Layers size={14} />
            Generate 9 Dummy Tokens (Test A4 Print)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Valid From</label>
            <input
              type="date"
              value={defaultValidFrom}
              onChange={(e) => setDefaultValidFrom(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Valid Till</label>
            <input
              type="date"
              value={defaultValidTill}
              min={defaultValidFrom || undefined}
              onChange={(e) => setDefaultValidTill(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={applyDefaultDatesToSelected}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
        >
          Apply these default dates to all selected students below
        </button>
      </div>

      {/* Student Selection Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleSelectAll(selectedCount < studentSelections.length)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900"
            >
              {selectedCount === studentSelections.length && studentSelections.length > 0 ? (
                <CheckSquare size={16} className="text-indigo-600" />
              ) : (
                <Square size={16} className="text-gray-400" />
              )}
              <span>Select All ({selectedCount}/{studentSelections.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={generateSelectedTokens}
              disabled={pending || selectedCount === 0}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Layers size={16} />
              {pending ? 'Generating Tokens…' : `Generate Bulk Tokens (${selectedCount})`}
            </button>

            {tokens.length > 0 && (
              <button
                onClick={exportPDF}
                disabled={exporting}
                className="px-4 py-2 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-100 disabled:opacity-50 flex items-center gap-2"
              >
                <Download size={16} />
                {exporting ? 'Building PDF…' : 'Download PDF (9 per A4 Page)'}
              </button>
            )}
          </div>
        </div>

        {loadingStudents ? (
          <div className="p-8 text-center text-sm text-gray-500">Loading student list…</div>
        ) : studentSelections.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">No registered students found.</div>
        ) : (
          <div className="overflow-x-auto max-h-[380px] overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-100 text-gray-600 font-semibold sticky top-0 z-10 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2.5 text-left w-10">Select</th>
                  <th className="px-3 py-2.5 text-left">Student Name</th>
                  <th className="px-3 py-2.5 text-left">Hostel / Room</th>
                  <th className="px-3 py-2.5 text-left">Valid From</th>
                  <th className="px-3 py-2.5 text-left">Valid Till</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {studentSelections.map((item) => (
                  <tr
                    key={item.student.id}
                    className={`hover:bg-gray-50 transition-colors ${item.selected ? 'bg-indigo-50/20' : ''}`}
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleStudent(item.student.id)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-2 font-semibold text-gray-900">{item.student.name}</td>
                    <td className="px-3 py-2 text-gray-600">
                      {item.student.hostels?.name ?? 'Hostel'} · Room {item.student.rooms?.room_number ?? '—'}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="date"
                        value={item.validFrom}
                        onChange={(e) => updateStudentDate(item.student.id, 'validFrom', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="date"
                        value={item.validTill}
                        onChange={(e) => updateStudentDate(item.student.id, 'validTill', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Generated Token Previews */}
      {tokens.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">
              Generated Tokens Preview ({tokens.length})
            </h3>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Ready for 9-per-A4 PDF Download
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tokens.slice(0, 6).map((t) => (
              <TokenCard key={t.serial} data={t} />
            ))}
          </div>

          {tokens.length > 6 && (
            <p className="text-xs text-gray-500 mt-3 text-center font-medium">
              +{tokens.length - 6} more tokens generated &amp; ready in PDF download.
            </p>
          )}
        </div>
      )}

      {/* Hidden PDF Export Render Bank — Compact 12-per-A4 Cards */}
      <div id="token-bulk-bank" style={{ position: 'fixed', left: -9999, top: 0 }}>
        {tokens.map((t) => (
          <div key={t.serial} className="compact-bulk-card">
            <CompactTokenCard data={t} />
          </div>
        ))}
      </div>
    </div>
  )
}
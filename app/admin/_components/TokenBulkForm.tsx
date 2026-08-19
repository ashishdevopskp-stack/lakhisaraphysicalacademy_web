'use client'

import { useState, useEffect, useTransition } from 'react'
import { getStudents, type StudentWithDetails } from '@/app/lib/action/students'
import { bulkGenerateTokens, type TokenRow } from '@/app/lib/action/tokens'
import { TokenCard, A4GridTokenCard, type TokenCardData } from './TokenCard'
import { CheckSquare, Square, Download, Calendar, Layers, Printer, CheckCircle2, AlertCircle } from 'lucide-react'

const CARDS_PER_PAGE = 12

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const results: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize))
  }
  return results
}

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

  const [tokens, setTokens] = useState<TokenCardData[]>([])
  const [previewPage, setPreviewPage] = useState(0)
  const [pending, startTransition] = useTransition()
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch full student list on mount
  useEffect(() => {
    async function load() {
      try {
        const students = await getStudents()
        const today = new Date().toISOString().split('T')[0]
        const nextMonth = new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

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

  // Compute estimated total tokens
  const estimatedTokenCount = studentSelections
    .filter((s) => s.selected)
    .reduce((sum, item) => {
      if (!item.validFrom || !item.validTill) return sum
      const start = new Date(item.validFrom).getTime()
      const end = new Date(item.validTill).getTime()
      const days = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1)
      return sum + days
    }, 0)

  function toCardData(row: TokenRow): TokenCardData {
    const formattedDate = new Date(row.date_of_allotment).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    return {
      tokenNo: String(row.token_number).padStart(2, '0'),
      serial: row.serial_number,
      issueDate: formattedDate,
      expiryDate: formattedDate,
      mealDate: formattedDate,
      studentName: row.students?.name ?? row.manual_name ?? '',
      hostelName: row.students?.hostels?.name ?? row.manual_hostel_name ?? 'Hostel',
      roomNumber: row.students?.rooms?.room_number ?? row.manual_room_number ?? '—',
      bedNumber: row.students?.bed_number ?? row.manual_bed_number,
      slots: row.selected_slots ?? ['Breakfast', 'Lunch', 'Dinner'],
    }
  }

  function generateSelectedTokens() {
    const selectedItems = studentSelections.filter((s) => s.selected)
    if (selectedItems.length === 0) return
    setError(null)

    startTransition(async () => {
      try {
        const studentConfigs = selectedItems.map((item) => ({
          studentId: item.student.id,
          validFrom: item.validFrom || defaultValidFrom,
          validTill: item.validTill || defaultValidTill,
        }))

        const rows = await bulkGenerateTokens({ studentConfigs })
        const generatedCards = (rows || []).map(toCardData)
        setTokens(generatedCards)
        setPreviewPage(0)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not generate bulk tokens')
      }
    })
  }

  function handleNativePrint() {
    if (tokens.length === 0) return
    window.print()
  }

  async function exportPDF() {
    if (tokens.length === 0) return
    setExporting(true)

    try {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready
      }

      const html2canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')

      // A4 portrait: 595.28 pt x 841.89 pt
      const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true })

      const bank = document.getElementById('token-bulk-pdf-bank')!
      bank.style.position = 'fixed'
      bank.style.left = '0px'
      bank.style.top = '0px'
      bank.style.zIndex = '-9999'

      const pageEls = bank.querySelectorAll('.a4-pdf-page-bulk')

      let idx = 0
      for (const pageEl of Array.from(pageEls)) {
        const canvas = await html2canvas(pageEl as HTMLElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
          logging: false,
        })
        const imgData = canvas.toDataURL('image/jpeg', 0.80)

        if (idx > 0) pdf.addPage()

        pdf.addImage(imgData, 'JPEG', 0, 0, 595.28, 841.89, undefined, 'FAST')
        idx++
      }

      pdf.save(`bulk-bhojan-tokens-${tokens.length}.pdf`)
    } catch (err) {
      console.error('PDF export failed:', err)
    } finally {
      const bank = document.getElementById('token-bulk-pdf-bank')
      if (bank) {
        bank.style.position = 'fixed'
        bank.style.left = '-9999px'
      }
      setExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Date Configuration Box */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
            <Calendar size={18} className="text-indigo-600" />
            <span>Default Date Range for Bulk Tokens</span>
          </h2>
          {estimatedTokenCount > 0 && (
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black">
              Total Tokens to Generate: {estimatedTokenCount} Tokens ({Math.ceil(estimatedTokenCount / 12)} A4 Pages)
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Valid From</label>
            <input
              type="date"
              value={defaultValidFrom}
              onChange={(e) => setDefaultValidFrom(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Valid Till</label>
            <input
              type="date"
              value={defaultValidTill}
              min={defaultValidFrom || undefined}
              onChange={(e) => setDefaultValidTill(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={applyDefaultDatesToSelected}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
        >
          Apply default date range to all selected students below
        </button>
      </div>

      {/* Student Selection Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleSelectAll(selectedCount < studentSelections.length)}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              {selectedCount === studentSelections.length && studentSelections.length > 0 ? (
                <CheckSquare size={18} className="text-indigo-600" />
              ) : (
                <Square size={18} className="text-gray-400" />
              )}
              <span>Select All Students ({selectedCount}/{studentSelections.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={generateSelectedTokens}
              disabled={pending || selectedCount === 0}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-black uppercase tracking-wider hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Layers size={16} />
              <span>
                {pending
                  ? 'Generating Date-Wise Tokens…'
                  : `Generate Bulk Tokens (${estimatedTokenCount} Tokens)`}
              </span>
            </button>
          </div>
        </div>

        {loadingStudents ? (
          <div className="p-8 text-center text-xs font-bold text-gray-500">Loading student directory…</div>
        ) : studentSelections.length === 0 ? (
          <div className="p-8 text-center text-xs font-bold text-gray-500">No registered hostel students found.</div>
        ) : (
          <div className="overflow-x-auto max-h-[380px] overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-100 text-gray-700 font-black uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left w-10">Select</th>
                  <th className="px-4 py-3 text-left">Student Name</th>
                  <th className="px-4 py-3 text-left">Hostel / Room</th>
                  <th className="px-4 py-3 text-left">Valid From</th>
                  <th className="px-4 py-3 text-left">Valid Till</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {studentSelections.map((item) => (
                  <tr
                    key={item.student.id}
                    className={`hover:bg-gray-50 transition-colors ${item.selected ? 'bg-indigo-50/20' : ''}`}
                  >
                    <td className="px-4 py-2.5">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleStudent(item.student.id)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-2.5 font-bold text-gray-900">{item.student.name}</td>
                    <td className="px-4 py-2.5 text-gray-600 font-medium">
                      {item.student.hostels?.name ?? 'Hostel'} · Room {item.student.rooms?.room_number ?? '—'}
                    </td>
                    <td className="px-4 py-2.5">
                      <input
                        type="date"
                        value={item.validFrom}
                        onChange={(e) => updateStudentDate(item.student.id, 'validFrom', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-800 focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <input
                        type="date"
                        value={item.validTill}
                        onChange={(e) => updateStudentDate(item.student.id, 'validTill', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-800 focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Generated Bulk Tokens Output */}
      {tokens.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span>Generated Bulk Tokens ({tokens.length} Total Tokens)</span>
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {Math.ceil(tokens.length / 12)} A4 Pages (12 Tokens per A4 Page) ready for print &amp; download.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleNativePrint}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Printer size={15} />
                <span>Print All ({Math.ceil(tokens.length / 12)} Pages)</span>
              </button>

              <button
                type="button"
                onClick={exportPDF}
                disabled={exporting}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Download size={15} />
                <span>{exporting ? 'Building PDF…' : 'Download PDF (12/Page)'}</span>
              </button>
            </div>
          </div>

          {/* A4 Sheet Live Preview Navigation */}
          {(() => {
            const pageChunks = chunkArray(tokens, CARDS_PER_PAGE)
            const currentPageTokens = pageChunks[previewPage] || pageChunks[0] || []

            return (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                    <span>📄 A4 Print Sheet Live Preview (Page {previewPage + 1} of {pageChunks.length})</span>
                  </span>
                  {pageChunks.length > 1 && (
                    <div className="flex items-center gap-1.5 font-bold">
                      {pageChunks.map((_, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setPreviewPage(pIdx)}
                          className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                            previewPage === pIdx
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Page {pIdx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interactive A4 Sheet Live Display */}
                <div className="bg-slate-200/70 p-4 rounded-2xl border border-slate-300 overflow-x-auto flex justify-center shadow-inner">
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 760,
                      minWidth: 320,
                      aspectRatio: '210 / 297',
                      background: '#ffffff',
                      padding: '12px',
                      boxSizing: 'border-box',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'repeat(4, 1fr)',
                      gap: '8px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                    }}
                  >
                    {currentPageTokens.map((t) => (
                      <div key={t.serial} style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                        <A4GridTokenCard data={t} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Hidden Render Bank for html2canvas PDF Export — 1 A4 page per block */}
      <div id="token-bulk-pdf-bank" style={{ position: 'fixed', left: -9999, top: 0, width: '210mm' }}>
        {chunkArray(tokens, CARDS_PER_PAGE).map((pageTokens, pageIdx) => (
          <div
            key={pageIdx}
            className="a4-pdf-page-bulk"
            style={{
              width: '210mm',
              height: '297mm',
              padding: '4mm',
              boxSizing: 'border-box',
              background: '#ffffff',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              gap: '3mm',
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact',
            }}
          >
            {pageTokens.map((t) => (
              <div key={t.serial} style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                <A4GridTokenCard data={t} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Printable Area for Native Browser Print (@media print 12 cards per A4 page) */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 4mm;
          }
          *,
          *::before,
          *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          body * {
            visibility: hidden !important;
          }
          #printable-a4-tokens-bulk,
          #printable-a4-tokens-bulk * {
            visibility: visible !important;
          }
          #printable-a4-tokens-bulk {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 202mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          .a4-print-page-bulk {
            width: 202mm !important;
            height: 289mm !important;
            box-sizing: border-box !important;
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            grid-template-rows: repeat(4, 1fr) !important;
            gap: 3mm !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
          }
        }
      `}</style>

      <div id="printable-a4-tokens-bulk" className="hidden print:block">
        {chunkArray(tokens, CARDS_PER_PAGE).map((pageTokens, pageIdx) => (
          <div key={pageIdx} className="a4-print-page-bulk">
            {pageTokens.map((t) => (
              <div key={t.serial} style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                <A4GridTokenCard data={t} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
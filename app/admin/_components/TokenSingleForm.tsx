'use client'

import { useState, useTransition } from 'react'
import { generateSingleToken, generateManualToken, type TokenRow } from '@/app/lib/action/tokens'
import { TokenCard, A4GridTokenCard, type TokenCardData } from './TokenCard'
import type { Student, Hostel } from '@/app/lib/action/students'
import { Calendar, Printer, Download, Layers, CheckCircle2, AlertCircle } from 'lucide-react'

type Mode = 'existing' | 'manual'

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-gray-800'

const CARDS_PER_PAGE = 12

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const results: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize))
  }
  return results
}

export function TokenSingleForm({
  students,
  hostels,
}: {
  students: Student[]
  hostels: Hostel[]
}) {
  const [mode, setMode] = useState<Mode>('existing')
  const [studentId, setStudentId] = useState('')

  // manual entry fields
  const [manualName, setManualName] = useState('')
  const [manualHostel, setManualHostel] = useState('')
  const [manualRoom, setManualRoom] = useState('')
  const [manualBed, setManualBed] = useState('')

  const [validFrom, setValidFrom] = useState('')
  const [validTill, setValidTill] = useState('')

  const [savedTokens, setSavedTokens] = useState<TokenCardData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [exporting, setExporting] = useState(false)

  const canGenerate =
    !!validFrom &&
    !!validTill &&
    (mode === 'existing' ? !!studentId : manualName.trim().length > 0)

  // Calculate day count
  const dayCount =
    validFrom && validTill
      ? Math.max(
          1,
          Math.round(
            (new Date(validTill).getTime() - new Date(validFrom).getTime()) / (1000 * 60 * 60 * 24)
          ) + 1
        )
      : 0

  function toCardData(row: TokenRow): TokenCardData {
    const hostelName = row.students?.hostels?.name ?? row.manual_hostel_name ?? 'Hostel'
    const roomNumber = row.students?.rooms?.room_number ?? row.manual_room_number ?? '—'
    const bedNumber = row.students?.bed_number ?? row.manual_bed_number ?? null
    const name = row.students?.name ?? row.manual_name ?? ''
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
      studentName: name,
      hostelName,
      roomNumber,
      bedNumber,
      slots: row.selected_slots ?? ['Breakfast', 'Lunch', 'Dinner'],
    }
  }

  function handleGenerate() {
    if (!canGenerate) return
    setError(null)
    startTransition(async () => {
      try {
        const rows =
          mode === 'existing'
            ? await generateSingleToken({ studentId, validFrom, validTill })
            : await generateManualToken({
                name: manualName,
                hostelName: manualHostel,
                roomNumber: manualRoom,
                bedNumber: manualBed,
                validFrom,
                validTill,
              })
        setSavedTokens(rows.map(toCardData))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not generate tokens')
      }
    })
  }

  function handleNativePrint() {
    if (savedTokens.length === 0) return
    window.print()
  }

  async function exportPDF() {
    if (savedTokens.length === 0) return
    setExporting(true)

    try {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready
      }

      const html2canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')

      // A4 portrait: 595.28 pt x 841.89 pt
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
      const pageW = 595.28
      const pageH = 841.89

      const marginX = 14
      const marginY = 14
      const colGap = 8
      const rowGap = 8

      // 3 columns x 4 rows = 12 cards per A4 page
      const cols = 3
      const rows = 4

      const cellW = (pageW - marginX * 2 - colGap * (cols - 1)) / cols
      const cellH = (pageH - marginY * 2 - rowGap * (rows - 1)) / rows

      const bank = document.getElementById('token-single-bank')!
      const origPos = bank.style.position
      const origLeft = bank.style.left

      bank.style.position = 'fixed'
      bank.style.left = '0px'
      bank.style.top = '0px'
      bank.style.zIndex = '-9999'

      const cardEls = bank.querySelectorAll('.compact-grid-card')

      let idx = 0
      for (const parentEl of Array.from(cardEls)) {
        const targetEl = (parentEl.firstElementChild as HTMLElement) || (parentEl as HTMLElement)
        const canvas = await html2canvas(targetEl, {
          scale: 3,
          backgroundColor: '#ffffff',
          useCORS: true,
          logging: false,
        })
        const img = canvas.toDataURL('image/png')
        const posInPage = idx % CARDS_PER_PAGE

        if (idx > 0 && posInPage === 0) pdf.addPage()

        const col = posInPage % cols
        const row = Math.floor(posInPage / cols)

        const x = marginX + col * (cellW + colGap)
        const y = marginY + row * (cellH + rowGap)

        pdf.addImage(img, 'PNG', x, y, cellW, cellH)
        idx++
      }

      pdf.save(`bhojan-tokens-${savedTokens.length}days.pdf`)
    } catch (err) {
      console.error('PDF export failed:', err)
    } finally {
      const bank = document.getElementById('token-single-bank')
      if (bank) {
        bank.style.position = 'fixed'
        bank.style.left = '-9999px'
      }
      setExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Form Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('existing')}
              className={
                'flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ' +
                (mode === 'existing'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900')
              }
            >
              Registered Student
            </button>
            <button
              type="button"
              onClick={() => setMode('manual')}
              className={
                'flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ' +
                (mode === 'manual'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900')
              }
            >
              Manual / Walk-In
            </button>
          </div>

          {mode === 'existing' ? (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Student *</label>
              <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className={inputClass}>
                <option value="">Choose student...</option>
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Student Name *</label>
                <input
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Hostel</label>
                <input
                  list="hostel-suggestions"
                  value={manualHostel}
                  onChange={(e) => setManualHostel(e.target.value)}
                  placeholder="e.g. Jay Shankar"
                  className={inputClass}
                />
                <datalist id="hostel-suggestions">
                  {hostels.map((h) => (
                    <option key={h.id} value={h.name} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Room No.</label>
                <input
                  value={manualRoom}
                  onChange={(e) => setManualRoom(e.target.value)}
                  placeholder="104"
                  className={inputClass}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Bed No.</label>
                <input
                  value={manualBed}
                  onChange={(e) => setManualBed(e.target.value)}
                  placeholder="02"
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* Date Range Selection Box */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Calendar size={15} className="text-indigo-600" />
                <span>Token Validity Date Range</span>
              </span>
              {dayCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-black">
                  {dayCount} Tokens ({dayCount} Days)
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Valid From *</label>
                <input
                  type="date"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Valid Till *</label>
                <input
                  type="date"
                  value={validTill}
                  min={validFrom || undefined}
                  onChange={(e) => setValidTill(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-medium leading-normal">
              ⚡ Selected date range ke har din ke liye automatic alag Bhojan Token (Token 1, Token 2... Token {dayCount || 'N'}) generate hoga.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={pending || !canGenerate}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white text-xs font-black uppercase tracking-wider hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Layers size={16} />
            <span>
              {pending
                ? 'Generating Date-wise Tokens…'
                : `Generate ${dayCount > 0 ? dayCount : ''} Date-Wise Tokens`}
            </span>
          </button>
        </div>

        {/* Generated Tokens Display & Print Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {savedTokens.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span>Generated Tokens ({savedTokens.length} Total)</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    12 Tokens per A4 Page layout ready for print &amp; cutting.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleNativePrint}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Printer size={15} />
                    <span>Print All (12/Page)</span>
                  </button>

                  <button
                    type="button"
                    onClick={exportPDF}
                    disabled={exporting}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Download size={15} />
                    <span>{exporting ? 'Building PDF…' : 'Download PDF'}</span>
                  </button>
                </div>
              </div>

              {/* Sample Card Live Preview */}
              <div className="space-y-3">
                <p className="text-xs font-extrabold text-gray-600">Sample Card Preview (Token #01):</p>
                <div className="max-w-[480px] mx-auto">
                  <TokenCard data={savedTokens[0]} />
                </div>
              </div>

              {/* All Generated Tokens List Table */}
              <div className="pt-2">
                <p className="text-xs font-extrabold text-gray-700 mb-2">
                  Generated Tokens List ({savedTokens.length} Tokens):
                </p>
                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100 font-bold text-gray-700 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left">Token #</th>
                        <th className="px-3 py-2 text-left">Meal Date</th>
                        <th className="px-3 py-2 text-left">Serial No</th>
                        <th className="px-3 py-2 text-left">Student</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {savedTokens.map((t) => (
                        <tr key={t.serial} className="hover:bg-gray-50 font-medium text-gray-800">
                          <td className="px-3 py-2 font-black text-red-600">Token {t.tokenNo}</td>
                          <td className="px-3 py-2 font-bold text-emerald-700">{t.mealDate}</td>
                          <td className="px-3 py-2 text-gray-500">S/N: {t.serial}</td>
                          <td className="px-3 py-2 font-bold">{t.studentName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl h-[340px] flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-2">
              <Calendar size={40} className="text-gray-300" />
              <p className="text-sm font-bold text-gray-600">No Tokens Generated Yet</p>
              <p className="text-xs text-gray-400 max-w-xs">
                Select student and date range (Valid From &amp; Valid Till) to generate date-wise Bhojan Tokens.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Render Bank for html2canvas PDF Export (12-per-page A4 cards) */}
      <div id="token-single-bank" style={{ position: 'fixed', left: -9999, top: 0, width: 390 }}>
        {savedTokens.map((t) => (
          <div key={t.serial} className="compact-grid-card" style={{ width: 380, height: 400, marginBottom: 12 }}>
            <A4GridTokenCard data={t} />
          </div>
        ))}
      </div>

      {/* Printable Area for Native Browser Print (@media print 12 cards per A4 page) */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-a4-tokens-single,
          #printable-a4-tokens-single * {
            visibility: visible !important;
          }
          #printable-a4-tokens-single {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            background: #ffffff !important;
          }
          .a4-print-page {
            width: 210mm !important;
            height: 297mm !important;
            padding: 6mm !important;
            box-sizing: border-box !important;
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            grid-template-rows: repeat(4, 1fr) !important;
            gap: 4mm !important;
            page-break-after: always !important;
            break-after: page !important;
          }
        }
      `}</style>

      <div id="printable-a4-tokens-single" className="hidden print:block">
        {chunkArray(savedTokens, CARDS_PER_PAGE).map((pageTokens, pageIdx) => (
          <div key={pageIdx} className="a4-print-page">
            {pageTokens.map((t) => (
              <div key={t.serial} style={{ height: '100%', width: '100%' }}>
                <A4GridTokenCard data={t} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
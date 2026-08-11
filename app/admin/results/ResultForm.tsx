'use client'

import { useState, useRef } from 'react'
import type { DbResult } from '@/app/lib/action/results'
import { DEPARTMENTS, STATUS_OPTIONS } from '@/app/lib/results-data'
import { User } from 'lucide-react'

const MAX_IMAGE_MB = 10
const IMAGE_MAX_DIMENSION = 1600

async function compressImageToWebp(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return file

  const bitmap = await createImageBitmap(file).catch(() => null)
  if (!bitmap) return file

  let { width, height } = bitmap
  if (Math.max(width, height) > IMAGE_MAX_DIMENSION) {
    const scale = IMAGE_MAX_DIMENSION / Math.max(width, height)
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return file
  ctx.drawImage(bitmap, 0, 0, width, height)

  const tryEncode = (type: string, quality: number) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))

  let blob = await tryEncode('image/webp', 0.82)
  if (!blob) blob = await tryEncode('image/jpeg', 0.82)
  if (!blob || blob.size >= file.size) return file

  const newName = file.name.replace(/\.[^.]+$/, '') + '.webp'
  return new File([blob], newName, { type: 'image/webp' })
}

export function ResultForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbResult
}) {
  const [fileError, setFileError] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressedInfo, setCompressedInfo] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.photo_url ?? null)
  const photoInputRef = useRef<HTMLInputElement>(null)

  // Custom Category Department state
  const isDeptKnown = DEPARTMENTS.includes(initialData?.department as any)
  const [selectedDept, setSelectedDept] = useState<string>(
    initialData?.department
      ? isDeptKnown
        ? initialData.department
        : '__custom__'
      : DEPARTMENTS[0]
  )
  const [customDeptInput, setCustomDeptInput] = useState<string>(
    initialData?.department && !isDeptKnown ? initialData.department : ''
  )

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setCompressedInfo(null)
    if (!file) {
      setFileError(null)
      return
    }

    if (!file.type.startsWith('image/')) {
      setFileError('Please choose a valid image file.')
      return
    }

    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setFileError(`Image must be under ${MAX_IMAGE_MB}MB.`)
      return
    }
    setFileError(null)
    setPreviewUrl(URL.createObjectURL(file))

    setIsCompressing(true)
    try {
      const compressed = await compressImageToWebp(file)
      if (compressed !== file && photoInputRef.current) {
        const dt = new DataTransfer()
        dt.items.add(compressed)
        photoInputRef.current.files = dt.files
        const origSizeKb = (file.size / 1024).toFixed(0)
        const compSizeKb = (compressed.size / 1024).toFixed(0)
        setCompressedInfo(`WebP: ${compSizeKb} KB (from ${origSizeKb} KB)`)
      }
    } catch {
      setCompressedInfo(null)
    } finally {
      setIsCompressing(false)
    }
  }

  const finalDepartment =
    selectedDept === '__custom__' ? customDeptInput.trim() || 'Other' : selectedDept

  return (
    <form
      action={(formData) => {
        formData.set('department', finalDepartment)
        action(formData)
      }}
      className="space-y-6"
    >
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      {/* Photo Upload Zone with WebP Auto-Compress */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="photo" className="text-xs font-black uppercase tracking-wider text-slate-800">
            {initialData ? 'Replace Student Photo (Optional)' : 'Selected Student Photo'}
          </label>
          <span className="text-[10px] font-bold text-slate-400">Auto WebP Compression</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-slate-100 ring-4 ring-orange-500/20 overflow-hidden shrink-0 flex items-center justify-center border-2 border-white shadow-md">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Student preview" className="w-full h-full object-cover" />
            ) : (
              <User size={36} className="text-slate-300" />
            )}
          </div>

          <div className="flex-1 space-y-2 w-full">
            <input
              ref={photoInputRef}
              id="photo"
              name="photo"
              type="file"
              accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.bmp,.heic"
              onChange={handleFileChange}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-slate-100 file:text-xs file:font-black file:text-slate-700 hover:file:bg-slate-200 file:cursor-pointer cursor-pointer"
            />
            {fileError && <p className="text-xs font-bold text-red-600">{fileError}</p>}
            {isCompressing && (
              <p className="text-xs font-bold text-slate-500">⚡ Converting photo to WebP format…</p>
            )}
            {!isCompressing && compressedInfo && (
              <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 inline-block">
                {compressedInfo}
              </p>
            )}
            <p className="text-[11px] text-slate-400">
              High-res mobile camera photos are automatically converted into KB-sized WebP files.
            </p>
          </div>
        </div>
      </div>

      {/* Student Details Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
        <div>
          <label htmlFor="name" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
            Student Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            defaultValue={initialData?.name}
            placeholder="e.g. Vikram Kumar"
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="post" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Selected Post <span className="text-red-500">*</span>
            </label>
            <input
              id="post"
              name="post"
              type="text"
              required
              maxLength={100}
              defaultValue={initialData?.post}
              placeholder="e.g. Bihar Police Constable"
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
            />
          </div>

          <div>
            <label htmlFor="exam" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Exam Name <span className="text-red-500">*</span>
            </label>
            <input
              id="exam"
              name="exam"
              type="text"
              required
              maxLength={100}
              defaultValue={initialData?.exam}
              placeholder="e.g. Army Agniveer"
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
            />
          </div>
        </div>

        {/* Category / Department Dropdown + Custom Mention */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="department" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                Department / Category <span className="text-red-500">*</span>
              </label>
              <select
                id="department"
                name="deptSelect"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
                <option value="__custom__">➕ Custom (Mention)...</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                Selection Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={initialData?.status ?? 'Selected'}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Custom Category Mention Box */}
          {selectedDept === '__custom__' && (
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2 animate-[fadeIn_0.15s_ease-out]">
              <label htmlFor="customDeptInput" className="block text-xs font-black uppercase tracking-wider text-[#ea580c]">
                Enter Custom Category Name (Mention):
              </label>
              <input
                id="customDeptInput"
                type="text"
                required
                value={customDeptInput}
                onChange={(e) => setCustomDeptInput(e.target.value)}
                placeholder="e.g. Excise Guard, Fireman, Special Forces, Chaukidar"
                className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="district" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              District
            </label>
            <input
              id="district"
              name="district"
              type="text"
              required
              maxLength={100}
              defaultValue={initialData?.district ?? 'Lakhisarai'}
              placeholder="e.g. Lakhisarai"
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Batch Selection Year
            </label>
            <input
              id="year"
              name="year"
              type="text"
              required
              maxLength={10}
              defaultValue={initialData?.year ?? new Date().getFullYear().toString()}
              placeholder="e.g. 2026"
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="rankScore" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
            Rank / Roll Number / Marks <span className="text-slate-400">(Optional)</span>
          </label>
          <input
            id="rankScore"
            name="rankScore"
            type="text"
            maxLength={50}
            defaultValue={initialData?.rank_score ?? undefined}
            placeholder="e.g. Roll: 8410294 or Physical: 100 Marks"
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
            Success Story Video URL (YouTube / Instagram) <span className="text-slate-400">(Optional)</span>
          </label>
          <input
            id="videoUrl"
            name="videoUrl"
            type="url"
            maxLength={500}
            defaultValue={initialData?.video_url ?? undefined}
            placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Adding a video URL automatically publishes this student under the &quot;Success Story Videos&quot; section on the Results page.
          </p>
        </div>

        <div>
          <label htmlFor="testimonial" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
            Student Testimonial / Review <span className="text-slate-400">(Optional)</span>
          </label>
          <textarea
            id="testimonial"
            name="testimonial"
            rows={3}
            maxLength={1000}
            defaultValue={initialData?.testimonial ?? undefined}
            placeholder="What this selected candidate said about training under Ganesh Sir..."
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all resize-y"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Adding a quote automatically publishes this student under the &quot;What Our Achievers Say&quot; section on the Results page.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isCompressing}
        className="btn-orange w-full py-3.5 text-sm font-black tracking-wide shadow-xl shadow-orange-500/20 disabled:opacity-50"
      >
        {submitLabel}
      </button>
    </form>

  )
}
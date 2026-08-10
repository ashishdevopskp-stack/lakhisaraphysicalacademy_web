'use client'

import { useState, useRef } from 'react'
import type { DbResource } from '@/app/lib/action/resources'
import { CATEGORIES } from '@/app/lib/resourses-data'
import { Sparkles, CheckCircle2, FileUp } from 'lucide-react'

const MAX_FILE_MB = 15
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

export function ResourceForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbResource
}) {
  const [fileError, setFileError] = useState<string | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressedInfo, setCompressedInfo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Custom category mention state
  const isInitialCategoryKnown = CATEGORIES.some((c) => c.label === initialData?.category)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialData?.category
      ? isInitialCategoryKnown
        ? initialData.category
        : '__custom__'
      : CATEGORIES[0].label
  )
  const [customCategoryInput, setCustomCategoryInput] = useState<string>(
    initialData?.category && !isInitialCategoryKnown ? initialData.category : ''
  )

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setCompressedInfo(null)
    if (!file) {
      setFileError(null)
      return
    }

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File must be under ${MAX_FILE_MB}MB.`)
      e.target.value = ''
      return
    }

    setFileError(null)

    if (file.type.startsWith('image/')) {
      setIsCompressing(true)
      try {
        const compressed = await compressImageToWebp(file)
        if (compressed !== file && fileInputRef.current) {
          const dt = new DataTransfer()
          dt.items.add(compressed)
          fileInputRef.current.files = dt.files
          const origSizeKb = (file.size / 1024).toFixed(0)
          const compSizeKb = (compressed.size / 1024).toFixed(0)
          const savedPct = Math.round((1 - compressed.size / file.size) * 100)
          setCompressedInfo(
            `⚡ Auto-compressed to WebP (${compSizeKb} KB from ${origSizeKb} KB — ${savedPct}% smaller)`
          )
        }
      } catch {
        setCompressedInfo(null)
      } finally {
        setIsCompressing(false)
      }
    }
  }

  const finalCategory =
    selectedCategory === '__custom__' ? customCategoryInput.trim() || 'General' : selectedCategory

  return (
    <form
      action={(formData) => {
        // Set final category in formData if custom was typed
        formData.set('category', finalCategory)
        action(formData)
      }}
      className="space-y-6"
    >
      {initialData?.file_url && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-xs font-bold text-slate-500 mb-1">Current File:</p>
          <a
            href={initialData.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-black text-[#ea580c] hover:underline flex items-center gap-1.5"
          >
            <FileUp size={14} />
            <span>View Current Resource File ↗</span>
          </a>
        </div>
      )}

      {/* File Upload Zone */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
        <label htmlFor="file" className="block text-xs font-black uppercase tracking-wider text-slate-800">
          {initialData ? 'Replace File (Optional)' : 'Resource File / Document / Image'}
        </label>

        <input
          ref={fileInputRef}
          id="file"
          name="file"
          type="file"
          accept="image/*,.pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.gif"
          onChange={handleFileChange}
          className="w-full text-xs text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-slate-100 file:text-xs file:font-black file:text-slate-700 hover:file:bg-slate-200 file:cursor-pointer cursor-pointer"
        />

        {fileError && <p className="text-xs font-bold text-red-600">{fileError}</p>}
        {isCompressing && (
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            ⚡ Optimizing &amp; converting image to WebP…
          </p>
        )}
        {!isCompressing && compressedInfo && (
          <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 inline-block">
            {compressedInfo}
          </p>
        )}
        <p className="text-[11px] text-slate-400 font-medium">
          PDF, DOC, DOCX, JPG, PNG, WebP. High-res images are automatically converted to WebP in KB to optimize website speed.
        </p>
      </div>

      {/* Title */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <label htmlFor="title" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
            Resource Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={200}
            defaultValue={initialData?.title}
            placeholder="e.g. Physical Standards Chart &amp; Training Syllabus 2026"
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
            Description / Summary <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            maxLength={500}
            defaultValue={initialData?.description}
            placeholder="Short description shown on the resource card for candidates"
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all resize-y"
          />
        </div>
      </div>

      {/* Category Dropdown + Custom Mention Option */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Category
            </label>
            <select
              id="category"
              name="categorySelect"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c.label} value={c.label}>
                  {c.label}
                </option>
              ))}
              <option value="__custom__">➕ Custom (Mention)...</option>
            </select>
          </div>

          <div>
            <label htmlFor="publishDate" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Publish Date
            </label>
            <input
              id="publishDate"
              name="publishDate"
              type="date"
              defaultValue={initialData?.publish_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
            />
          </div>
        </div>

        {/* Custom Mention Input Box */}
        {selectedCategory === '__custom__' && (
          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2 animate-[fadeIn_0.15s_ease-out]">
            <label htmlFor="customCategoryInput" className="block text-xs font-black uppercase tracking-wider text-[#ea580c]">
              Enter Custom Category Name (Mention):
            </label>
            <input
              id="customCategoryInput"
              type="text"
              required
              value={customCategoryInput}
              onChange={(e) => setCustomCategoryInput(e.target.value)}
              placeholder="e.g. Excise Guard, Police Notes, Special Circular"
              className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        )}
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
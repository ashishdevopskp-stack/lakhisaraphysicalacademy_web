'use client'

import { useState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import type { DbProduct } from '@/app/lib/action/products'

const MAX_IMAGE_MB = 5
const IMAGE_MAX_DIMENSION = 1600 // px, longest side

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

function SubmitButton({ label, blocked }: { label: string; blocked: boolean }) {
  const { pending } = useFormStatus()
  const disabled = pending || blocked
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
    >
      {pending && <Spinner />}
      {pending ? 'Saving…' : label}
    </button>
  )
}

/** Resizes + re-encodes an image in the browser to cut upload size before it hits the server. */
async function compressImage(file: File): Promise<File> {
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

  let blob = await tryEncode('image/webp', 0.8)
  let ext = 'webp'
  if (!blob) {
    blob = await tryEncode('image/jpeg', 0.82)
    ext = 'jpg'
  }
  if (!blob) return file
  if (blob.size >= file.size) return file

  const newName = file.name.replace(/\.[^.]+$/, '') + `.${ext}`
  return new File([blob], newName, { type: blob.type })
}

export function ProductForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbProduct
}) {
  const [fileError, setFileError] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressedInfo, setCompressedInfo] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setCompressedInfo(null)
    if (!file) {
      setFileError(null)
      return
    }
    if (!file.type.startsWith('image/')) {
      setFileError('Please choose an image file.')
      e.target.value = ''
      return
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setFileError(`Image must be under ${MAX_IMAGE_MB}MB.`)
      e.target.value = ''
      return
    }
    setFileError(null)
    setIsCompressing(true)
    try {
      const compressed = await compressImage(file)
      if (compressed !== file && imageInputRef.current) {
        const dt = new DataTransfer()
        dt.items.add(compressed)
        imageInputRef.current.files = dt.files
        const savedPct = Math.round((1 - compressed.size / file.size) * 100)
        setCompressedInfo(
          savedPct > 0
            ? `Compressed to ${(compressed.size / 1024 / 1024).toFixed(2)}MB (${savedPct}% smaller).`
            : `Using original (${(file.size / 1024 / 1024).toFixed(2)}MB).`
        )
      }
    } catch {
      setCompressedInfo(null)
    } finally {
      setIsCompressing(false)
    }
  }

  const blocked = Boolean(fileError || isCompressing)

  return (
    <form action={action} className="space-y-5">
      {initialData?.image_url && (
        <div>
          <p className="text-sm font-medium mb-2 text-gray-700">Current Image</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={initialData.image_url}
            alt={initialData.name}
            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
          />
        </div>
      )}

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1.5 text-gray-700">
          {initialData ? 'Replace Image (optional)' : 'Product Image'}
        </label>
        <input
          ref={imageInputRef}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer cursor-pointer"
        />
        {fileError && <p className="text-xs text-red-600 mt-1.5">{fileError}</p>}
        {isCompressing && (
          <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5">
            <Spinner /> Compressing image…
          </p>
        )}
        {!isCompressing && compressedInfo && (
          <p className="text-xs text-green-600 mt-1.5">{compressedInfo}</p>
        )}
        <p className="text-xs text-gray-400 mt-1.5">
          JPG, PNG, or WebP. Max {MAX_IMAGE_MB}MB — large images are auto-compressed before upload.
        </p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-gray-700">Product Name</label>
        <input
          id="name" name="name" type="text" required maxLength={200}
          defaultValue={initialData?.name}
          placeholder="e.g. Running Shoes – ProGrip"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1.5 text-gray-700">Category</label>
        <input
          id="category" name="category" type="text" required maxLength={100}
          defaultValue={initialData?.category}
          placeholder="e.g. Footwear"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1.5 text-gray-700">Price (₹)</label>
          <input
            id="price" name="price" type="number" min="0" step="0.01" required
            defaultValue={initialData?.price}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium mb-1.5 text-gray-700">
            Original Price <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="originalPrice" name="originalPrice" type="number" min="0" step="0.01"
            defaultValue={initialData?.original_price ?? undefined}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1.5 text-gray-700">
            Rating <span className="text-gray-400">(0–5, optional)</span>
          </label>
          <input
            id="rating" name="rating" type="number" min="0" max="5" step="0.1"
            defaultValue={initialData?.rating ?? undefined}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="availability" className="block text-sm font-medium mb-1.5 text-gray-700">Availability</label>
          <select
            id="availability" name="availability"
            defaultValue={initialData?.availability ?? 'In Stock'}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
          >
            <option value="In Stock">In Stock</option>
            <option value="Limited Stock">Limited Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Pre-Order">Pre-Order</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="offer" className="block text-sm font-medium mb-1.5 text-gray-700">
          Offer Tag <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="offer" name="offer" type="text" maxLength={50}
          defaultValue={initialData?.offer ?? undefined}
          placeholder="e.g. Best Seller, New Arrival"
          className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      <SubmitButton label={submitLabel} blocked={blocked} />
    </form>
  )
}
'use client'

import { useState, useRef, useId } from 'react'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'
import {
  Upload,
  Image as ImageIcon,
  Tag,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Star,
  Layers,
  IndianRupee,
  ShieldCheck,
  X,
  MessageCircle,
} from 'lucide-react'
import type { DbProduct } from '@/app/lib/action/products'

const MAX_IMAGE_MB = 5
const IMAGE_MAX_DIMENSION = 1600

const CATEGORY_PRESETS = [
  'Footwear & Shoes',
  'Tracksuits & Wear',
  'Army T-Shirts',
  'High Jump Gear',
  'Shot Put & Equipment',
  'Academy Supplies',
]

const OFFER_TAG_PRESETS = [
  '🔥 Best Seller',
  '⚡ New Arrival',
  '🏷️ Special Offer',
  '🏆 Academy Special',
]

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
      className="btn-orange w-full py-3.5 text-sm font-black tracking-wide shadow-xl shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
    >
      {pending ? (
        <>
          <Spinner />
          <span>Publishing to Store…</span>
        </>
      ) : (
        <>
          <ShoppingBag size={18} />
          <span>{label}</span>
        </>
      )}
    </button>
  )
}

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

  let blob = await tryEncode('image/webp', 0.82)
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
  const fileInputId = useId()
  const [fileError, setFileError] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressedInfo, setCompressedInfo] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image_url ?? null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  // Live state for Live Preview Card
  const [name, setName] = useState(initialData?.name ?? '')
  const [category, setCategory] = useState(initialData?.category ?? 'Footwear & Shoes')
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : '')
  const [originalPrice, setOriginalPrice] = useState(
    initialData?.original_price ? String(initialData.original_price) : ''
  )
  const [rating, setRating] = useState(initialData?.rating ? String(initialData.rating) : '4.8')
  const [availability, setAvailability] = useState<string>(initialData?.availability ?? 'In Stock')
  const [offer, setOffer] = useState(initialData?.offer ?? '🔥 Best Seller')

  async function handleFileChange(file: File | undefined) {
    setCompressedInfo(null)
    if (!file) {
      setFileError(null)
      return
    }
    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file (JPG, PNG, WebP).')
      return
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setFileError(`Image file size must be under ${MAX_IMAGE_MB}MB.`)
      return
    }
    setFileError(null)
    setIsCompressing(true)

    // Local thumbnail preview
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

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

  // Calculate discount percentage live
  const sellingNum = parseFloat(price) || 0
  const origNum = parseFloat(originalPrice) || 0
  const discountPct =
    origNum > sellingNum && sellingNum > 0
      ? Math.round(((origNum - sellingNum) / origNum) * 100)
      : 0

  const blocked = Boolean(fileError || isCompressing)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* ---------------- Left Form Editor (Col 1-7) ---------------- */}
      <div className="lg:col-span-7 space-y-6">
        <form action={action} className="space-y-6">
          {/* Section 1: Product Image Upload Zone */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor={fileInputId} className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <ImageIcon size={15} className="text-[#ea580c]" />
                <span>Product Media / Image</span>
              </label>
              <span className="text-[10px] font-bold text-slate-400">JPG, PNG, WebP (Max 5MB)</span>
            </div>

            {/* Custom Drag & Drop Dropzone */}
            <div
              onClick={() => imageInputRef.current?.click()}
              className={`group relative overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 ${
                previewUrl
                  ? 'border-orange-500/40 bg-orange-50/20 hover:border-orange-500'
                  : 'border-slate-200 bg-slate-50/50 hover:border-orange-500/50 hover:bg-orange-50/10'
              }`}
            >
              <input
                ref={imageInputRef}
                id={fileInputId}
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
                className="hidden"
              />

              {previewUrl ? (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow-md shrink-0"
                  />
                  <div className="text-left space-y-1 min-w-0">
                    <p className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span>Image Selected</span>
                    </p>
                    <p className="text-[11px] font-medium text-slate-500">
                      Click anywhere on this box to change or upload another photo.
                    </p>
                    {compressedInfo && (
                      <p className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block">
                        {compressedInfo}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-orange-50 text-[#ea580c] flex items-center justify-center border border-orange-200 group-hover:scale-110 transition-transform">
                    <Upload size={20} />
                  </div>
                  <p className="text-xs font-black text-slate-800">
                    Click to browse or drop product photo here
                  </p>
                  <p className="text-[11px] text-slate-500">
                    High resolution shoes, tracksuit, or equipment photos look best on store.
                  </p>
                </div>
              )}
            </div>

            {fileError && <p className="text-xs font-bold text-red-600">{fileError}</p>}
            {isCompressing && (
              <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                <Spinner /> Processing &amp; optimizing image size…
              </p>
            )}
          </div>

          {/* Section 2: Basic Product Info */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                Product Title / Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={200}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. ProGrip 1600m Running Shoes"
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="category" className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Category <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-medium">Select preset or type custom</span>
              </div>
              <input
                id="category"
                name="category"
                type="text"
                required
                maxLength={100}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Footwear & Shoes"
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
              />
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {CATEGORY_PRESETS.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                      category === cat
                        ? 'bg-[#ea580c] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Offer Tag Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="offer" className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Offer Tag / Badge <span className="text-slate-400">(Optional)</span>
                </label>
              </div>
              <input
                id="offer"
                name="offer"
                type="text"
                maxLength={50}
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="e.g. 🔥 Best Seller, ⚡ New Arrival"
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
              />
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {OFFER_TAG_PRESETS.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setOffer(tag)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                      offer === tag
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Discounts */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <IndianRupee size={15} className="text-emerald-600" />
                <span>Pricing &amp; Discount Calculator</span>
              </p>
              {discountPct > 0 && (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black">
                  {discountPct}% OFF Discount
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Offer Selling Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 1499"
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-black outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
                />
              </div>

              <div>
                <label htmlFor="originalPrice" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Original MRP (₹) <span className="text-slate-400">(Optional Strikethrough)</span>
                </label>
                <input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  min="0"
                  step="1"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="e.g. 1999"
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Rating & Availability */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rating" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Customer Rating (0 – 5.0)
                </label>
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="4.8"
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all"
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Stock Availability Status
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer"
                >
                  <option value="In Stock">In Stock (Available Now)</option>
                  <option value="Limited Stock">Limited Stock (Fast Selling)</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Pre-Order">Pre-Order</option>
                </select>
              </div>
            </div>
          </div>

          <SubmitButton label={submitLabel} blocked={blocked} />
        </form>
      </div>

      {/* ---------------- Right Live Store Card Preview (Col 8-12) ---------------- */}
      <div className="lg:col-span-5 sticky top-8 space-y-4">
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Sparkles size={15} className="text-[#ea580c]" />
            <span>Live Store Card Preview</span>
          </p>
          <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Real-Time Updates
          </span>
        </div>

        {/* E-Commerce Product Card Preview */}
        <div className="bento-card p-5 bg-white border-2 border-slate-200 rounded-3xl shadow-xl space-y-4 max-w-sm mx-auto lg:max-w-none">
          {/* Card Image Thumbnail */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Product preview"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                <ImageIcon size={36} />
                <span className="text-xs font-bold">No Image Uploaded</span>
              </div>
            )}

            {/* Offer Tag Badge */}
            {offer && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 text-amber-400 text-[10px] font-black uppercase tracking-wider backdrop-blur-md border border-amber-400/30 shadow-lg">
                {offer}
              </span>
            )}

            {/* Discount Badge */}
            {discountPct > 0 && (
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                {discountPct}% OFF
              </span>
            )}
          </div>

          {/* Card Meta Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="uppercase tracking-wider text-[10px] font-black text-[#ea580c]">
                {category || 'Footwear'}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{rating || '4.8'}</span>
              </div>
            </div>

            <h3 className="text-base font-black text-slate-900 leading-snug line-clamp-2">
              {name || 'Product Title Will Appear Here'}
            </h3>

            {/* Pricing Details */}
            <div className="flex items-baseline gap-2.5 pt-1">
              <span className="text-xl font-black text-slate-900">
                ₹{price || '0'}
              </span>
              {originalPrice && parseFloat(originalPrice) > (parseFloat(price) || 0) && (
                <span className="text-xs font-semibold text-slate-400 line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>

            {/* Availability Indicator */}
            <div className="pt-1 flex items-center justify-between">
              <span
                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  availability === 'In Stock'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                ● {availability}
              </span>

              <span className="text-[10px] font-bold text-slate-400">
                Academy Store Verified
              </span>
            </div>
          </div>

          {/* Action CTA Button Preview */}
          <div className="pt-2">
            <div className="btn-orange w-full py-2.5 text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer">
              <MessageCircle size={15} />
              <span>Order via WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
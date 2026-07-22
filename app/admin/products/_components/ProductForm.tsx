'use client'

import { useState } from 'react'
import type { DbProduct } from '@/app/lib/action/products'

const MAX_IMAGE_MB = 5

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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
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
  }

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
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer cursor-pointer"
        />
        {fileError && <p className="text-xs text-red-600 mt-1.5">{fileError}</p>}
        <p className="text-xs text-gray-400 mt-1.5">JPG, PNG, or WebP. Max {MAX_IMAGE_MB}MB.</p>
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

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  )
}
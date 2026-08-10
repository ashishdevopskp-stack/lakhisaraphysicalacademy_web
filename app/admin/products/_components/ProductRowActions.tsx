'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { toggleProductAvailability, deleteProduct, type Availability, type DbProduct } from '@/app/lib/action/products'

export function ProductRowActions({ product }: { product: DbProduct }) {
  const [isPending, startTransition] = useTransition()

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as Availability
    startTransition(async () => {
      await toggleProductAvailability(product.id, newStatus)
    })
  }

  function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return
    startTransition(async () => {
      await deleteProduct(product.id)
    })
  }

  const isUnpublished = product.availability === 'Unpublished'

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Quick Status Selector */}
      <div className="relative">
        <select
          value={product.availability}
          disabled={isPending}
          onChange={handleStatusChange}
          className={`text-xs font-black px-3 py-1.5 rounded-full border outline-none cursor-pointer transition-all ${
            product.availability === 'In Stock'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : product.availability === 'Limited Stock'
              ? 'bg-amber-100 text-amber-800 border-amber-300'
              : product.availability === 'Unpublished'
              ? 'bg-slate-200 text-slate-700 border-slate-300'
              : 'bg-red-100 text-red-800 border-red-300'
          }`}
        >
          <option value="In Stock">● In Stock</option>
          <option value="Limited Stock">● Limited Stock</option>
          <option value="Out of Stock">● Out of Stock</option>
          <option value="Pre-Order">● Pre-Order</option>
          <option value="Unpublished">🙈 Unpublished (Hidden)</option>
        </select>
      </div>

      {/* Edit Link */}
      <Link
        href={`/admin/products/${product.id}/edit`}
        className="px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
      >
        <Edit size={13} />
        <span>Edit</span>
      </Link>

      {/* Quick Toggle Publish / Unpublish Button */}
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          const next = isUnpublished ? 'In Stock' : 'Unpublished'
          startTransition(async () => {
            await toggleProductAvailability(product.id, next)
          })
        }}
        className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all border ${
          isUnpublished
            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
            : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
        }`}
        title={isUnpublished ? 'Publish to store' : 'Unpublish from store'}
      >
        {isUnpublished ? (
          <>
            <Eye size={13} />
            <span>Publish</span>
          </>
        ) : (
          <>
            <EyeOff size={13} />
            <span>Unpublish</span>
          </>
        )}
      </button>

      {/* Delete Button */}
      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
        className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
        title="Delete Product"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}

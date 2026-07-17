import type { DbProduct } from '@/app/lib/action/products'

export function ProductForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  initialData?: DbProduct
}) {
  return (
    <form action={action} className="space-y-5">
      {initialData?.image_url && (
        <div>
          <p className="text-sm font-medium mb-2">Current Image</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={initialData.image_url}
            alt={initialData.name}
            className="w-24 h-24 rounded-lg object-cover border border-white/[0.06]"
          />
        </div>
      )}

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1.5">
          {initialData ? 'Replace Image (optional)' : 'Product Image'}
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="w-full text-sm text-[#9B9BA3] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-white/[0.06] file:text-sm file:text-[#EDEDEF] hover:file:bg-white/[0.1] file:cursor-pointer cursor-pointer"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">Product Name</label>
        <input
          id="name" name="name" type="text" required
          defaultValue={initialData?.name}
          placeholder="e.g. Running Shoes – ProGrip"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1.5">Category</label>
        <input
          id="category" name="category" type="text" required
          defaultValue={initialData?.category}
          placeholder="e.g. Footwear"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1.5">Price (₹)</label>
          <input
            id="price" name="price" type="number" min="0" step="0.01" required
            defaultValue={initialData?.price}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium mb-1.5">
            Original Price <span className="text-[#9B9BA3]">(optional)</span>
          </label>
          <input
            id="originalPrice" name="originalPrice" type="number" min="0" step="0.01"
            defaultValue={initialData?.original_price ?? undefined}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1.5">
            Rating <span className="text-[#9B9BA3]">(0–5, optional)</span>
          </label>
          <input
            id="rating" name="rating" type="number" min="0" max="5" step="0.1"
            defaultValue={initialData?.rating ?? undefined}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="availability" className="block text-sm font-medium mb-1.5">Availability</label>
          <select
            id="availability" name="availability"
            defaultValue={initialData?.availability ?? 'In Stock'}
            className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
          >
            <option value="In Stock">In Stock</option>
            <option value="Limited Stock">Limited Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Pre-Order">Pre-Order</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="offer" className="block text-sm font-medium mb-1.5">
          Offer Tag <span className="text-[#9B9BA3]">(optional)</span>
        </label>
        <input
          id="offer" name="offer" type="text"
          defaultValue={initialData?.offer ?? undefined}
          placeholder="e.g. Best Seller, New Arrival"
          className="w-full bg-[#17181D] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#7C6AEF] transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#7C6AEF] hover:bg-[#6D5CE0] text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  )
}
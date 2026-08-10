import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getProducts } from '@/app/lib/action/products'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'
import { ProductRowActions } from './_components/ProductRowActions'
import { Package, Plus, CheckCircle2 } from 'lucide-react'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const products = await getProducts()

  const activeCount = products.filter((p) => p.availability !== 'Unpublished').length
  const unpublishedCount = products.filter((p) => p.availability === 'Unpublished').length

  return (
    <div className="min-h-screen liquid-mesh-bg text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Products" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-5 border-b border-amber-500/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-black mb-2">
              <Package size={14} className="text-amber-600" />
              <span>Academy Store Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Products</h1>
            <p className="text-xs sm:text-sm text-slate-600 font-bold mt-0.5">
              Manage listed products, edit prices/descriptions, publish or unpublish items live.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-white/80 border border-amber-500/20 text-slate-700 shadow-sm">
              {activeCount} Live · {unpublishedCount} Hidden
            </span>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Plus size={16} />
              <span>Add Product</span>
            </Link>
          </div>
        </div>

        {error && (
          <p className="text-sm font-bold text-red-800 bg-red-100/90 border border-red-300 rounded-2xl px-5 py-3 mb-6 shadow-sm">
            {error}
          </p>
        )}

        <div className="liquid-glass overflow-hidden shadow-xl p-4 sm:p-6">
          {products.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Package size={40} className="mx-auto text-amber-600/40" />
              <p className="text-sm font-black text-slate-800">No products added yet.</p>
              <Link href="/admin/products/new" className="inline-block text-xs font-black text-amber-700 hover:underline">
                + Add your first store product
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-amber-500/15">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 first:pt-0 last:pb-0 hover:bg-amber-500/5 px-3 rounded-2xl transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-amber-500/20 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                      {product.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={22} className="text-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-extrabold text-slate-900 truncate">{product.name}</p>
                        {product.offer && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-100 text-amber-900 border border-amber-300">
                            {product.offer}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {product.category} · <span className="font-black text-slate-900">₹{product.price}</span>
                        {product.original_price ? ` (MRP ₹${product.original_price})` : ''}
                      </p>

                      {/* Display vertical point preview count if description exists */}
                      {product.description && (
                        <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 mt-1">
                          <CheckCircle2 size={12} />
                          <span>{product.description.split('\n').filter(Boolean).length} Point-wise features added</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <ProductRowActions product={product} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, PackagePlus, Sparkles, Store } from 'lucide-react'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { createProduct } from '@/app/lib/action/products'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../../_components/AdminSidebar'
import { ProductForm } from '../_components/ProductForm'

export default async function NewProductPage({
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Products" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/products"
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
              >
                <ArrowLeft size={18} />
              </Link>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-[#ea580c] border border-orange-500/20 text-xs font-black">
                <PackagePlus size={14} />
                <span>Store Product Studio</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Add New Store Product
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Create and publish shoes, tracksuits, army gear, and training equipment to the public Academy Store.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/store"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-extrabold text-slate-700 hover:border-orange-500/40 hover:text-[#ea580c] transition-all shadow-sm"
            >
              <Store size={15} />
              <span>View Public Store</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 mb-6 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <ProductForm action={createProduct} submitLabel="Publish Product to Store" />
      </main>
    </div>
  )
}
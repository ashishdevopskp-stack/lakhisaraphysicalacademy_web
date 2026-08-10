import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit3 } from 'lucide-react'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getProduct, updateProduct } from '@/app/lib/action/products'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../../../_components/AdminSidebar'
import { ProductForm } from '../../_components/ProductForm'

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params
  const { error } = await searchParams

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const product = await getProduct(id)
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Products" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200">
          <div>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-[#ea580c] transition-colors mb-2"
            >
              <ArrowLeft size={14} />
              <span>Back to All Products</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Edit3 className="text-[#ea580c]" size={24} />
              <span>Edit Product: &ldquo;{product.name}&rdquo;</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Modify product images, prices, discount percentage, category, point-wise description, or publish status.
            </p>
          </div>
        </div>

        {error && (
          <p className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
            ⚠️ {error}
          </p>
        )}

        <ProductForm
          action={updateProduct.bind(null, id)}
          submitLabel="Save Changes to Store"
          initialData={product}
        />
      </main>
    </div>
  )
}
import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { createProduct } from '@/app/lib/action/products'
import { AdminSidebar } from '../page'
import { ProductForm } from '../_components/ProductForm'

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Products" />
      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-2xl font-semibold mb-1">Add Product</h1>
        <p className="text-sm text-[#9B9BA3] mb-8">This will appear on the store page once saved.</p>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <ProductForm action={createProduct} submitLabel="Add Product" />
      </main>
    </div>
  )
}
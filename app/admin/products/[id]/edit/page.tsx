import { redirect, notFound } from 'next/navigation'
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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Products" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-semibold mb-1">Edit Product</h1>
        <p className="text-sm text-gray-500 mb-8">
          Update details for &ldquo;{product.name}&rdquo;.
        </p>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <ProductForm
          action={updateProduct.bind(null, id)}
          submitLabel="Save Changes"
          initialData={product}
        />
      </main>
    </div>
  )
}
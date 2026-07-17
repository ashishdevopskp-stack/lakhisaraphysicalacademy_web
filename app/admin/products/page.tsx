import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getProducts, deleteProduct } from '@/app/lib/action/products'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const products = await getProducts()

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Products" />

      <main className="flex-1 p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Products</h1>
            <p className="text-sm text-[#9B9BA3]">Manage what shows up on the store page.</p>
          </div>
          <Link
            href="/admin/products/new"
            className="text-sm px-4 py-2 rounded-lg bg-[#7C6AEF] text-white font-medium hover:bg-[#6D5CE0] transition-colors"
          >
            + Add Product
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5 mb-6">
            {error}
          </p>
        )}

        <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
          {products.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-[#9B9BA3] mb-4">No products yet.</p>
              <Link href="/admin/products/new" className="text-sm text-[#7C6AEF] hover:underline">
                Add your first product
              </Link>
            </div>
          ) : (
            <div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-white/[0.06] overflow-hidden shrink-0 flex items-center justify-center">
                      {product.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-[#9B9BA3]">—</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-sm text-[#9B9BA3] truncate">
                        {product.category} · ₹{product.price}
                        {product.original_price ? ` (was ₹${product.original_price})` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span
                      className={
                        'text-xs px-2.5 py-1 rounded-full ' +
                        (product.availability === 'In Stock'
                          ? 'bg-green-500/10 text-green-400'
                          : product.availability === 'Limited Stock'
                          ? 'bg-amber-500/10 text-amber-400'
                          : product.availability === 'Out of Stock'
                          ? 'bg-white/[0.06] text-[#9B9BA3]'
                          : 'bg-blue-500/10 text-blue-400')
                      }
                    >
                      {product.availability}
                    </span>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-sm text-[#9B9BA3] hover:text-[#EDEDEF] transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct.bind(null, product.id)}>
                      <button
                        type="submit"
                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </form>
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

// Shared sidebar so nav stays consistent across /admin/* pages
export function AdminSidebar({ active }: { active: string }) {
  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Products', href: '/admin/products' },
    { label: 'Students', href: '#' },
    { label: 'Courses', href: '#' },
    { label: 'Settings', href: '#' },
  ]

  return (
    <aside className="w-64 shrink-0 border-r border-white/[0.06] flex flex-col justify-between p-5">
      <div>
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#7C6AEF] flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-white">A</span>
          </div>
          <span className="text-sm font-medium">Academy Admin</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.label === active
                  ? 'block px-3 py-2 rounded-lg text-sm font-medium bg-white/[0.06] text-white'
                  : 'block px-3 py-2 rounded-lg text-sm text-[#9B9BA3] hover:bg-white/[0.04] hover:text-[#EDEDEF] transition-colors'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
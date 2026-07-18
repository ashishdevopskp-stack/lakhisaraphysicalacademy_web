import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { logout } from '@/app/lib/action/auth'
import { getProducts } from '@/app/lib/action/products'
import { getOrders } from '@/app/lib/action/orders'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../products/page'

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  confirmed: 'bg-blue-500/10 text-blue-400',
  delivered: 'bg-green-500/10 text-green-400',
  cancelled: 'bg-white/[0.06] text-[#9B9BA3]',
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  // Defense in depth — middleware already checks this, but never
  // trust it alone in a server component
  const role = await getCurrentUserRole()
  if (role !== 'admin') {
    redirect('/')
  }

  const [products, orders] = await Promise.all([getProducts(), getOrders()])

  const totalProducts = products.length
  const inStock = products.filter((p) => p.availability === 'In Stock').length
  const limitedStock = products.filter((p) => p.availability === 'Limited Stock').length
  const outOfStock = products.filter((p) => p.availability === 'Out of Stock').length

  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.status === 'pending').length

  const stats = [
    { label: 'Total Products', value: String(totalProducts), delta: `${inStock} in stock` },
    { label: 'Limited Stock', value: String(limitedStock), delta: 'needs restocking' },
    { label: 'Out of Stock', value: String(outOfStock), delta: outOfStock > 0 ? 'action needed' : 'all good' },
    { label: 'Pending Orders', value: String(pendingOrders), delta: `${totalOrders} total orders` },
  ]

  // Most recently added/updated products stand in for "recent activity"
  const recentProducts = products.slice(0, 5)
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Dashboard" />

      {/* Main content */}
      <main className="flex-1 p-8 max-w-5xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
            <p className="text-sm text-[#9B9BA3]">
              A quick look at what&apos;s happening across the store. Signed in as{' '}
              <span className="text-[#EDEDEF]">{user.email?.split('@')[0] ?? 'Admin'}</span>.
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm px-4 py-2 border border-white/[0.08] rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#17181D] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-colors"
            >
              <p className="text-sm text-[#9B9BA3] mb-3">{stat.label}</p>
              <p className="text-2xl font-semibold tabular-nums mb-1.5 truncate">{stat.value}</p>
              <p className="text-xs text-[#7C6AEF]">{stat.delta}</p>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-medium">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#7C6AEF] hover:underline">
              View all
            </Link>
          </div>

          <div>
            {recentOrders.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-[#9B9BA3]">No orders yet.</p>
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-5 py-3.5 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {order.product_name} × {order.quantity}
                    </p>
                    <p className="text-sm text-[#9B9BA3] truncate">
                      {order.customer_name} · {order.phone}
                    </p>
                  </div>
                  <span
                    className={
                      'text-xs px-2.5 py-1 rounded-full shrink-0 ml-4 ' +
                      ORDER_STATUS_STYLES[order.status]
                    }
                  >
                    {order.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent products */}
        <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-medium">Recently Added Products</h2>
            <Link href="/admin/products" className="text-xs text-[#7C6AEF] hover:underline">
              View all
            </Link>
          </div>

          <div>
            {recentProducts.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-[#9B9BA3] mb-3">No products yet.</p>
                <Link href="/admin/products/new" className="text-sm text-[#7C6AEF] hover:underline">
                  Add your first product
                </Link>
              </div>
            ) : (
              recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between px-5 py-3.5 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] overflow-hidden flex items-center justify-center shrink-0">
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
                      </p>
                    </div>
                  </div>
                  <span
                    className={
                      'text-xs px-2.5 py-1 rounded-full shrink-0 ml-4 ' +
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
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
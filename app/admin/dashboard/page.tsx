import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUserRole, logout } from '@/app/lib/action/auth'
import { getProducts } from '@/app/lib/action/products'
import { getOrders } from '@/app/lib/action/orders'
import { getBlogs } from '@/app/lib/action/blogs'
import { getEvents } from '@/app/lib/action/events'
import { getResults } from '@/app/lib/action/results'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../products/page'

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  confirmed: 'bg-blue-500/10 text-blue-400',
  delivered: 'bg-green-500/10 text-green-400',
  cancelled: 'bg-white/[0.06] text-[#9B9BA3]',
}

const PRODUCT_STATUS_STYLES: Record<string, string> = {
  'In Stock': 'bg-green-500/10 text-green-400',
  'Limited Stock': 'bg-amber-500/10 text-amber-400',
  'Out of Stock': 'bg-white/[0.06] text-[#9B9BA3]',
  'Pre-Order': 'bg-blue-500/10 text-blue-400',
}

const EVENT_STATUS_STYLES: Record<string, string> = {
  Open: 'bg-green-500/10 text-green-400',
  Closed: 'bg-white/[0.06] text-[#9B9BA3]',
}

const RESULT_STATUS_STYLES: Record<string, string> = {
  Selected: 'bg-green-500/10 text-green-400',
  'Under Training': 'bg-blue-500/10 text-blue-400',
  'Document Verification': 'bg-amber-500/10 text-amber-400',
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const [products, orders, blogs, events, results] = await Promise.all([
    getProducts(),
    getOrders(),
    getBlogs(),
    getEvents(),
    getResults(),
  ])

  const inStock = products.filter((p) => p.availability === 'In Stock').length
  const limitedStock = products.filter((p) => p.availability === 'Limited Stock').length
  const outOfStock = products.filter((p) => p.availability === 'Out of Stock').length
  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const openEvents = events.filter((e) => e.status === 'Open').length
  const selectedResults = results.filter((r) => r.status === 'Selected').length

  const stats = [
    { label: 'Total Products', value: products.length, delta: `${inStock} in stock` },
    { label: 'Limited Stock', value: limitedStock, delta: 'needs restocking' },
    { label: 'Out of Stock', value: outOfStock, delta: outOfStock > 0 ? 'action needed' : 'all good' },
    { label: 'Pending Orders', value: pendingOrders, delta: `${orders.length} total orders` },
    { label: 'Total Blogs', value: blogs.length, delta: `${blogs.reduce((sum, b) => sum + b.views, 0).toLocaleString('en-IN')} views` },
    { label: 'Total Events', value: events.length, delta: `${openEvents} open for registration` },
    { label: 'Total Results', value: results.length, delta: `${selectedResults} selected` },
  ]

  const recentOrders = orders.slice(0, 5)
  const recentProducts = products.slice(0, 5)
  const recentBlogs = blogs.slice(0, 5)
  const recentEvents = events.slice(0, 5)
  const recentResults = results.slice(0, 5)

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex flex-col lg:flex-row">
      <AdminSidebar active="Dashboard" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
            <p className="text-sm text-[#9B9BA3]">
              Signed in as <span className="text-[#EDEDEF]">{user.email?.split('@')[0] ?? 'Admin'}</span>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#17181D] border border-white/[0.06] rounded-xl p-4 sm:p-5 hover:border-white/[0.12] transition-colors"
            >
              <p className="text-xs sm:text-sm text-[#9B9BA3] mb-2 sm:mb-3 truncate">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-semibold tabular-nums mb-1.5 truncate">{stat.value}</p>
              <p className="text-xs text-[#7C6AEF] truncate">{stat.delta}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="text-sm font-medium">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs text-[#7C6AEF] hover:underline">View all</Link>
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
                    className="flex items-center justify-between gap-3 px-5 py-3.5 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {order.product_name} × {order.quantity}
                      </p>
                      <p className="text-sm text-[#9B9BA3] truncate">
                        {order.customer_name} · {order.phone}
                      </p>
                    </div>
                    <span className={'text-xs px-2.5 py-1 rounded-full shrink-0 ' + ORDER_STATUS_STYLES[order.status]}>
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
              <h2 className="text-sm font-medium">Recent Products</h2>
              <Link href="/admin/products" className="text-xs text-[#7C6AEF] hover:underline">View all</Link>
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
                    className="flex items-center justify-between gap-3 px-5 py-3.5 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
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
                        <p className="text-sm text-[#9B9BA3] truncate">{product.category} · ₹{product.price}</p>
                      </div>
                    </div>
                    <span className={'text-xs px-2.5 py-1 rounded-full shrink-0 ' + PRODUCT_STATUS_STYLES[product.availability]}>
                      {product.availability}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent blogs */}
          <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="text-sm font-medium">Recent Blogs</h2>
              <Link href="/admin/blogs" className="text-xs text-[#7C6AEF] hover:underline">View all</Link>
            </div>
            <div>
              {recentBlogs.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-[#9B9BA3] mb-3">No blogs yet.</p>
                  <Link href="/admin/blogs/new" className="text-sm text-[#7C6AEF] hover:underline">
                    Add your first blog
                  </Link>
                </div>
              ) : (
                recentBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-center justify-between gap-3 px-5 py-3.5 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] overflow-hidden flex items-center justify-center shrink-0">
                        {blog.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-[#9B9BA3]">—</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{blog.title}</p>
                        <p className="text-sm text-[#9B9BA3] truncate">{blog.category} · {blog.author}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full shrink-0 bg-white/[0.06] text-[#9B9BA3]">
                      {blog.views.toLocaleString('en-IN')} views
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent events */}
          <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="text-sm font-medium">Recent Events</h2>
              <Link href="/admin/events" className="text-xs text-[#7C6AEF] hover:underline">View all</Link>
            </div>
            <div>
              {recentEvents.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-[#9B9BA3] mb-3">No events yet.</p>
                  <Link href="/admin/events/new" className="text-sm text-[#7C6AEF] hover:underline">
                    Add your first event
                  </Link>
                </div>
              ) : (
                recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between gap-3 px-5 py-3.5 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-sm text-[#9B9BA3] truncate">{event.category} · {event.event_date}</p>
                    </div>
                    <span className={'text-xs px-2.5 py-1 rounded-full shrink-0 ' + EVENT_STATUS_STYLES[event.status]}>
                      {event.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent results */}
          <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="text-sm font-medium">Recent Results</h2>
              <Link href="/admin/results" className="text-xs text-[#7C6AEF] hover:underline">View all</Link>
            </div>
            <div>
              {recentResults.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-[#9B9BA3] mb-3">No results yet.</p>
                  <Link href="/admin/results/new" className="text-sm text-[#7C6AEF] hover:underline">
                    Add your first result
                  </Link>
                </div>
              ) : (
                recentResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between gap-3 px-5 py-3.5 border-b last:border-b-0 border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] overflow-hidden flex items-center justify-center shrink-0">
                        {result.photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={result.photo_url} alt={result.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-[#9B9BA3]">—</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{result.name}</p>
                        <p className="text-sm text-[#9B9BA3] truncate">{result.department} · {result.year}</p>
                      </div>
                    </div>
                    <span className={'text-xs px-2.5 py-1 rounded-full shrink-0 ' + RESULT_STATUS_STYLES[result.status]}>
                      {result.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
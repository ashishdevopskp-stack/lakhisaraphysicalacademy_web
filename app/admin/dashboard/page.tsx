import { redirect } from 'next/navigation'
import {
  Package, ShoppingCart, FileText, Calendar, Award, BookOpen, Briefcase, PlayCircle, Activity, AlertTriangle,
} from 'lucide-react'
import { getCurrentUserRole, logout } from '@/app/lib/action/auth'
import { getProducts } from '@/app/lib/action/products'
import { getOrders } from '@/app/lib/action/orders'
import { getBlogs } from '@/app/lib/action/blogs'
import { getEvents } from '@/app/lib/action/events'
import { getResults } from '@/app/lib/action/results'
import { getResources } from '@/app/lib/action/resources'
import { getJobs } from '@/app/lib/action/jobs'
import { getVideos } from '@/app/lib/action/videos'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'
import { StatCard } from '../_components/StatCard'
import { ActivityFeed, type ActivityItem } from '../_components/ActivityFeed'

// Reads loosely (as Record<string, unknown>) on purpose — we don't know the
// exact field names on every content type, and guessing wrong with strict
// types would fail the build. Runtime-safe: falls back to sensible defaults
// instead of crashing if a field is missing or named differently.
function toActivityItem(
  raw: unknown,
  type: ActivityItem['type'],
  href: string,
  titleFields: string[],
  metaFields: string[]
): ActivityItem {
  const obj = (raw ?? {}) as Record<string, unknown>

  const id = obj.id != null ? String(obj.id) : Math.random().toString(36).slice(2)

  const title =
    titleFields.map((f) => obj[f]).find((v) => typeof v === 'string' && v.length > 0) as string | undefined

  const meta =
    metaFields.map((f) => obj[f]).find((v) => typeof v === 'string' || typeof v === 'number')

  const dateVal =
    [obj.created_at, obj.createdAt, obj.date, obj.published_at, obj.publishedAt].find(
      (v) => typeof v === 'string'
    ) as string | undefined

  return {
    id,
    type,
    title: title ?? type[0].toUpperCase() + type.slice(1),
    meta: meta != null ? String(meta) : undefined,
    date: dateVal ?? null,
    href,
  }
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  let dataError: string | null = null
  let products: Awaited<ReturnType<typeof getProducts>> = []
  let orders: Awaited<ReturnType<typeof getOrders>> = []
  let blogs: Awaited<ReturnType<typeof getBlogs>> = []
  let events: Awaited<ReturnType<typeof getEvents>> = []
  let results: Awaited<ReturnType<typeof getResults>> = []
  let resources: Awaited<ReturnType<typeof getResources>> = []
  let jobs: Awaited<ReturnType<typeof getJobs>> = []
  let videos: Awaited<ReturnType<typeof getVideos>> = []

  try {
    ;[products, orders, blogs, events, results, resources, jobs, videos] = await Promise.all([
      getProducts(),
      getOrders(),
      getBlogs(),
      getEvents(),
      getResults(),
      getResources(),
      getJobs(),
      getVideos(),
    ])
  } catch (err) {
    console.error('Dashboard data fetch failed:', err)
    dataError = 'Some dashboard data failed to load. Numbers below may be incomplete.'
  }

  const inStock = products.filter((p) => p.availability === 'In Stock').length
  const limitedStock = products.filter((p) => p.availability === 'Limited Stock').length
  const outOfStock = products.filter((p) => p.availability === 'Out of Stock').length
  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const openEvents = events.filter((e) => e.status === 'Open').length
  const selectedResults = results.filter((r) => r.status === 'Selected').length
  const totalResourceDownloads = resources.reduce((sum, r) => sum + r.downloads, 0)
  const newJobs = jobs.filter((j) => j.status === 'New').length
  const ongoingJobs = jobs.filter((j) => j.status === 'Ongoing').length
  const publishedVideos = videos.filter((v) => v.status === 'Published').length

  const stats = [
    { label: 'Total Products', value: products.length, delta: `${inStock} in stock`, href: '/admin/products', icon: Package, tint: 'indigo' as const },
    { label: 'Limited Stock', value: limitedStock, delta: 'needs restocking', href: '/admin/products', icon: Package, tint: 'amber' as const },
    { label: 'Out of Stock', value: outOfStock, delta: outOfStock > 0 ? 'action needed' : 'all good', href: '/admin/products', icon: Package, tint: outOfStock > 0 ? 'red' as const : 'green' as const },
    { label: 'Pending Orders', value: pendingOrders, delta: `${orders.length} total orders`, href: '/admin/orders', icon: ShoppingCart, tint: 'amber' as const },
    { label: 'Total Blogs', value: blogs.length, delta: `${blogs.reduce((sum, b) => sum + b.views, 0).toLocaleString('en-IN')} views`, href: '/admin/blogs', icon: FileText, tint: 'indigo' as const },
    { label: 'Total Events', value: events.length, delta: `${openEvents} open for registration`, href: '/admin/events', icon: Calendar, tint: 'green' as const },
    { label: 'Total Results', value: results.length, delta: `${selectedResults} selected`, href: '/admin/results', icon: Award, tint: 'indigo' as const },
    { label: 'Total Resources', value: resources.length, delta: `${totalResourceDownloads.toLocaleString('en-IN')} downloads`, href: '/admin/resources', icon: BookOpen, tint: 'indigo' as const },
    { label: 'Total Jobs', value: jobs.length, delta: `${newJobs} new · ${ongoingJobs} ongoing`, href: '/admin/jobs', icon: Briefcase, tint: 'green' as const },
    { label: 'Total Videos', value: videos.length, delta: `${publishedVideos} published`, href: '/admin/videos', icon: PlayCircle, tint: 'indigo' as const },
  ]

  const activity: ActivityItem[] = [
    ...products.map((p) => toActivityItem(p, 'product', '/admin/products', ['name', 'title'], ['availability'])),
    ...orders.map((o) => toActivityItem(o, 'order', '/admin/orders', ['id'], ['status'])),
    ...blogs.map((b) => toActivityItem(b, 'blog', '/admin/blogs', ['title'], ['views'])),
    ...events.map((e) => toActivityItem(e, 'event', '/admin/events', ['title'], ['status'])),
    ...results.map((r) => toActivityItem(r, 'result', '/admin/results', ['title'], ['status'])),
    ...jobs.map((j) => toActivityItem(j, 'job', '/admin/jobs', ['title'], ['status'])),
    ...videos.map((v) => toActivityItem(v, 'video', '/admin/videos', ['title'], ['status'])),
  ]
    .filter((item) => item.date !== null)
    .sort((a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Dashboard" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Signed in as <span className="text-gray-900 font-medium">{user.email?.split('@')[0] ?? 'Admin'}</span>
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>

        {dataError && (
          <div className="flex items-start gap-2.5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p>{dataError}</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Activity size={16} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
              <p className="text-xs text-gray-500">Latest updates across your content</p>
            </div>
          </div>
          <ActivityFeed items={activity} />
        </div>
      </main>
    </div>
  )
}
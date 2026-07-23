import { redirect } from 'next/navigation'
import {
  Package, ShoppingCart, FileText, Calendar, Award, BookOpen, Briefcase, PlayCircle,
  Activity, AlertTriangle, Image as ImageIcon, ClipboardList,
} from 'lucide-react'
import { getCurrentUserRole, logout } from '@/app/lib/action/auth'
import { getProducts } from '@/app/lib/action/products'
import { getOrders } from '@/app/lib/action/orders'
import { getBlogs } from '@/app/lib/action/blogs'
import { getEvents, getGalleryImages } from '@/app/lib/action/events'
import { getResults } from '@/app/lib/action/results'
import { getResources } from '@/app/lib/action/resources'
import { getJobs } from '@/app/lib/action/jobs'
import { getVideos } from '@/app/lib/action/videos'
import { getAdmissions } from '@/app/lib/action/admissions'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'
import { StatCard } from '../_components/StatCard'
import { ActivityFeed, type ActivityItem } from '../_components/ActivityFeed'
import { RefreshButton } from '../_components/Refreshbutton'

// This page is gated behind an admin-only auth check below. Force it to
// render fresh on every request rather than risk Next serving a cached
// RSC payload (with another admin's session context or stale stats) to
// a different visitor.
export const dynamic = 'force-dynamic'

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

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  // Fetch everything in parallel, but with allSettled instead of Promise.all:
  // one slow/broken source (e.g. videos table down) no longer wipes out data
  // that fetched successfully. Each section degrades independently.
  const [
    productsR, ordersR, blogsR, eventsR, resultsR, resourcesR, jobsR, videosR, galleryR, admissionsR,
  ] = await Promise.allSettled([
    getProducts(),
    getOrders(),
    getBlogs(),
    getEvents(),
    getResults(),
    getResources(),
    getJobs(),
    getVideos(),
    getGalleryImages(),
    getAdmissions(),
  ])

  const products = productsR.status === 'fulfilled' ? productsR.value : []
  const orders = ordersR.status === 'fulfilled' ? ordersR.value : []
  const blogs = blogsR.status === 'fulfilled' ? blogsR.value : []
  const events = eventsR.status === 'fulfilled' ? eventsR.value : []
  const results = resultsR.status === 'fulfilled' ? resultsR.value : []
  const resources = resourcesR.status === 'fulfilled' ? resourcesR.value : []
  const jobs = jobsR.status === 'fulfilled' ? jobsR.value : []
  const videos = videosR.status === 'fulfilled' ? videosR.value : []
  const gallery = galleryR.status === 'fulfilled' ? galleryR.value : []
  const admissions = admissionsR.status === 'fulfilled' ? admissionsR.value : []

  const failedSources = [
    ['products', productsR], ['orders', ordersR], ['blogs', blogsR], ['events', eventsR],
    ['results', resultsR], ['resources', resourcesR], ['jobs', jobsR], ['videos', videosR],
    ['gallery', galleryR], ['admissions', admissionsR],
  ].filter(([, r]) => (r as PromiseSettledResult<unknown>).status === 'rejected').map(([name]) => name as string)

  if (failedSources.length > 0) {
    console.error('Dashboard data fetch failed for:', failedSources.join(', '))
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
  const pendingAdmissions = admissions.filter((a) => a.status === 'pending').length

  const stats = [
    { label: 'Total Products', value: products.length, delta: `${inStock} in stock`, href: '/admin/products', icon: Package, tint: 'indigo' as const },
    { label: 'Limited Stock', value: limitedStock, delta: 'needs restocking', href: '/admin/products', icon: Package, tint: 'amber' as const },
    { label: 'Out of Stock', value: outOfStock, delta: outOfStock > 0 ? 'action needed' : 'all good', href: '/admin/products', icon: Package, tint: outOfStock > 0 ? 'red' as const : 'green' as const },
    { label: 'Pending Orders', value: pendingOrders, delta: `${orders.length} total orders`, href: '/admin/orders', icon: ShoppingCart, tint: 'amber' as const },
    { label: 'Total Blogs', value: blogs.length, delta: `${blogs.reduce((sum, b) => sum + b.views, 0).toLocaleString('en-IN')} views`, href: '/admin/blogs', icon: FileText, tint: 'indigo' as const },
    { label: 'Total Events', value: events.length, delta: `${openEvents} open for registration`, href: '/admin/events', icon: Calendar, tint: 'green' as const },
    { label: 'Gallery Images', value: gallery.length, delta: 'across all events', href: '/admin/events/gallery', icon: ImageIcon, tint: 'green' as const },
    { label: 'Total Results', value: results.length, delta: `${selectedResults} selected`, href: '/admin/results', icon: Award, tint: 'indigo' as const },
    { label: 'Total Resources', value: resources.length, delta: `${totalResourceDownloads.toLocaleString('en-IN')} downloads`, href: '/admin/resources', icon: BookOpen, tint: 'indigo' as const },
    { label: 'Total Jobs', value: jobs.length, delta: `${newJobs} new · ${ongoingJobs} ongoing`, href: '/admin/jobs', icon: Briefcase, tint: 'green' as const },
    { label: 'Total Videos', value: videos.length, delta: `${publishedVideos} published`, href: '/admin/videos', icon: PlayCircle, tint: 'indigo' as const },
    { label: 'Total Admissions', value: admissions.length, delta: `${pendingAdmissions} pending`, href: '/admin/admissions', icon: ClipboardList, tint: pendingAdmissions > 0 ? 'amber' as const : 'indigo' as const },
  ]

  const activity: ActivityItem[] = [
    ...products.map((p) => toActivityItem(p, 'product', '/admin/products', ['name', 'title'], ['availability'])),
    ...orders.map((o) => toActivityItem(o, 'order', '/admin/orders', ['id'], ['status'])),
    ...blogs.map((b) => toActivityItem(b, 'blog', '/admin/blogs', ['title'], ['views'])),
    ...events.map((e) => toActivityItem(e, 'event', '/admin/events', ['title'], ['status'])),
    ...results.map((r) => toActivityItem(r, 'result', '/admin/results', ['title'], ['status'])),
    ...jobs.map((j) => toActivityItem(j, 'job', '/admin/jobs', ['title'], ['status'])),
    ...videos.map((v) => toActivityItem(v, 'video', '/admin/videos', ['title'], ['status'])),
    ...gallery.map((g) => toActivityItem(g, 'gallery', '/admin/events/gallery', ['label'], [])),
    ...admissions.map((a) => toActivityItem(a, 'admission', '/admin/admissions', ['student_name'], ['status'])),
  ]
    .filter((item) => item.date !== null)
    .sort((a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime())
    .slice(0, 5)

  const firstName = user.email?.split('@')[0] ?? 'Admin'

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Dashboard" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              {greeting()}, <span className="text-indigo-600">{firstName}</span>
            </h1>
            <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening across your site right now.</p>
          </div>
          <div className="flex items-center gap-2">
            <RefreshButton />
            <form action={logout}>
              <button
                type="submit"
                className="text-sm px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        {failedSources.length > 0 && (
          <div className="flex items-start gap-2.5 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              Couldn&apos;t load {failedSources.join(', ')} right now — other numbers below are still live.
              Try refreshing in a moment.
            </p>
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
              <Activity size={16} aria-hidden="true" />
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
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
    <div className="min-h-screen liquid-mesh-bg text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Dashboard" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full">
        {/* Organic Liquid Wave Hero Banner (Inspired by mockup chart card) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 p-6 sm:p-8 mb-8 shadow-2xl text-slate-900">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/20 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/10 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-2">
                <span>⚡ Live Academy Dashboard</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {greeting()}, <span className="underline decoration-slate-950/30">{firstName}</span>
              </h1>
              <p className="mt-1 text-sm font-bold text-slate-800/90 max-w-xl">
                Real-time insights across physical batches, Bhojan tokens, admissions, events &amp; store orders.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <RefreshButton />
              <form action={logout}>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-slate-950 text-white font-extrabold text-xs shadow-lg hover:bg-slate-900 active:scale-95 transition-all"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>

          {/* Dynamic SVG Liquid Wave Accent */}
          <div className="mt-6 pt-4 border-t border-slate-950/15 flex items-center justify-between">
            <svg className="w-full h-12 text-slate-950/20 stroke-current fill-none" viewBox="0 0 500 50">
              <path d="M 0 30 Q 125 5, 250 25 T 500 15" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {failedSources.length > 0 && (
          <div className="flex items-start gap-2.5 text-sm text-amber-900 bg-amber-100/90 border border-amber-300 rounded-2xl px-5 py-3.5 mb-6 backdrop-blur-md shadow-sm">
            <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-700" aria-hidden="true" />
            <p className="font-bold">
              Couldn&apos;t load {failedSources.join(', ')} right now — other numbers below are still live.
              Try refreshing in a moment.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="liquid-glass p-5 sm:p-7 shadow-xl">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-500/15">
            <span className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0 shadow-sm border border-amber-500/30">
              <Activity size={18} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Recent Activity</h2>
              <p className="text-xs font-bold text-amber-900/70">Latest updates across admissions, products &amp; tokens</p>
            </div>
          </div>
          <ActivityFeed items={activity} />
        </div>
      </main>
    </div>
  )
}
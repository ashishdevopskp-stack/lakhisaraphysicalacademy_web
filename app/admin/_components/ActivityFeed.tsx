import { memo } from 'react'
import Link from 'next/link'
import { Package, ShoppingCart, FileText, Calendar, Award, Briefcase, PlayCircle, Image as ImageIcon, ClipboardList } from 'lucide-react'

export type ActivityItem = {
  id: string
  type: 'product' | 'order' | 'blog' | 'event' | 'result' | 'job' | 'video' | 'gallery' | 'admission'
  title: string
  meta?: string
  date: string | null
  href: string
}

const ICONS: Record<ActivityItem['type'], React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>> = {
  product: Package,
  order: ShoppingCart,
  blog: FileText,
  event: Calendar,
  result: Award,
  job: Briefcase,
  video: PlayCircle,
  gallery: ImageIcon,
  admission: ClipboardList,
}

const TINTS: Record<ActivityItem['type'], string> = {
  product: 'bg-indigo-50 text-indigo-600',
  order: 'bg-amber-50 text-amber-600',
  blog: 'bg-indigo-50 text-indigo-600',
  event: 'bg-green-50 text-green-600',
  result: 'bg-indigo-50 text-indigo-600',
  job: 'bg-green-50 text-green-600',
  video: 'bg-indigo-50 text-indigo-600',
  gallery: 'bg-green-50 text-green-600',
  admission: 'bg-amber-50 text-amber-600',
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return ''
  const then = new Date(dateStr).getTime()
  if (Number.isNaN(then)) return ''

  const diffMs = Date.now() - then
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`

  const then_ = new Date(dateStr)
  const sameYear = then_.getFullYear() === new Date().getFullYear()
  return then_.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: sameYear ? undefined : 'numeric',
  })
}

function ActivityFeedBase({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center px-6">
        <p className="text-sm font-medium text-gray-700 mb-1">No recent activity</p>
        <p className="text-xs text-gray-400 max-w-xs">
          New products, orders, blogs and more will show up here as they&apos;re added.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-gray-100">
      {items.map((item) => {
        const Icon = ICONS[item.type]
        return (
          <li key={`${item.type}-${item.id}`}>
            <Link
              href={item.href}
              className="flex items-center gap-3 py-3 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${TINTS[item.type]}`}>
                <Icon size={15} aria-hidden={true} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-900 truncate" title={item.title}>
                  {item.title}
                </p>
                {item.meta && (
                  <p className="text-xs text-gray-500 truncate" title={item.meta}>
                    {item.meta}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-400 shrink-0">{timeAgo(item.date)}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

// Memoized since the dashboard re-fetches multiple data sources on every
// server render but the feed's own item list rarely changes shape.
export const ActivityFeed = memo(ActivityFeedBase)
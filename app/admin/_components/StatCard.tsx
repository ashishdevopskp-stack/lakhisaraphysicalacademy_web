import { memo } from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

const TINT: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-600',
  green: 'bg-green-50 text-green-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  gray: 'bg-gray-100 text-gray-500',
}

function StatCardBase({
  label,
  value,
  delta,
  href,
  icon: Icon,
  tint = 'indigo',
}: {
  label: string
  value: number
  delta: string
  href: string
  icon: LucideIcon
  tint?: keyof typeof TINT
}) {
  return (
    <Link
      href={href}
      className="group bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-all flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={
            'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ' +
            TINT[tint]
          }
        >
          <Icon size={17} aria-hidden="true" />
        </span>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate" title={label}>
        {label}
      </p>
      <p className="text-xl sm:text-2xl font-semibold tabular-nums mb-1.5 truncate text-gray-900">
        {value.toLocaleString('en-IN')}
      </p>
      <p
        className="text-xs text-gray-500 truncate group-hover:text-indigo-600 transition-colors"
        title={delta}
      >
        {delta}
      </p>
    </Link>
  )
}

// Dashboards render several of these side by side; memoizing keeps a
// re-render of one stat (or the parent list re-ordering) from re-rendering
// every card on the page.
export const StatCard = memo(StatCardBase)
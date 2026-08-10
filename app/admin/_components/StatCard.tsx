import { memo } from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

const TINT: Record<string, string> = {
  indigo: 'bg-amber-500/15 text-amber-900 border border-amber-500/25',
  green: 'bg-emerald-500/15 text-emerald-900 border border-emerald-500/25',
  amber: 'bg-amber-500/20 text-amber-950 border border-amber-500/30',
  red: 'bg-red-500/15 text-red-900 border border-red-500/25',
  gray: 'bg-slate-200/60 text-slate-700 border border-slate-300/40',
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
      className="group liquid-glass p-4 sm:p-5 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={
            'w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm ' +
            TINT[tint]
          }
        >
          <Icon size={19} aria-hidden="true" />
        </span>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-700 mb-1 truncate" title={label}>
          {label}
        </p>
        <p className="text-2xl sm:text-3xl font-black tabular-nums mb-1.5 truncate text-slate-900">
          {value.toLocaleString('en-IN')}
        </p>
        <p
          className="text-xs font-extrabold text-amber-800/80 truncate group-hover:text-amber-900 transition-colors"
          title={delta}
        >
          {delta}
        </p>
      </div>
    </Link>
  )
}

// Dashboards render several of these side by side; memoizing keeps a
// re-render of one stat (or the parent list re-ordering) from re-rendering
// every card on the page.
export const StatCard = memo(StatCardBase)
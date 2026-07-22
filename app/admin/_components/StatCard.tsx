import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

const TINT: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-600',
  green: 'bg-green-50 text-green-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  gray: 'bg-gray-100 text-gray-500',
}

export function StatCard({
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
      className="group bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ' + TINT[tint]}>
          <Icon size={17} />
        </span>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">{label}</p>
      <p className="text-xl sm:text-2xl font-semibold tabular-nums mb-1.5 truncate text-gray-900">
        {value.toLocaleString('en-IN')}
      </p>
      <p className="text-xs text-gray-500 truncate group-hover:text-indigo-600 transition-colors">{delta}</p>
    </Link>
  )
}
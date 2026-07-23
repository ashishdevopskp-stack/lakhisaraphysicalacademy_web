'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw } from 'lucide-react'

export function RefreshButton() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => startTransition(() => router.refresh())}
      disabled={pending}
      aria-label="Refresh dashboard data"
      className="inline-flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors disabled:opacity-60"
    >
      <RefreshCw size={14} className={pending ? 'animate-spin' : ''} aria-hidden="true" />
      {pending ? 'Refreshing…' : 'Refresh'}
    </button>
  )
}
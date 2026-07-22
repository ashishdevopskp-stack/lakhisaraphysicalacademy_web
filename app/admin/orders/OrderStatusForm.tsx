'use client'

import { useTransition } from 'react'
import { updateOrderStatus, type DbOrder } from '@/app/lib/action/orders'

export function OrderStatusForm({
  id,
  status,
}: {
  id: string
  status: DbOrder['status']
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as DbOrder['status']
        startTransition(() => {
          updateOrderStatus(id, next)
        })
      }}
      className="bg-white border border-gray-300 text-gray-900 rounded-lg px-2 py-1 text-xs outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50 transition-colors"
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  )
}
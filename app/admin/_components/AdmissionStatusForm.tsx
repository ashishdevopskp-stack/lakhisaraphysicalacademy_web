'use client'

import { useTransition } from 'react'
import { updateAdmissionStatus, type AdmissionStatus } from '@/app/lib/action/admissions'

const STATUS_STYLES: Record<AdmissionStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  approved: 'bg-blue-50 text-blue-700 border border-blue-200',
  enrolled: 'bg-green-50 text-green-700 border border-green-200',
  rejected: 'bg-gray-100 text-gray-600 border border-gray-200',
}

export function AdmissionStatusForm({ id, status }: { id: string; status: AdmissionStatus }) {
  const [isPending, startTransition] = useTransition()

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as AdmissionStatus
        startTransition(() => {
          updateAdmissionStatus(id, next)
        })
      }}
      className="bg-white border border-gray-300 text-gray-900 rounded-lg px-2 py-1 text-xs outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50 transition-colors"
    >
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="enrolled">Enrolled</option>
      <option value="rejected">Rejected</option>
    </select>
  )
}

export { STATUS_STYLES }
import Link from 'next/link'
import { Plus, Layers, Utensils, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { getTokens, getTokenStats, cancelToken } from '@/app/lib/action/tokens'
import { AdminSidebar } from '../_components/AdminSidebar'
import { StatCard } from '../_components/StatCard'

const STATUS_STYLE: Record<string, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  used: 'bg-gray-100 text-gray-600 border-gray-200',
  expired: 'bg-amber-50 text-amber-700 border-amber-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

export default async function TokenListPage() {
  const [tokens, stats] = await Promise.all([getTokens(), getTokenStats()])

  async function cancel(formData: FormData) {
    'use server'
    await cancelToken(String(formData.get('id')))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Bhojan Token" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Bhojan Tokens</h1>
            <p className="text-sm text-gray-500">Mess tokens generated for hostel students.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/token/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Plus size={16} /> Generate Single
            </Link>
            <Link
              href="/admin/token/bulk"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              <Layers size={16} /> Bulk Generate
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <StatCard label="Total Tokens" value={stats.total} delta="all time" href="/admin/token" icon={Utensils} tint="indigo" />
          <StatCard label="Active" value={stats.active} delta="currently valid" href="/admin/token" icon={CheckCircle2} tint="green" />
          <StatCard label="Expired" value={stats.expired} delta="past validity" href="/admin/token" icon={Clock} tint="amber" />
          <StatCard label="Cancelled" value={stats.cancelled} delta="manually voided" href="/admin/token" icon={XCircle} tint="red" />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Token #</th>
                <th className="text-left px-4 py-3 font-medium">Student</th>
                <th className="text-left px-4 py-3 font-medium">Hostel / Room</th>
                <th className="text-left px-4 py-3 font-medium">Meal Plan</th>
                <th className="text-left px-4 py-3 font-medium">Expiry</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tokens.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {String(t.token_number).padStart(2, '0')}
                    <span className="text-gray-400 font-normal ml-1">· S/N {t.serial_number}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{t.students?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {t.students?.hostels?.name ?? '—'} · Room {t.students?.rooms?.room_number ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{t.meal_plans?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{t.expiry_date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLE[t.status]}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {t.status === 'active' && (
                      <form action={cancel}>
                        <input type="hidden" name="id" value={t.id} />
                        <button type="submit" className="text-xs font-medium text-red-600 hover:underline">
                          Cancel
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {tokens.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                    No tokens generated yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
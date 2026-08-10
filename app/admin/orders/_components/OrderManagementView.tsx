'use client'

import { useState, useTransition } from 'react'
import {
  Search,
  Phone,
  MessageCircle,
  Clock,
  User,
  MapPin,
  CreditCard,
  Package,
  ShoppingBag,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  Filter,
} from 'lucide-react'
import type { DbOrder } from '@/app/lib/action/orders'
import { updateOrderStatus, deleteOrder } from '@/app/lib/action/orders'
import { telHref, whatsappHref } from '@/app/lib/constants'

const STATUS_PILLS = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'PENDING' },
  { id: 'confirmed', label: 'CONFIRMED' },
  { id: 'delivered', label: 'DELIVERED' },
  { id: 'cancelled', label: 'CANCELLED' },
] as const

const STATUS_BADGE_STYLE: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
  delivered: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
}

export function OrderManagementView({ initialOrders }: { initialOrders: DbOrder[] }) {
  const [search, setSearch] = useState('')
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all')
  const [editingOrder, setEditingOrder] = useState<DbOrder | null>(null)
  const [isPending, startTransition] = useTransition()

  // Calculate statistics counts
  const pendingCount = initialOrders.filter((o) => o.status === 'pending').length
  const completedCount = initialOrders.filter((o) => o.status === 'delivered' || o.status === 'confirmed').length
  const cancelledCount = initialOrders.filter((o) => o.status === 'cancelled').length

  // Filter orders by search & status tab
  const filteredOrders = initialOrders.filter((o) => {
    const matchesStatus =
      selectedStatusFilter === 'all'
        ? true
        : selectedStatusFilter === 'confirmed'
        ? o.status === 'confirmed'
        : o.status === selectedStatusFilter

    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customer_name.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.product_name.toLowerCase().includes(q) ||
      o.address.toLowerCase().includes(q)

    return matchesStatus && matchesSearch
  })

  function handleStatusUpdate(orderId: string, nextStatus: DbOrder['status']) {
    startTransition(() => {
      updateOrderStatus(orderId, nextStatus)
      setEditingOrder(null)
    })
  }

  function handleDeleteOrder(orderId: string) {
    if (!confirm('Are you sure you want to delete this order?')) return
    startTransition(() => {
      deleteOrder(orderId)
    })
  }

  return (
    <div className="space-y-6">
      {/* ---------------- Top Statistics Header Cards ---------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            Statistics Overview
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            All Time
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {/* Pending Card */}
          <div className="bento-card p-4 sm:p-5 bg-amber-50/80 border border-amber-200 rounded-2xl text-center shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 block">
              {pendingCount}
            </span>
            <span className="text-xs font-black uppercase text-amber-700 mt-1 block">
              Pending
            </span>
          </div>

          {/* Completed Card */}
          <div className="bento-card p-4 sm:p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-center shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">
              {completedCount}
            </span>
            <span className="text-xs font-black uppercase text-emerald-700 mt-1 block">
              Completed
            </span>
          </div>

          {/* Cancelled Card */}
          <div className="bento-card p-4 sm:p-5 bg-red-50/80 border border-red-200 rounded-2xl text-center shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-red-600 block">
              {cancelledCount}
            </span>
            <span className="text-xs font-black uppercase text-red-700 mt-1 block">
              Cancelled
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- Search & Filter Bar ---------------- */}
      <div className="space-y-3">
        {/* Search Input Box */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, Customer Name, or Phone..."
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm font-bold outline-none focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Pill Buttons Horizontal Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {STATUS_PILLS.map((pill) => {
            const active = selectedStatusFilter === pill.id
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSelectedStatusFilter(pill.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 border ${
                  active
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {active && <CheckCircle2 size={13} className="text-emerald-600" />}
                <span>{pill.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ---------------- Orders Card List ---------------- */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl shadow-sm space-y-3">
            <ShoppingBag size={40} className="mx-auto text-slate-300" />
            <p className="text-sm font-black text-slate-700">No orders found matching criteria.</p>
            <p className="text-xs text-slate-400">Try adjusting search term or status filter.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const shortId = `#ORD-${order.id.substring(0, 8).toUpperCase()}`
            const formattedDate = new Date(order.created_at).toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })

            return (
              <div
                key={order.id}
                className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all space-y-4"
              >
                {/* Header Row: ID, Date, Status Badge */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                        {shortId}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full border ${
                          STATUS_BADGE_STYLE[order.status] ?? STATUS_BADGE_STYLE.pending
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">{formattedDate}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-base sm:text-xl font-black text-emerald-600 block">
                      ₹{order.quantity ? order.quantity * 999 : 999}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {order.quantity} item(s)
                    </span>
                  </div>
                </div>

                {/* Customer Info Details Grid */}
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold flex items-center gap-2">
                      <User size={14} className="text-slate-400" /> Customer
                    </span>
                    <span className="font-extrabold text-slate-900">{order.customer_name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" /> Phone
                    </span>
                    <a
                      href={telHref(order.phone)}
                      className="font-black text-[#ea580c] hover:underline"
                    >
                      +{order.phone}
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold flex items-center gap-2">
                      <CreditCard size={14} className="text-slate-400" /> Payment
                    </span>
                    <span className="font-bold text-slate-800">WhatsApp Cash / COD</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500 font-bold flex items-center gap-2 shrink-0">
                      <MapPin size={14} className="text-slate-400 mt-0.5" /> Address
                    </span>
                    <span className="font-bold text-slate-800 text-right max-w-[28ch]">
                      {order.address}
                    </span>
                  </div>
                </div>

                {/* Order Item List Block */}
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Order Items
                  </p>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/80 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center font-black text-xs border border-orange-200 shrink-0">
                        <Package size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-slate-900">
                          {order.product_name}
                        </p>
                        <p className="text-[11px] font-medium text-slate-500">
                          Qty: {order.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-900">
                      ₹{order.quantity ? order.quantity * 999 : 999}
                    </span>
                  </div>
                </div>

                {/* Action Buttons Row (Matching Screenshot 1) */}
                <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                  {/* Phone Call */}
                  <a
                    href={telHref(order.phone)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Phone size={14} />
                    <span>Call</span>
                  </a>

                  {/* WhatsApp Direct */}
                  <a
                    href={whatsappHref(
                      `Hello ${order.customer_name}, regarding your Lakhisarai Academy Order (${shortId}) for ${order.product_name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>

                  {/* Update Status Popup Opener */}
                  <button
                    type="button"
                    onClick={() => setEditingOrder(order)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <SlidersHorizontal size={14} />
                    <span>Status</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteOrder(order.id)}
                    className="p-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors shrink-0"
                    title="Delete Order"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* ---------------- Update Order Status Modal (Matching Screenshot 2) ---------------- */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
          <div
            className="fixed inset-0"
            onClick={() => setEditingOrder(null)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-6 z-10 border border-slate-200 animate-[slideUp_0.2s_ease-out]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Update Order Status</h3>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  Order #{editingOrder.id.substring(0, 8).toUpperCase()} • {editingOrder.customer_name}
                </p>
              </div>
              <button
                onClick={() => setEditingOrder(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {(['pending', 'confirmed', 'delivered', 'cancelled'] as const).map((st) => {
                const isSelected = editingOrder.status === st
                return (
                  <button
                    key={st}
                    disabled={isPending}
                    onClick={() => handleStatusUpdate(editingOrder.id, st)}
                    className={`py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-500 hover:bg-orange-50/50'
                    }`}
                  >
                    {st}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

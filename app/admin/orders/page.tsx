import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getOrders } from '@/app/lib/action/orders'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'
import { OrderManagementView } from './_components/OrderManagementView'
import { ShoppingCart } from 'lucide-react'

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const orders = await getOrders()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Orders" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
        {/* Top Header Bar matching Screenshot */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-black mb-2">
              <ShoppingCart size={14} />
              <span>Store Order Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Order Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Manage incoming student store orders, update fulfillment statuses, and direct contact.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-black shadow-md">
            {orders.length} Total Orders
          </span>
        </div>

        <OrderManagementView initialOrders={orders} />
      </main>
    </div>
  )
}
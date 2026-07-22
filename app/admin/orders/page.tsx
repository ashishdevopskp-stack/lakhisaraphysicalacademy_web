import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getOrders, deleteOrder } from '@/app/lib/action/orders'
import { createClient } from '@/app/lib/supabase/server'
import { AdminSidebar } from '../_components/AdminSidebar'
import { OrderStatusForm } from './OrderStatusForm'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 border border-blue-200',
  delivered: 'bg-green-50 text-green-700 border border-green-200',
  cancelled: 'bg-gray-100 text-gray-600 border border-gray-200',
}

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/admin/login')

  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const orders = await getOrders()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Orders" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Orders</h1>
          <p className="text-sm text-gray-500">Orders placed by students from the store page.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {orders.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500">No orders yet.</p>
            </div>
          ) : (
            <div>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-4 sm:px-5 py-4 border-b last:border-b-0 border-gray-100"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {order.product_name} × {order.quantity}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {order.customer_name} · {order.phone}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 max-w-md">{order.address}</p>
                    {order.notes && (
                      <p className="text-xs text-gray-400 mt-1">Note: {order.notes}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status] ?? STATUS_STYLES.cancelled}`}>
                      {order.status}
                    </span>
                    <OrderStatusForm id={order.id} status={order.status} />
                    <form action={deleteOrder.bind(null, order.id)}>
                      <button type="submit" className="text-xs text-red-600 hover:text-red-700 transition-colors">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
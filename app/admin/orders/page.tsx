import { redirect } from 'next/navigation'
import { getCurrentUserRole } from '@/app/lib/action/auth'
import { getOrders, deleteOrder } from '@/app/lib/action/orders'
import { AdminSidebar } from '../products/page'
import { OrderStatusForm } from './OrderStatusForm'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  confirmed: 'bg-blue-500/10 text-blue-400',
  delivered: 'bg-green-500/10 text-green-400',
  cancelled: 'bg-white/[0.06] text-[#9B9BA3]',
}

export default async function AdminOrdersPage() {
  const role = await getCurrentUserRole()
  if (role !== 'admin') redirect('/')

  const orders = await getOrders()

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EDEDEF] flex">
      <AdminSidebar active="Orders" />

      <main className="flex-1 p-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Orders</h1>
          <p className="text-sm text-[#9B9BA3]">Orders placed by students from the store page.</p>
        </div>

        <div className="bg-[#17181D] border border-white/[0.06] rounded-xl overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-[#9B9BA3]">No orders yet.</p>
            </div>
          ) : (
            <div>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-start justify-between gap-4 px-5 py-4 border-b last:border-b-0 border-white/[0.04]"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {order.product_name} × {order.quantity}
                    </p>
                    <p className="text-sm text-[#9B9BA3] mt-0.5">
                      {order.customer_name} · {order.phone}
                    </p>
                    <p className="text-xs text-[#6E6E76] mt-1 max-w-md">{order.address}</p>
                    {order.notes && (
                      <p className="text-xs text-[#6E6E76] mt-1">Note: {order.notes}</p>
                    )}
                    <p className="text-xs text-[#6E6E76] mt-1">
                      {new Date(order.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                      {order.status}
                    </span>
                    <OrderStatusForm id={order.id} status={order.status} />
                    <form action={deleteOrder.bind(null, order.id)}>
                      <button type="submit" className="text-xs text-red-400 hover:text-red-300">
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
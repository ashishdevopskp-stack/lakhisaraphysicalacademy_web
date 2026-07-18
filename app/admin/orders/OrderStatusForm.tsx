"use client";

import { useTransition } from "react";
import { updateOrderStatus, type DbOrder } from "@/app/lib/action/orders";

export function OrderStatusForm({
  id,
  status,
}: {
  id: string;
  status: DbOrder["status"];
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as DbOrder["status"];
        startTransition(() => {
          updateOrderStatus(id, next);
        });
      }}
      className="bg-[#0E0F13] border border-white/[0.08] rounded-lg px-2 py-1 text-xs outline-none disabled:opacity-50"
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
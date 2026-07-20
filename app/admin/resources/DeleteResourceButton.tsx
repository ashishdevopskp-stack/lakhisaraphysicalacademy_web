"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteResource } from "@/app/lib/action/resources";

export default function DeleteResourceButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this resource? This cannot be undone.")) return;
    startTransition(() => {
      deleteResource(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-1 text-red-500 disabled:opacity-50"
    >
      <Trash2 size={14} />
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
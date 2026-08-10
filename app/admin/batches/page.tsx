import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { getCurrentUserRole } from "@/app/lib/action/auth";
import { getBatches } from "@/app/lib/action/batches";
import { AdminSidebar } from "../_components/AdminSidebar";
import { BatchManagementView } from "./_components/BatchManagementView";

export default async function AdminBatchesPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) redirect("/admin/login");

  const role = await getCurrentUserRole();
  if (role !== "admin") redirect("/");

  const batches = await getBatches();

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Batches" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-6xl w-full mx-auto space-y-6">
        <BatchManagementView initialBatches={batches} />
      </main>
    </div>
  );
}


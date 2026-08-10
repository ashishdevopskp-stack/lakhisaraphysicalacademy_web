import { redirect } from "next/navigation";
import { UserPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getHostels } from "@/app/lib/action/students";
import { createClient } from "@/app/lib/supabase/server";
import { getCurrentUserRole } from "@/app/lib/action/auth";
import { AdminSidebar } from "../../_components/AdminSidebar";
import { StudentForm } from "../../_components/StudentForm";

export default async function NewStudentPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) redirect("/admin/login");

  const role = await getCurrentUserRole();
  if (role !== "admin") redirect("/");

  const hostels = await getHostels();

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Students" />
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-4xl w-full mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm">
              <UserPlus size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                  Hostel Management
                </span>
              </div>
              <h1 className="font-display text-2xl font-black text-slate-900 mt-0.5">
                Add New Student Resident
              </h1>
              <p className="text-xs font-semibold text-slate-500">
                Register a new hostel candidate with room, bed, and batch assignment.
              </p>
            </div>
          </div>

          <Link
            href="/admin/students"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-2xl transition-all w-fit"
          >
            <ArrowLeft size={16} />
            <span>Back to All Students</span>
          </Link>
        </div>

        <StudentForm mode="new" hostels={hostels} />
      </main>
    </div>
  );
}
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { getCurrentUserRole } from "@/app/lib/action/auth";
import { getStudents } from "@/app/lib/action/students";
import { AdminSidebar } from "../_components/AdminSidebar";
import { StudentTableView } from "./_components/StudentTableView";

export default async function StudentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) redirect("/admin/login");

  const role = await getCurrentUserRole();
  if (role !== "admin") redirect("/");

  const students = await getStudents();

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Students" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto space-y-6">
        <StudentTableView initialStudents={students} />
      </main>
    </div>
  );
}
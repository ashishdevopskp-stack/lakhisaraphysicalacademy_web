import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Edit3 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import { getCurrentUserRole } from "@/app/lib/action/auth";
import { getJob, updateJob } from "@/app/lib/action/jobs";
import { JobForm } from "../../JobForm";
import { AdminSidebar } from "../../../_components/AdminSidebar";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) redirect("/admin/login");

  const role = await getCurrentUserRole();
  if (role !== "admin") redirect("/");

  const job = await getJob(id);
  if (!job) notFound();

  const updateWithId = updateJob.bind(null, id);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Jobs" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-4xl w-full mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm">
              <Edit3 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                  Edit Vacancy
                </span>
              </div>
              <h1 className="font-display text-2xl font-black text-slate-900 mt-0.5">
                Update Job Details
              </h1>
              <p className="text-xs font-semibold text-slate-500 truncate max-w-md">
                Editing: {job.title}
              </p>
            </div>
          </div>

          <Link
            href="/admin/jobs"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-2xl transition-all w-fit"
          >
            <ArrowLeft size={16} />
            <span>Back to All Jobs</span>
          </Link>
        </div>

        {/* Form Container */}
        <JobForm action={updateWithId} submitLabel="Save Job Changes" initialData={job} />
      </main>
    </div>
  );
}
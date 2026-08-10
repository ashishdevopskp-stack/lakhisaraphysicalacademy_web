"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Briefcase,
  PlusCircle,
  Pencil,
  Trash2,
  FileText,
  Search,
  ExternalLink,
  Tag,
  MapPin,
  Calendar,
} from "lucide-react";
import type { DbJob } from "@/app/lib/action/jobs";
import { deleteJob } from "@/app/lib/action/jobs";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

const STATUS_BADGE: Record<string, string> = {
  New: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-black",
  Ongoing: "bg-blue-100 text-blue-800 border border-blue-300 font-black",
  Closed: "bg-slate-100 text-slate-700 border border-slate-300 font-semibold",
};

export function JobManagementView({ initialJobs }: { initialJobs: DbJob[] }) {
  const [jobs, setJobs] = useState<DbJob[]>(initialJobs);
  const [query, setQuery] = useState("");
  const [deletingJob, setDeletingJob] = useState<DbJob | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const filteredJobs = jobs.filter((j) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      j.title.toLowerCase().includes(q) ||
      j.organization.toLowerCase().includes(q) ||
      j.category.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q)
    );
  });

  function handleDeleteConfirm() {
    if (!deletingJob) return;
    const targetId = deletingJob.id;

    startDeleteTransition(async () => {
      await deleteJob(targetId);
      setJobs((prev) => prev.filter((j) => j.id !== targetId));
      setDeletingJob(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm">
            <Briefcase size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Recruitment Portal
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {jobs.length} Active Vacancies
              </span>
            </div>
            <h1 className="font-display text-2xl font-black text-slate-900 mt-0.5">
              Job Vacancies Directory
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Manage Army, Bihar Police, RPF, SSC GD &amp; Govt recruitment job listings.
            </p>
          </div>
        </div>

        <Link
          href="/admin/jobs/new"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <PlusCircle size={18} />
          <span>Post New Job</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm max-w-md">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by job title, organization, category, location..."
          className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Job Items List Container */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-orange-50/20 transition-colors"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 text-[#ea580c] font-bold">
                <Briefcase size={22} />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-black text-slate-900">
                    {job.title}
                  </h3>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${STATUS_BADGE[job.status] ?? STATUS_BADGE.Closed}`}>
                    {job.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1 font-bold text-slate-900">
                    <Tag size={13} className="text-[#ea580c]" />
                    {job.category}
                  </span>
                  <span>•</span>
                  <span>{job.organization}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" />
                    {job.location}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-slate-400" />
                    Notified: {new Date(job.notification_date).toLocaleDateString("en-IN")}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-amber-700">
                    Last Date: {new Date(job.last_date).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              {job.pdf_url && (
                <a
                  href={job.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-extrabold text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  <FileText size={14} />
                  <span>PDF</span>
                </a>
              )}

              <Link
                href={`/admin/jobs/${job.id}/edit`}
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Pencil size={14} />
                <span>Edit</span>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingJob(job)}
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-extrabold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="py-14 text-center text-slate-500 font-semibold text-xs">
            No recruitment vacancies found.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingJob)}
        itemName={deletingJob?.title}
        isDeleting={isDeletingPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingJob(null)}
      />
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Award,
  Plus,
  Pencil,
  Trash2,
  Search,
  UserCheck,
  Building,
  MapPin,
  Calendar,
} from "lucide-react";
import type { DbResult } from "@/app/lib/action/results";
import { deleteResult } from "@/app/lib/action/results";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

const RESULT_STATUS_STYLES: Record<string, string> = {
  Selected: "bg-emerald-100 text-emerald-900 border border-emerald-300 font-black",
  "Under Training": "bg-blue-100 text-blue-900 border border-blue-300 font-black",
  "Document Verification": "bg-amber-100 text-amber-900 border border-amber-300 font-black",
};

export function ResultManagementView({ initialResults }: { initialResults: DbResult[] }) {
  const [results, setResults] = useState<DbResult[]>(initialResults);
  const [query, setQuery] = useState("");
  const [deletingResult, setDeletingResult] = useState<DbResult | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const filteredResults = results.filter((r) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.post.toLowerCase().includes(q) ||
      r.exam.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      (r.district && r.district.toLowerCase().includes(q))
    );
  });

  function handleDeleteConfirm() {
    if (!deletingResult) return;
    const targetId = deletingResult.id;

    startDeleteTransition(async () => {
      await deleteResult(targetId);
      setResults((prev) => prev.filter((r) => r.id !== targetId));
      setDeletingResult(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm shrink-0">
            <Award size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Placed Achievements Studio
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {results.length} Selected Candidates
              </span>
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Placed Achievements Directory
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Selected candidates in Army, Bihar Police, SSC GD, CISF, BSF &amp; Custom jobs.
            </p>
          </div>
        </div>

        <Link
          href="/admin/results/new"
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add Selected Student</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm max-w-md">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by student name, post, exam, category, district..."
          className="w-full bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Results List View */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-orange-50/20 transition-colors"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 ring-2 ring-orange-500/20 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                {result.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={result.photo_url}
                    alt={result.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCheck size={26} className="text-slate-400" />
                )}
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-black text-slate-900">
                    {result.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ea580c] text-[10px] font-black uppercase tracking-wider">
                    {result.department}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-700">
                  {result.post} • <span className="text-[#ea580c]">{result.exam}</span>
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-slate-400" />
                    {result.district || "Lakhisarai"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-slate-400" />
                    Batch Year: {result.year}
                  </span>
                  {result.rank_score && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-emerald-700 font-bold">
                        {result.rank_score}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
              <span
                className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                  RESULT_STATUS_STYLES[result.status] ?? RESULT_STATUS_STYLES.Selected
                }`}
              >
                {result.status}
              </span>

              <Link
                href={`/admin/results/${result.id}/edit`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Pencil size={14} />
                <span>Edit</span>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingResult(result)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filteredResults.length === 0 && (
          <div className="py-14 text-center text-slate-500 font-semibold text-xs">
            No placed achievement candidates found.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingResult)}
        itemName={deletingResult?.name}
        isDeleting={isDeletingPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingResult(null)}
      />
    </div>
  );
}

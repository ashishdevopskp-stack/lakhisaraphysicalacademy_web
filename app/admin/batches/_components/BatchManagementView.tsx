"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Clock,
  MapPin,
  ShieldCheck,
  Users,
  Edit2,
  Trash2,
  Dumbbell,
  BookOpen,
  Trophy,
  CheckCircle2,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import type { DbBatch } from "@/app/lib/action/batches";
import { createBatch, updateBatch, deleteBatch } from "@/app/lib/action/batches";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

export function BatchManagementView({
  initialBatches,
}: {
  initialBatches: DbBatch[];
}) {
  const [batches, setBatches] = useState<DbBatch[]>(initialBatches);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<DbBatch | null>(null);

  // Delete modal state
  const [deletingBatch, setDeletingBatch] = useState<DbBatch | null>(null);
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const filteredBatches = batches.filter((b) => {
    if (filterCategory === "All") return true;
    return b.category.toLowerCase() === filterCategory.toLowerCase();
  });

  function handleOpenCreate() {
    setEditingBatch(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(batch: DbBatch) {
    setEditingBatch(batch);
    setIsModalOpen(true);
  }

  function handleDeleteConfirm() {
    if (!deletingBatch) return;
    const targetId = deletingBatch.id;

    startDeleteTransition(async () => {
      await deleteBatch(targetId);
      setBatches((prev) => prev.filter((b) => b.id !== targetId));
      setDeletingBatch(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm">
            <Clock size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-[#ea580c] rounded-full">
                Academy Admin
              </span>
              <span className="text-xs font-bold text-slate-500">
                • {batches.length} Active Batches
              </span>
            </div>
            <h1 className="font-display text-2xl font-black text-slate-900 mt-0.5">
              Training Batches & Schedule
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Manage physical training, written exam batches, timings, and seat capacities.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-5 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <Plus size={18} />
          <span>Create New Batch</span>
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["All", "Physical", "Written", "Combo"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilterCategory(tab)}
            className={`px-4 py-2 text-xs font-extrabold rounded-full transition-all border whitespace-nowrap cursor-pointer ${
              filterCategory === tab
                ? "bg-[#ea580c] text-white border-[#ea580c] shadow-md shadow-orange-500/20"
                : "bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:text-[#ea580c]"
            }`}
          >
            {tab === "All" ? "All Batches" : tab}
          </button>
        ))}
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBatches.map((batch) => {
          const isPhysical = batch.category === "Physical";
          const isWritten = batch.category === "Written";

          return (
            <div
              key={batch.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-[#ea580c] via-amber-400 to-[#138808] absolute top-0 inset-x-0" />

              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-800 border border-slate-200">
                    {isPhysical ? (
                      <Dumbbell size={13} className="text-[#ea580c]" />
                    ) : isWritten ? (
                      <BookOpen size={13} className="text-blue-600" />
                    ) : (
                      <Trophy size={13} className="text-emerald-600" />
                    )}
                    {batch.category}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      batch.status === "Filling Fast"
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : batch.status === "Full"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    }`}
                  >
                    {batch.status}
                  </span>
                </div>

                <h3 className="font-display text-lg font-black text-slate-900 group-hover:text-[#ea580c] transition-colors leading-snug">
                  {batch.name}
                </h3>

                {/* Info Container */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-900 font-extrabold">
                    <Clock size={15} className="text-[#ea580c] shrink-0" />
                    <span>{batch.time}</span>
                  </div>
                  {batch.location && (
                    <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                      <MapPin size={15} className="text-slate-400 shrink-0" />
                      <span className="truncate">{batch.location}</span>
                    </div>
                  )}
                  {batch.target_exam && (
                    <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                      <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
                      <span className="truncate">Target: {batch.target_exam}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                    <Users size={15} className="text-amber-600 shrink-0" />
                    <span>Capacity: {batch.capacity} Candidates Max</span>
                  </div>
                </div>

                {/* Highlights */}
                {batch.highlights && (
                  <div className="pt-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                      Key Highlights
                    </p>
                    <ul className="space-y-1">
                      {batch.highlights
                        .split("\n")
                        .filter(Boolean)
                        .map((hl, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{hl.replace(/^[•\-\*]\s*/, "")}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(batch)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <Edit2 size={14} />
                  <span>Edit Batch</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingBatch(batch)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Batch Dialog Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#ea580c]" />
                <h3 className="font-display text-lg font-black text-slate-900">
                  {editingBatch ? "Edit Training Batch" : "Create New Training Batch"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form
              action={editingBatch ? updateBatch.bind(null, editingBatch.id) : createBatch}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Batch Name <span className="text-orange-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={editingBatch?.name}
                  placeholder="e.g. Morning Physical Training Batch"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editingBatch?.category || "Physical"}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                  >
                    <option value="Physical">Physical</option>
                    <option value="Written">Written</option>
                    <option value="Combo">Combo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingBatch?.status || "Open"}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                  >
                    <option value="Open">Open</option>
                    <option value="Filling Fast">Filling Fast</option>
                    <option value="Full">Full</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Batch Timing <span className="text-orange-500">*</span>
                </label>
                <input
                  name="time"
                  type="text"
                  required
                  defaultValue={editingBatch?.time}
                  placeholder="e.g. 05:00 AM - 07:30 AM"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Training Ground / Location
                </label>
                <input
                  name="location"
                  type="text"
                  defaultValue={editingBatch?.location}
                  placeholder="e.g. Gandhi Maidan Stadium Ground, Lakhisarai"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Target Exams
                  </label>
                  <input
                    name="targetExam"
                    type="text"
                    defaultValue={editingBatch?.target_exam}
                    placeholder="e.g. Bihar Police, Agniveer"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Max Capacity
                  </label>
                  <input
                    name="capacity"
                    type="number"
                    defaultValue={editingBatch?.capacity || 100}
                    placeholder="100"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Highlights <span className="text-slate-400 font-normal">(one per line)</span>
                </label>
                <textarea
                  name="highlights"
                  rows={3}
                  defaultValue={editingBatch?.highlights}
                  placeholder={"1600m Running Drills\nHigh Jump & Long Jump\nDaily Physical Conditioning"}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] py-3 text-sm font-black text-white shadow-md hover:shadow-lg cursor-pointer"
              >
                {editingBatch ? "Update Batch" : "Save & Create Batch"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingBatch)}
        itemName={deletingBatch?.name}
        isDeleting={isDeletingPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingBatch(null)}
      />
    </div>
  );
}

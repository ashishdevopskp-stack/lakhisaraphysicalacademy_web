"use client";

import { useState, useTransition, ChangeEvent } from "react";
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
  Sparkles,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Ratio,
  Check,
} from "lucide-react";
import type { DbBatch } from "@/app/lib/action/batches";
import { createBatch, updateBatch, deleteBatch } from "@/app/lib/action/batches";
import { isBatchVisible } from "@/app/components/BatchTimetable";
import { ConfirmDeleteModal } from "../../_components/ConfirmDeleteModal";

export const ASPECT_RATIO_OPTIONS = [
  { value: "16:9", label: "16:9 Banner", className: "aspect-[16/9]", iconRatio: "w-6 h-3.5" },
  { value: "4:3", label: "4:3 Card", className: "aspect-[4/3]", iconRatio: "w-5 h-3.5" },
  { value: "1:1", label: "1:1 Square", className: "aspect-square", iconRatio: "w-4 h-4" },
  { value: "3:4", label: "3:4 Portrait", className: "aspect-[3/4]", iconRatio: "w-3.5 h-4.5" },
  { value: "9:16", label: "9:16 Vertical", className: "aspect-[9/16]", iconRatio: "w-3 h-5" },
  { value: "original", label: "Original", className: "aspect-auto h-auto", iconRatio: "w-5 h-3" },
];

export function getAspectRatioClass(aspectRatio?: string | null): string {
  const found = ASPECT_RATIO_OPTIONS.find((o) => o.value === aspectRatio);
  return found ? found.className : "aspect-[16/9]";
}

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

  // Form Live Preview States
  const [nameVal, setNameVal] = useState("");
  const [categoryVal, setCategoryVal] = useState("Physical");
  const [statusVal, setStatusVal] = useState("Open");
  const [visibilityVal, setVisibilityVal] = useState<"show" | "hide">("show");
  const [timeVal, setTimeVal] = useState("");
  const [locationVal, setLocationVal] = useState("");
  const [targetExamVal, setTargetExamVal] = useState("");
  const [capacityVal, setCapacityVal] = useState(100);
  const [highlightsVal, setHighlightsVal] = useState("");
  const [aspectRatioVal, setAspectRatioVal] = useState("16:9");
  const [thumbnailUrlVal, setThumbnailUrlVal] = useState("");
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  const filteredBatches = batches.filter((b) => {
    if (filterCategory === "All") return true;
    return b.category.toLowerCase() === filterCategory.toLowerCase();
  });

  function handleOpenCreate() {
    setEditingBatch(null);
    setNameVal("Morning Physical Training Batch");
    setCategoryVal("Physical");
    setStatusVal("Open");
    setVisibilityVal("show");
    setTimeVal("05:00 AM - 07:30 AM");
    setLocationVal("K.R.K Field, Lakhisarai");
    setTargetExamVal("Bihar Police Constable, SI, Army Agniveer");
    setCapacityVal(100);
    setHighlightsVal("1600m Running Drills\nHigh Jump & Long Jump\nDaily Physical Conditioning");
    setAspectRatioVal("16:9");
    setThumbnailUrlVal("");
    setFilePreviewUrl(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(batch: DbBatch) {
    setEditingBatch(batch);
    setNameVal(batch.name);
    setCategoryVal(batch.category || "Physical");
    setStatusVal(batch.status || "Open");
    setVisibilityVal(isBatchVisible(batch.is_visible) ? "show" : "hide");
    setTimeVal(batch.time || "");
    setLocationVal(batch.location || "");
    setTargetExamVal(batch.target_exam || "");
    setCapacityVal(batch.capacity || 100);
    setHighlightsVal(batch.highlights || "");
    setAspectRatioVal(batch.aspect_ratio || "16:9");
    setThumbnailUrlVal(batch.thumbnail_url || "");
    setFilePreviewUrl(batch.thumbnail_url || null);
    setIsModalOpen(true);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    }
  }

  function handleUrlInputChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setThumbnailUrlVal(val);
    if (val.trim()) {
      setFilePreviewUrl(val.trim());
    }
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

  const activeImage = filePreviewUrl || thumbnailUrlVal;
  const currentRatioClass = getAspectRatioClass(aspectRatioVal);

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
              Training Batches &amp; Schedule
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Manage physical training, written exam batches, timings, thumbnails, and visibility.
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
          const isVisible = isBatchVisible(batch.is_visible);

          return (
            <div
              key={batch.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-[#ea580c] via-amber-400 to-[#138808] absolute top-0 inset-x-0" />

              <div className="space-y-4 pt-1">
                {/* Thumbnail Preview Banner */}
                {batch.thumbnail_url && (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm relative group/img max-h-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={batch.thumbnail_url}
                      alt={batch.name}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-extrabold backdrop-blur-sm">
                      Ratio: {batch.aspect_ratio || "16:9"}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
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

                    {/* Show in User Panel / Hide Badge */}
                    {isVisible ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Eye size={12} /> User Panel Visible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-600 border border-slate-300">
                        <EyeOff size={12} /> Hidden from User
                      </span>
                    )}
                  </div>

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

      {/* Create / Edit Batch Dialog Modal with Live Preview */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-5 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <Sparkles size={20} className="text-[#ea580c]" />
                <div>
                  <h3 className="font-display text-lg font-black text-slate-900">
                    {editingBatch ? "Edit Training Batch" : "Create New Training Batch"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Configure batch details, visibility, thumbnail ratio &amp; view live preview
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Grid Split: Form (Left) & Live Preview (Right) */}
            <form
              action={editingBatch ? updateBatch.bind(null, editingBatch.id) : createBatch}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Form Controls - 7 Cols */}
              <div className="lg:col-span-7 space-y-4">
                {/* Batch Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Batch Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={nameVal}
                    onChange={(e) => setNameVal(e.target.value)}
                    placeholder="e.g. Morning Physical Training Batch"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                  />
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={categoryVal}
                      onChange={(e) => setCategoryVal(e.target.value)}
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
                      value={statusVal}
                      onChange={(e) => setStatusVal(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                    >
                      <option value="Open">Open</option>
                      <option value="Filling Fast">Filling Fast</option>
                      <option value="Full">Full</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* USER PANEL VISIBILITY OPTION (Show in user panel / Hide from user panel) */}
                <div className="p-3.5 rounded-2xl bg-orange-50/60 border-2 border-orange-200 space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800">
                    <Eye size={16} className="text-[#ea580c]" />
                    <span>User Panel Visibility (यूजर पैनल दृश्यता)</span>
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setVisibilityVal("show")}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                        visibilityVal === "show"
                          ? "bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-500/20"
                          : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <Eye size={14} />
                      <span>Show in User Panel</span>
                      {visibilityVal === "show" && <Check size={12} className="ml-auto" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisibilityVal("hide")}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                        visibilityVal === "hide"
                          ? "bg-slate-800 text-white border-slate-900 shadow-md shadow-slate-500/20"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <EyeOff size={14} />
                      <span>Hide from User Panel</span>
                      {visibilityVal === "hide" && <Check size={12} className="ml-auto" />}
                    </button>
                  </div>
                  <input type="hidden" name="visibility" value={visibilityVal} />
                  <p className="text-[11px] text-slate-500 font-medium">
                    {visibilityVal === "show"
                      ? "✓ This batch will be published & visible to students on the main website schedule."
                      : "✕ Hidden from students (Draft / Admin only). Won't show up on public pages."}
                  </p>
                </div>

                {/* Batch Timing */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Batch Timing <span className="text-orange-500">*</span>
                  </label>
                  <input
                    name="time"
                    type="text"
                    required
                    value={timeVal}
                    onChange={(e) => setTimeVal(e.target.value)}
                    placeholder="e.g. 05:00 AM - 07:30 AM"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                  />
                </div>

                {/* Ground Location */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Training Ground / Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    value={locationVal}
                    onChange={(e) => setLocationVal(e.target.value)}
                    placeholder="e.g. K.R.K Field, Lakhisarai"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                  />
                </div>

                {/* Target Exam & Capacity */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Target Exams
                    </label>
                    <input
                      name="targetExam"
                      type="text"
                      value={targetExamVal}
                      onChange={(e) => setTargetExamVal(e.target.value)}
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
                      value={capacityVal}
                      onChange={(e) => setCapacityVal(Number(e.target.value) || 100)}
                      placeholder="100"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                    />
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Highlights <span className="text-slate-400 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    name="highlights"
                    rows={3}
                    value={highlightsVal}
                    onChange={(e) => setHighlightsVal(e.target.value)}
                    placeholder={"1600m Running Drills\nHigh Jump & Long Jump\nDaily Physical Conditioning"}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-[#ea580c]"
                  />
                </div>

                {/* THUMBNAIL IMAGE & ASPECT RATIO SELECTOR */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-800">
                      <ImageIcon size={16} className="text-[#ea580c]" />
                      <span>Batch Thumbnail Image &amp; Aspect Ratio</span>
                    </label>
                  </div>

                  <input type="hidden" name="aspectRatio" value={aspectRatioVal} />
                  <input type="hidden" name="thumbnailUrl" value={thumbnailUrlVal} />

                  {/* Ratio options */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-slate-700">
                      <Ratio size={13} className="text-[#ea580c]" />
                      <span>Select Aspect Ratio:</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {ASPECT_RATIO_OPTIONS.map((opt) => {
                        const isSelected = aspectRatioVal === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setAspectRatioVal(opt.value)}
                            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-[11px] font-black transition-all cursor-pointer border ${
                              isSelected
                                ? "bg-[#ea580c] text-white border-orange-600 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:border-orange-300"
                            }`}
                          >
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* File Upload & Image URL */}
                  <div className="space-y-2 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Upload Thumbnail Image File:
                      </label>
                      <input
                        name="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:bg-orange-50 file:text-xs file:font-black file:text-[#ea580c] hover:file:bg-orange-100 cursor-pointer border border-slate-200 rounded-xl p-1 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Or Image URL:
                      </label>
                      <input
                        type="url"
                        value={thumbnailUrlVal}
                        onChange={handleUrlInputChange}
                        placeholder="https://example.com/batch-image.jpg"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#ea580c]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] py-3.5 text-sm font-black text-white shadow-md hover:shadow-lg cursor-pointer"
                >
                  {editingBatch ? "Update Batch" : "Save & Create Batch"}
                </button>
              </div>

              {/* LIVE PREVIEWS - 5 Cols */}
              <div className="lg:col-span-5 space-y-4 bg-slate-900 p-4 sm:p-5 rounded-3xl text-white border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                    <Sparkles size={15} />
                    Live Admin &amp; Card Preview
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                    Real-time
                  </span>
                </div>

                {/* 1. Aspect Ratio Thumbnail Live Preview */}
                <div>
                  <p className="text-[11px] font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>1. Thumbnail Ratio Frame ({aspectRatioVal}):</span>
                  </p>
                  <div className="overflow-hidden rounded-2xl border-2 border-orange-500/50 bg-slate-950 relative shadow-inner">
                    {activeImage ? (
                      <div className={`relative w-full ${currentRatioClass}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeImage}
                          alt="Thumbnail Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-32 flex flex-col items-center justify-center text-slate-600 gap-1">
                        <ImageIcon size={32} />
                        <span className="text-[11px] font-semibold">No thumbnail selected yet</span>
                      </div>
                    )}
                    {activeImage && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/90 text-[9px] font-bold text-orange-300">
                        {aspectRatioVal}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Full Live Batch Card Preview */}
                <div>
                  <p className="text-[11px] font-bold text-slate-300 mb-1.5">
                    2. Full Batch Card Live Preview (User View):
                  </p>

                  <div className="bg-white text-slate-900 rounded-2xl p-4 border border-slate-200 shadow-xl space-y-3 relative overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-[#ea580c] to-amber-400 absolute top-0 inset-x-0" />

                    {/* Card Thumbnail */}
                    {activeImage && (
                      <div className="overflow-hidden rounded-xl border border-slate-200 relative">
                        <div className={`relative w-full ${currentRatioClass}`}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={activeImage}
                            alt="Card Image Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5 text-[10px]">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-extrabold bg-slate-100 text-slate-800">
                        {categoryVal}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-black uppercase ${
                          statusVal === "Filling Fast"
                            ? "bg-amber-100 text-amber-900"
                            : statusVal === "Full"
                            ? "bg-red-100 text-red-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {statusVal}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm leading-snug text-slate-900">
                      {nameVal || "Batch Name Preview"}
                    </h4>

                    {/* Info */}
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Clock size={13} className="text-[#ea580c]" />
                        <span>{timeVal || "Timing Preview"}</span>
                      </div>
                      {locationVal && (
                        <div className="flex items-center gap-1.5 text-slate-600 font-semibold truncate">
                          <MapPin size={13} className="text-slate-400" />
                          <span className="truncate">{locationVal}</span>
                        </div>
                      )}
                      {targetExamVal && (
                        <div className="flex items-center gap-1.5 text-slate-600 font-semibold truncate">
                          <ShieldCheck size={13} className="text-emerald-600" />
                          <span className="truncate">Target: {targetExamVal}</span>
                        </div>
                      )}
                    </div>

                    {/* Highlights */}
                    {highlightsVal && (
                      <div className="text-[10px] space-y-1 pt-1">
                        {highlightsVal
                          .split("\n")
                          .filter(Boolean)
                          .map((hl, i) => (
                            <div key={i} className="flex items-center gap-1 text-slate-600 font-medium truncate">
                              <CheckCircle2 size={11} className="text-emerald-600 shrink-0" />
                              <span className="truncate">{hl.replace(/^[•\-\*]\s*/, "")}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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

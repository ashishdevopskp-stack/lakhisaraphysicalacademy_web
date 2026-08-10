"use client";

import { useState } from "react";
import {
  FileText,
  Briefcase,
  Building,
  MapPin,
  Tag,
  Clock,
  Calendar,
  Video,
  ExternalLink,
  PlusCircle,
  Save,
  FileCheck,
  Sparkles,
} from "lucide-react";
import type { DbJob } from "@/app/lib/action/jobs";
import { JOB_CATEGORY_LABELS, JOB_STATUSES } from "@/app/lib/jobs-data";

const CUSTOM_CATEGORY_OPTION = "Custom (Mention)";

import ThumbnailRatioSelector from "@/app/admin/_components/ThumbnailRatioSelector";

export function JobForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initialData?: DbJob;
}) {
  const isKnownCategory =
    initialData?.category && JOB_CATEGORY_LABELS.includes(initialData.category);

  const [selectedCategoryOption, setSelectedCategoryOption] = useState<string>(() => {
    if (!initialData?.category) return JOB_CATEGORY_LABELS[0];
    return isKnownCategory ? initialData.category : CUSTOM_CATEGORY_OPTION;
  });

  const [customCategoryText, setCustomCategoryText] = useState<string>(() => {
    if (!initialData?.category) return "";
    return isKnownCategory ? "" : initialData.category;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCustomCategorySelected = selectedCategoryOption === CUSTOM_CATEGORY_OPTION;
  const finalCategoryValue = isCustomCategorySelected
    ? customCategoryText.trim()
    : selectedCategoryOption;

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        // Ensure the computed category value (whether custom or preset) is submitted
        formData.set("category", finalCategoryValue);
        try {
          await action(formData);
        } finally {
          setIsSubmitting(false);
        }
      }}
      className="space-y-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xl shadow-slate-900/5"
    >
      {/* Thumbnail Image & Aspect Ratio Selector */}
      <ThumbnailRatioSelector
        defaultThumbnailUrl={initialData?.thumbnail_url}
        defaultAspectRatio={initialData?.aspect_ratio || "16:9"}
        label="Job Banner / Thumbnail Image & Ratio"
      />

      {/* Existing PDF Alert if editing */}

      {initialData?.pdf_url && (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-amber-50/80 p-4 border border-amber-200 text-xs font-semibold text-amber-900">
          <div className="flex items-center gap-2">
            <FileCheck size={18} className="text-[#ea580c]" />
            <span>Current Attached PDF Available</span>
          </div>
          <a
            href={initialData.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[#ea580c] hover:underline"
          >
            <span>View PDF</span>
            <ExternalLink size={13} />
          </a>
        </div>
      )}

      {/* PDF Upload Field */}
      <div>
        <label
          htmlFor="pdf"
          className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
        >
          <FileText size={15} className="text-[#ea580c]" />
          <span>{initialData ? "Replace Notification PDF (optional)" : "Notification PDF (optional)"}</span>
        </label>
        <input
          id="pdf"
          name="pdf"
          type="file"
          accept=".pdf"
          className="w-full text-xs text-slate-600 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-orange-50 file:text-xs file:font-black file:text-[#ea580c] hover:file:bg-orange-100 file:cursor-pointer cursor-pointer border border-slate-200 rounded-2xl p-1 bg-slate-50/50"
        />
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
        >
          <Briefcase size={15} className="text-[#ea580c]" />
          <span>Job Title <span className="text-orange-500">*</span></span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialData?.title}
          placeholder="e.g. Indian Army Agniveer Recruitment"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label
          htmlFor="subtitle"
          className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
        >
          <Sparkles size={15} className="text-[#ea580c]" />
          <span>Subtitle <span className="text-slate-400 font-normal">(optional)</span></span>
        </label>
        <input
          id="subtitle"
          name="subtitle"
          type="text"
          defaultValue={initialData?.subtitle ?? undefined}
          placeholder="e.g. Open Rally for Agniveer (GD, Technical, Clerk)"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
        />
      </div>

      {/* Organization & Location Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="organization"
            className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            <Building size={15} className="text-[#ea580c]" />
            <span>Organization <span className="text-orange-500">*</span></span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            required
            defaultValue={initialData?.organization}
            placeholder="e.g. Indian Army"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            <MapPin size={15} className="text-[#ea580c]" />
            <span>Location <span className="text-orange-500">*</span></span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            defaultValue={initialData?.location}
            placeholder="e.g. Bihar or All India"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
          />
        </div>
      </div>

      {/* Category & Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category Dropdown with Custom (Mention) option */}
        <div>
          <label
            htmlFor="categorySelect"
            className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            <Tag size={15} className="text-[#ea580c]" />
            <span>Category <span className="text-orange-500">*</span></span>
          </label>
          <select
            id="categorySelect"
            value={selectedCategoryOption}
            onChange={(e) => setSelectedCategoryOption(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 cursor-pointer"
          >
            {JOB_CATEGORY_LABELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value={CUSTOM_CATEGORY_OPTION}>✨ {CUSTOM_CATEGORY_OPTION}</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            <Clock size={15} className="text-[#ea580c]" />
            <span>Status <span className="text-orange-500">*</span></span>
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={initialData?.status ?? "New"}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 cursor-pointer"
          >
            {JOB_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Conditional Custom Category Text Field */}
      {isCustomCategorySelected && (
        <div className="rounded-2xl bg-orange-50/70 p-4 border border-orange-200/80 animate-in fade-in zoom-in-95 duration-200 space-y-1.5">
          <label
            htmlFor="customCategoryInput"
            className="block text-xs font-extrabold uppercase tracking-wider text-orange-950 flex items-center gap-1.5"
          >
            <PlusCircle size={14} className="text-[#ea580c]" />
            <span>Type Custom Category Name</span>
          </label>
          <input
            id="customCategoryInput"
            type="text"
            required
            value={customCategoryText}
            onChange={(e) => setCustomCategoryText(e.target.value)}
            placeholder="e.g. Railway RPF, Paramilitary, SSC CGL, Forest Guard..."
            className="w-full rounded-xl border border-orange-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 outline-none transition-all focus:ring-4 focus:ring-orange-500/20"
          />
          <p className="text-[11px] text-orange-700 font-medium">
            This custom category will be displayed on the public Jobs portal for candidates.
          </p>
        </div>
      )}

      {/* Hidden input for category value submitted to action */}
      <input type="hidden" name="category" value={finalCategoryValue} />

      {/* Notification Date & Last Date Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="notificationDate"
            className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            <Calendar size={15} className="text-[#ea580c]" />
            <span>Notification Date <span className="text-orange-500">*</span></span>
          </label>
          <input
            id="notificationDate"
            name="notificationDate"
            type="date"
            required
            defaultValue={
              initialData?.notification_date?.slice(0, 10) ??
              new Date().toISOString().slice(0, 10)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="lastDate"
            className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            <Calendar size={15} className="text-[#ea580c]" />
            <span>Last Date to Apply <span className="text-orange-500">*</span></span>
          </label>
          <input
            id="lastDate"
            name="lastDate"
            type="date"
            required
            defaultValue={initialData?.last_date?.slice(0, 10)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
          />
        </div>
      </div>

      {/* Video URL */}
      <div>
        <label
          htmlFor="videoUrl"
          className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
        >
          <Video size={15} className="text-[#ea580c]" />
          <span>YouTube Guidance Video Link <span className="text-slate-400 font-normal">(optional)</span></span>
        </label>
        <input
          id="videoUrl"
          name="videoUrl"
          type="text"
          placeholder="https://youtube.com/watch?v=..."
          defaultValue={initialData?.video_url ?? undefined}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
        />
      </div>

      {/* Details URL */}
      <div>
        <label
          htmlFor="detailsUrl"
          className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
        >
          <ExternalLink size={15} className="text-[#ea580c]" />
          <span>Read More / Official Apply Link <span className="text-slate-400 font-normal">(optional)</span></span>
        </label>
        <input
          id="detailsUrl"
          name="detailsUrl"
          type="text"
          placeholder="https://... (official vacancy notification URL)"
          defaultValue={initialData?.details_url ?? undefined}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] py-4 px-6 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
      >
        <Save size={18} />
        <span>{isSubmitting ? "Saving Job..." : submitLabel}</span>
      </button>
    </form>
  );
}
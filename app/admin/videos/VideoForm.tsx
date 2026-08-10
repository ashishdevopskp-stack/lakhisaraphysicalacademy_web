"use client";

import { useState } from "react";
import type { DbVideo } from "@/app/lib/action/videos";
import { VIDEO_CATEGORY_LABELS, VIDEO_STATUSES } from "@/app/lib/videos-data";
import ThumbnailRatioSelector from "@/app/admin/_components/ThumbnailRatioSelector";
import { Video, FileText, Youtube, Tag, Calendar, Sparkles } from "lucide-react";

const YOUTUBE_PATTERN = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/;

export function VideoForm({
  action,
  submitLabel,
  initialData,
}: {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initialData?: DbVideo;
}) {
  const [urlError, setUrlError] = useState<string | null>(null);

  function handleUrlBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    if (value && !YOUTUBE_PATTERN.test(value)) {
      setUrlError("Please enter a valid YouTube URL.");
    } else {
      setUrlError(null);
    }
  }

  return (
    <form action={action} className="space-y-6 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xl shadow-slate-900/5">
      {/* Thumbnail & Aspect Ratio Selector */}
      <ThumbnailRatioSelector
        defaultThumbnailUrl={initialData?.thumbnail_url}
        defaultAspectRatio={initialData?.aspect_ratio || "16:9"}
        label="Video Thumbnail Image & Ratio"
      />

      {/* Video Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
        >
          <Video size={15} className="text-[#ea580c]" />
          <span>Video Title <span className="text-orange-500">*</span></span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={200}
          defaultValue={initialData?.title}
          placeholder="e.g. 5 Km Running Tips for Army Physical Test"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
        >
          <FileText size={15} className="text-[#ea580c]" />
          <span>Description <span className="text-slate-400 font-normal">(optional)</span></span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          maxLength={500}
          defaultValue={initialData?.description ?? undefined}
          placeholder="Short description shown on the video card"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 resize-none"
        />
      </div>

      {/* YouTube Video URL */}
      <div>
        <label
          htmlFor="videoUrl"
          className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
        >
          <Youtube size={15} className="text-red-600" />
          <span>YouTube Video URL <span className="text-orange-500">*</span></span>
        </label>
        <input
          id="videoUrl"
          name="videoUrl"
          type="url"
          required
          defaultValue={initialData?.video_url}
          onBlur={handleUrlBlur}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
        />
        {urlError && <p className="text-xs text-red-600 mt-1.5 font-bold">{urlError}</p>}
      </div>

      {/* Category & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="category"
            className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            <Tag size={15} className="text-[#ea580c]" />
            <span>Category <span className="text-orange-500">*</span></span>
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={initialData?.category ?? VIDEO_CATEGORY_LABELS[0]}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 cursor-pointer"
          >
            {VIDEO_CATEGORY_LABELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            <Sparkles size={15} className="text-[#ea580c]" />
            <span>Status <span className="text-orange-500">*</span></span>
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={initialData?.status ?? "Published"}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 cursor-pointer"
          >
            {VIDEO_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Publish Date & Featured Checkbox */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <label
            htmlFor="publishDate"
            className="mb-1.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            <Calendar size={15} className="text-[#ea580c]" />
            <span>Publish Date</span>
          </label>
          <input
            id="publishDate"
            name="publishDate"
            type="date"
            required
            defaultValue={initialData?.publish_date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-all focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        <div className="flex items-center gap-2.5 pt-4 sm:pt-6">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={initialData?.featured ?? false}
            className="w-5 h-5 rounded-lg border-slate-300 accent-[#ea580c] cursor-pointer"
          />
          <label htmlFor="featured" className="text-xs font-extrabold text-slate-800 cursor-pointer">
            Featured Video (Highlight on Video Page)
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full btn-orange justify-center py-3.5 text-sm font-extrabold shadow-lg shadow-orange-500/20"
      >
        {submitLabel}
      </button>
    </form>
  );
}
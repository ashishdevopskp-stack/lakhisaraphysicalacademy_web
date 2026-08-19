"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Image as ImageIcon, Ratio, Upload, Check, Eye } from "lucide-react";

export interface AspectRatioOption {
  value: string;
  label: string;
  className: string;
  iconRatio: string;
}

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  { value: "21:9", label: "21:9 Widescreen Banner", className: "aspect-[21/9]", iconRatio: "w-7 h-3" },
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

export default function ThumbnailRatioSelector({
  defaultThumbnailUrl,
  defaultAspectRatio = "16:9",
  label = "Thumbnail Image & Aspect Ratio",
  onImageChange,
}: {
  defaultThumbnailUrl?: string | null;
  defaultAspectRatio?: string | null;
  label?: string;
  onImageChange?: (url: string | null) => void;
}) {
  const [aspectRatio, setAspectRatio] = useState<string>(defaultAspectRatio || "16:9");
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultThumbnailUrl || null);
  const [urlInput, setUrlInput] = useState<string>(defaultThumbnailUrl || "");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange?.(url);
    } else {
      const fallback = urlInput.trim() || defaultThumbnailUrl || null;
      setPreviewUrl(fallback);
      onImageChange?.(fallback);
    }
  };

  const handleUrlInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrlInput(val);
    const nextUrl = val.trim() || null;
    setPreviewUrl(nextUrl || defaultThumbnailUrl || null);
    onImageChange?.(nextUrl);
  };

  const currentRatioClass = getAspectRatioClass(aspectRatio);

  return (
    <div className="space-y-4 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-orange-50/30 rounded-3xl border-2 border-orange-200/80 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-200/60 pb-3">
        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800">
          <ImageIcon size={16} className="text-[#ea580c]" />
          <span>{label}</span>
        </label>
        <span className="text-[11px] font-bold text-slate-500">
          Choose thumbnail ratio &amp; preview live
        </span>
      </div>

      <input type="hidden" name="aspectRatio" value={aspectRatio} />
      <input type="hidden" name="thumbnailUrl" value={urlInput} />

      {/* Aspect Ratio Selector Pills */}
      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-slate-700">
          <Ratio size={14} className="text-[#ea580c]" />
          <span>Select Display Aspect Ratio (अनुपात चुनें):</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ASPECT_RATIO_OPTIONS.map((opt) => {
            const isSelected = aspectRatio === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAspectRatio(opt.value)}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#ea580c] text-white border-orange-600 shadow-md shadow-orange-500/25 scale-[1.02]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50/50"
                }`}
              >
                <div
                  className={`border-2 rounded-sm ${opt.iconRatio} ${
                    isSelected ? "border-white" : "border-[#ea580c]"
                  }`}
                />
                <span>{opt.label}</span>
                {isSelected && <Check size={12} className="text-white shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload File Input + Image URL Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Upload File */}
        <div>
          <label htmlFor="thumbnail" className="mb-1.5 block text-xs font-bold text-slate-700">
            Upload Thumbnail File (अपलोड फ़ाइल):
          </label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-xs text-slate-600 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-orange-50 file:text-xs file:font-black file:text-[#ea580c] hover:file:bg-orange-100 file:cursor-pointer cursor-pointer border border-slate-200 rounded-2xl p-1 bg-white"
          />
        </div>

        {/* Image URL fallback */}
        <div>
          <label htmlFor="thumbnailUrlInput" className="mb-1.5 block text-xs font-bold text-slate-700">
            Or Image URL (इमेज यूआरएल):
          </label>
          <input
            id="thumbnailUrlInput"
            type="url"
            value={urlInput}
            onChange={handleUrlInputChange}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
      </div>

      {/* Live Preview Box */}
      {previewUrl && (
        <div className="pt-2">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-600">
            <Eye size={14} className="text-[#ea580c]" />
            <span>Live Aspect Ratio Preview ({aspectRatio}):</span>
          </div>

          <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border-2 border-orange-400 bg-slate-900 shadow-md">
            <div className={`relative w-full ${currentRatioClass}`}>
              <Image
                src={previewUrl}
                alt="Thumbnail Live Preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-extrabold text-[10px]">
              Ratio: {aspectRatio}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

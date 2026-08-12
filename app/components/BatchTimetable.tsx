"use client";

import React, { useState } from "react";
import { Clock, Dumbbell, BookOpen, ShieldCheck, Trophy, MapPin, CheckCircle, Flag, Users } from "lucide-react";
import type { DbBatch } from "@/app/lib/action/batches";

export function isBatchVisible(isVisible?: boolean | string | number | null): boolean {
  if (isVisible === false) return false;
  if (isVisible === "false") return false;
  if (isVisible === "hide") return false;
  if (isVisible === "off") return false;
  if (isVisible === 0) return false;
  return true;
}

export default function BatchTimetable({
  liveBatches,
}: {
  liveBatches?: DbBatch[];
}) {
  const [filter, setFilter] = useState<"All" | "Physical" | "Written">("All");

  const displayBatches = liveBatches ?? [];

  const filteredBatches = displayBatches.filter(
    (b) => isBatchVisible(b.is_visible) && (filter === "All" || b.category === filter || b.category === "Combo")
  );

  return (
    <section id="batches" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-[#c2410c] border border-orange-300 text-xs font-black mb-3">
            <Flag className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>Desh Bhakti Training Schedule &amp; Timetable</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            ट्रेनिंग बैच एवं समय-सारणी (जय हिन्द)
          </h2>
          <p className="mt-2 text-slate-700 font-medium text-sm sm:text-base max-w-2xl mx-auto">
            बिहार पुलिस, इंडियन आर्मी एवं एसएससी जीडी भर्ती के लिए अनुशासित शारीरिक प्रशिक्षण समय-सारणी।
          </p>

          {/* Filter Pills Bar */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {(["All", "Physical", "Written"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`pill-tab ${filter === tab ? "pill-tab-active" : ""}`}
              >
                {tab === "All" ? "सभी बैचेज (All)" : tab === "Physical" ? "🏃‍♂️ फिजिकल बैच" : "📚 लिखित परीक्षा"}
              </button>
            ))}
          </div>
        </div>

        {/* Batch Cards Grid */}
        {filteredBatches.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-slate-200 text-center max-w-xl mx-auto shadow-sm">
            <Dumbbell size={36} className="text-orange-500 mx-auto mb-3" />
            <h3 className="text-lg font-black text-slate-900">No Batches Scheduled</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              No active batches have been added yet. Please check back later or contact admin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBatches.map((batch) => {
            const isPhysical = batch.category === "Physical";
            const isWritten = batch.category === "Written";
            const highlightsList = batch.highlights
              ? batch.highlights.split("\n").filter(Boolean)
              : [];

            return (
              <div
                key={batch.id}
                className="liquid-glass p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <div>
                  {/* Optional Batch Thumbnail Image */}
                  {batch.thumbnail_url && (
                    <div className="mb-4 overflow-hidden rounded-2xl border border-amber-500/20 shadow-sm relative group/img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={batch.thumbnail_url}
                        alt={batch.name}
                        className="w-full h-44 object-cover group-hover/img:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20">
                      {isPhysical ? (
                        <Dumbbell className="w-3.5 h-3.5 text-amber-600" />
                      ) : isWritten ? (
                        <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                      ) : (
                        <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      {batch.category}
                    </span>

                    <span
                      className={`text-xs font-black px-3.5 py-1 rounded-full ${
                        batch.status === "Filling Fast"
                          ? "bg-amber-100/90 text-amber-900 border border-amber-300"
                          : batch.status === "Full"
                          ? "bg-red-100/90 text-red-900 border border-red-300"
                          : "bg-emerald-100/90 text-emerald-900 border border-emerald-300"
                      }`}
                    >
                      {batch.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900">
                    {batch.name}
                  </h3>

                  {/* Specs Box */}
                  <div className="mt-4 space-y-2 text-xs bg-[#f4efe4]/80 p-4 rounded-2xl border border-amber-500/15">
                    <div className="flex items-center gap-2.5 text-slate-900 font-extrabold">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{batch.time}</span>
                    </div>
                    {batch.location && (
                      <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                        <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>{batch.location}</span>
                      </div>
                    )}
                    {batch.target_exam && (
                      <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Target: {batch.target_exam}</span>
                      </div>
                    )}
                    {batch.capacity && (
                      <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                        <Users className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Max Capacity: {batch.capacity} Students</span>
                      </div>
                    )}
                  </div>

                  {highlightsList.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-amber-500/15">
                      <h4 className="text-[11px] font-black text-amber-900/60 uppercase tracking-wider mb-2">
                        Batch Highlights
                      </h4>
                      <ul className="space-y-1.5">
                        {highlightsList.map((h, i) => (
                          <li key={i} className="text-xs font-semibold text-slate-700 flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{h.replace(/^[•\-\*]\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-amber-500/15 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">सीमित सीटें उपलब्ध</span>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-orange text-xs py-2 px-5 rounded-full shadow-lg shadow-amber-500/20"
                  >
                    Join Batch Now (App)
                  </a>

                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}


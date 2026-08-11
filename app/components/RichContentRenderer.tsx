"use client";

import React from "react";
import {
  CheckCircle2,
  Flame,
  Target,
  ShieldCheck,
  Zap,
  Sparkles,
  Dumbbell,
  ArrowRight,
  Info,
  Footprints,
  Compass,
} from "lucide-react";

interface RichContentProps {
  content: string;
  className?: string;
}

export default function RichContentRenderer({ content, className = "" }: RichContentProps) {
  if (!content || !content.trim()) return null;

  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);

  // Parse lines into structured sections
  const sections: {
    type: "main_title" | "step" | "routine" | "bullet_group" | "paragraph";
    title?: string;
    stepNumber?: number;
    items?: string[];
    text?: string;
  }[] = [];

  let currentSection: (typeof sections)[0] | null = null;
  let stepCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line looks like a Main Title
    if (
      line.includes("हाई जंप") ||
      line.includes("रनिंग स्पेशल") ||
      line.includes("गाइड") ||
      line.startsWith("# ")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "main_title",
        title: line.replace(/^#+\s*/, ""),
      };
      continue;
    }

    // Check if line looks like a Step / Technique Section Header (Approach, Take-off, Bar, Landing, etc.)
    if (
      line.includes("Approach") ||
      line.includes("Take-off") ||
      line.includes("रन-अप") ||
      line.includes("टेक-ऑफ") ||
      line.includes("बार पार") ||
      line.includes("लैंडिंग") ||
      line.includes("Landing") ||
      line.startsWith("## ")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "step",
        title: line.replace(/^#+\s*/, ""),
        stepNumber: stepCounter++,
        items: [],
      };
      continue;
    }

    // Check if line looks like Daily Routine / Exercise Section (रोज़ की प्रैक्टिस, वार्म-अप, etc.)
    if (
      line.includes("प्रैक्टिस") ||
      line.includes("Routine") ||
      line.includes("वर्कआउट") ||
      line.includes("वार्म-अप")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "routine",
        title: line,
        items: [],
      };
      continue;
    }

    // Check if line is an item belonging to an active section
    if (currentSection && (currentSection.type === "step" || currentSection.type === "routine")) {
      currentSection.items?.push(line);
      continue;
    }

    // Otherwise standard paragraph or bullet point
    if (line.startsWith("- ") || line.startsWith("• ")) {
      if (!currentSection || currentSection.type !== "bullet_group") {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          type: "bullet_group",
          items: [line.replace(/^[-•]\s*/, "")],
        };
      } else {
        currentSection.items?.push(line.replace(/^[-•]\s*/, ""));
      }
    } else {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "paragraph",
        text: line,
      };
    }
  }
  if (currentSection) sections.push(currentSection);

  return (
    <div className={`space-y-6 ${className}`}>
      {sections.map((section, idx) => {
        // Render Main Title Banner
        if (section.type === "main_title") {
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 p-6 sm:p-8 text-white shadow-xl border border-orange-500/30"
            >
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-amber-400 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Flame size={14} className="text-orange-400" />
                  <span>Physical Fitness &amp; Technique Guide</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {section.title}
              </h2>
            </div>
          );
        }

        // Render Step Technique Card
        if (section.type === "step") {
          const stepIcons = [Footprints, Zap, Compass, ShieldCheck];
          const StepIcon = stepIcons[(section.stepNumber! - 1) % stepIcons.length];

          return (
            <div
              key={idx}
              className="group relative rounded-3xl bg-white border-2 border-slate-200/90 p-5 sm:p-7 shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300 overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#ff9933] via-amber-400 to-[#138808]" />

              <div className="flex items-start gap-4">
                {/* Step Number Badge */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black text-sm shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <span className="block text-[10px] uppercase font-bold text-amber-100">Step</span>
                  <span>0{section.stepNumber}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <StepIcon size={18} className="text-orange-600" />
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                      {section.title}
                    </h3>
                  </div>

                  {section.items && section.items.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-xs sm:text-sm font-semibold"
                        >
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }

        // Render Practice / Workout Routine Grid Card
        if (section.type === "routine") {
          return (
            <div
              key={idx}
              className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-emerald-500/10 border-2 border-amber-400/50 p-6 sm:p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-slate-900 text-amber-400 shadow-md">
                  <Dumbbell size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200">
                    Daily Practice Schedule
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    {section.title}
                  </h3>
                </div>
              </div>

              {section.items && section.items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-3.5 rounded-2xl bg-white border border-amber-300/80 shadow-sm flex items-center gap-3 hover:border-orange-500 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 font-black text-xs flex items-center justify-center shrink-0">
                        #{itemIdx + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Render Bullet Points List
        if (section.type === "bullet_group") {
          return (
            <div key={idx} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
              <ul className="space-y-2.5">
                {section.items?.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <ArrowRight size={16} className="mt-0.5 shrink-0 text-orange-600" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // Render Paragraph with Card container if standalone
        return (
          <div
            key={idx}
            className="rounded-2xl bg-slate-50/80 border border-slate-200/80 p-4 text-xs sm:text-sm font-medium text-slate-800 leading-relaxed shadow-2xs"
          >
            {section.text}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import React from "react";
import {
  CheckCircle2,
  Flame,
  ShieldCheck,
  Zap,
  Dumbbell,
  ArrowRight,
  Footprints,
  Compass,
  Trophy,
  Activity,
  Award,
  Sparkles,
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

    // 1. Check if line is a Main Title Banner
    if (
      line.startsWith("# ") ||
      line.includes("सही तरीका") ||
      line.includes("गाइड") ||
      line.includes("रनिंग स्पेशल") ||
      line.includes("विशेषता")
    ) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "main_title",
        title: line.replace(/^#+\s*/, ""),
      };
      continue;
    }

    // 2. Check if line is a Step / Technique Section Header
    const isStepHeader =
      line.startsWith("## ") ||
      line.includes("Approach") ||
      line.includes("Take-off") ||
      line.includes("Landing") ||
      line.includes("रन-अप") ||
      line.includes("टेक-ऑफ") ||
      line.includes("बार पार") ||
      line.includes("लैंडिंग") ||
      line.includes("तरीका") ||
      line.includes("तकनीक");

    if (isStepHeader) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "step",
        title: line.replace(/^#+\s*/, ""),
        stepNumber: stepCounter++,
        items: [],
      };
      continue;
    }

    // 3. Check if line is a Routine / Workout Schedule Header
    const isRoutineHeader =
      line.startsWith("### ") ||
      line.includes("प्रैक्टिस") ||
      line.includes("Routine") ||
      line.includes("वर्कआउट") ||
      line.includes("वार्म-अप") ||
      line.includes("विशेषताएँ");

    if (isRoutineHeader) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: "routine",
        title: line.replace(/^#+\s*/, ""),
        items: [],
      };
      continue;
    }

    // 4. If active section is step or routine, append item
    if (currentSection && (currentSection.type === "step" || currentSection.type === "routine")) {
      currentSection.items?.push(line.replace(/^[-•]\s*/, ""));
      continue;
    }

    // 5. Check bullet point lists
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
      continue;
    }

    // 6. Regular Paragraph
    if (currentSection) sections.push(currentSection);
    currentSection = {
      type: "paragraph",
      text: line,
    };
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
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#090d16] p-6 sm:p-8 text-white shadow-xl border-2 border-orange-500/40"
            >
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-amber-400 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <Flame size={14} className="text-orange-400" />
                  <span>Physical Training &amp; Technique Guide</span>
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
          const stepIcons = [Footprints, Zap, Compass, ShieldCheck, Trophy, Activity];
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
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black text-sm shrink-0 shadow-md group-hover:scale-110 transition-transform text-center min-w-[58px]">
                  <span className="block text-[9px] uppercase font-bold text-amber-100 tracking-wider">Step</span>
                  <span className="text-base font-black">0{section.stepNumber}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-1.5 rounded-xl bg-orange-100 text-orange-700">
                      <StepIcon size={18} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                      {section.title}
                    </h3>
                  </div>

                  {section.items && section.items.length > 0 && (
                    <div className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 text-xs sm:text-sm font-bold shadow-2xs hover:bg-orange-50/40 transition-colors"
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
              className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-emerald-500/10 border-2 border-amber-400/60 p-6 sm:p-8 shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-900 text-amber-400 shadow-md">
                  <Dumbbell size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-300">
                    Daily Training &amp; Routine
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    {section.title}
                  </h3>
                </div>
              </div>

              {section.items && section.items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {section.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-3.5 rounded-2xl bg-white border-2 border-amber-200 shadow-xs flex items-center gap-3 hover:border-orange-500 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
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
            <div key={idx} className="rounded-3xl bg-white border-2 border-slate-200 p-5 sm:p-6 shadow-sm">
              <ul className="space-y-3">
                {section.items?.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-bold text-slate-800">
                    <ArrowRight size={16} className="mt-0.5 shrink-0 text-orange-600" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // Render Paragraph with Card container
        return (
          <div
            key={idx}
            className="rounded-2xl bg-white border border-slate-200 p-4 text-xs sm:text-sm font-bold text-slate-800 leading-relaxed shadow-2xs"
          >
            {section.text}
          </div>
        );
      })}
    </div>
  );
}

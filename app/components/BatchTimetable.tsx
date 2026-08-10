"use client";

import React, { useState } from "react";
import { Clock, Dumbbell, BookOpen, ShieldCheck, Trophy, MapPin, CheckCircle, Flag } from "lucide-react";

export interface BatchItem {
  id: string;
  name: string;
  category: "Physical" | "Written" | "Combo";
  time: string;
  location: string;
  targetExam: string;
  highlights: string[];
  status: "Open" | "Filling Fast" | "Special Sunday Trial";
  cardTheme: "saffron" | "green" | "navy";
}

const BATCHES: BatchItem[] = [
  {
    id: "batch-1",
    name: "Morning Physical Training Batch (मॉर्निंग फिजिकल)",
    category: "Physical",
    time: "05:00 AM - 07:30 AM",
    location: "Gandhi Maidan / Stadium Ground, Lakhisarai",
    targetExam: "Bihar Police Constable, SI, Army Agniveer, RPF",
    highlights: [
      "1600m / 1000m Running Technique & Endurance",
      "High Jump Training (Tiger & Scissor style)",
      "Shot Put (गोला फेंक) & Long Jump Drills",
      "Daily Stamina & Stretches under NIS Coach",
    ],
    status: "Filling Fast",
    cardTheme: "saffron",
  },
  {
    id: "batch-2",
    name: "Evening Physical & Stamina Batch (ईवनिंग बैच)",
    category: "Physical",
    time: "04:30 PM - 06:30 PM",
    location: "Lakhisarai Sports Complex Ground",
    targetExam: "SSC GD Physical Test, SSC CPO, Home Guard",
    highlights: [
      "Weight loss & Sprinting technique",
      "Core & Leg Strength conditioning",
      "Individual Timing assessment every Saturday",
    ],
    status: "Open",
    cardTheme: "green",
  },
  {
    id: "batch-3",
    name: "Written Exam Mastery Batch (लिखित परीक्षा स्पेशल)",
    category: "Written",
    time: "10:30 AM - 01:30 PM",
    location: "Lakhisarai Academy Classroom Center",
    targetExam: "Bihar Police CSBC, BPSSC SI, SSC GD Written",
    highlights: [
      "Bihar GK, Samanya Vigyan & General Studies",
      "Maths & Reasoning Shortcut Methods",
      "Weekly Mock Test with OMR Evaluation",
    ],
    status: "Open",
    cardTheme: "navy",
  },
  {
    id: "batch-4",
    name: "Sunday Special Time Trial & Medical Screening",
    category: "Combo",
    time: "06:00 AM - 09:30 AM",
    location: "Academy Ground",
    targetExam: "All Defence & Police Aspirants",
    highlights: [
      "Exact 1600m Digital Timer Run Test",
      "Body Measurement (Height, Chest, Weight)",
      "Flat foot, Knock Knee & Eye Sight Initial Check",
    ],
    status: "Special Sunday Trial",
    cardTheme: "saffron",
  },
];

export default function BatchTimetable() {
  const [filter, setFilter] = useState<"All" | "Physical" | "Written">("All");

  const filteredBatches = BATCHES.filter(
    (b) => filter === "All" || b.category === filter || b.category === "Combo"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBatches.map((batch) => {
            return (
              <div
                key={batch.id}
                className="liquid-glass p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20">
                      {batch.category === "Physical" ? (
                        <Dumbbell className="w-3.5 h-3.5 text-amber-600" />
                      ) : batch.category === "Written" ? (
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
                    <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                      <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{batch.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Target: {batch.targetExam}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-amber-500/15">
                    <h4 className="text-[11px] font-black text-amber-900/60 uppercase tracking-wider mb-2">
                      Batch Highlights
                    </h4>
                    <ul className="space-y-1.5">
                      {batch.highlights.map((h, i) => (
                        <li key={i} className="text-xs font-semibold text-slate-700 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-500/15 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">सीमित सीटें उपलब्ध</span>
                  <a
                    href="#contact"
                    className="btn-orange text-xs py-2 px-5 rounded-full shadow-lg shadow-amber-500/20"
                  >
                    Join Batch Now
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

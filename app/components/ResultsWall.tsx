"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Trophy, Award, CheckCircle2, Star, Flag, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { getCloudinaryUrl } from "../lib/cloudinary";

export interface CandidateResult {
  id: string;
  name: string;
  post: string;
  exam: string;
  year: string;
  rankOrRoll?: string;
  imageUrl: string;
  quote?: string;
}

const RESULTS: CandidateResult[] = [
  {
    id: "r1",
    name: "Vikram Kumar",
    post: "Bihar Police Constable",
    exam: "Bihar Police",
    year: "2024",
    rankOrRoll: "Roll: 8410294",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    quote: "1600m की रनिंग और टाइगर जंप सिर्फ लखीसराय एकेडमी की मेहनत से 4:55 मिनट में पूरा किया!",
  },
  {
    id: "r2",
    name: "Rahul Sharma",
    post: "Indian Army Agniveer (GD)",
    exam: "Army Agniveer",
    year: "2024",
    rankOrRoll: "Physical: 100 Marks",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    quote: "60 नंबर रनिंग + 40 बीम नंबर! 100 में 100 अंक का श्रेय निदेशक सर को जाता है। जय हिन्द!",
  },
  {
    id: "r3",
    name: "Pooja Kumari",
    post: "Bihar Police Constable (Mahila)",
    exam: "Bihar Police",
    year: "2023",
    rankOrRoll: "Merit Rank: 142",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    quote: "महिलाओं के लिए सुरक्षित माहौल और बेहतरीन फिजिकल गाइडेंस लखीसराय एकेडमी में मिलती है।",
  },
  {
    id: "r4",
    name: "Amit Kumar Yadav",
    post: "SSC GD Constable (CISF)",
    exam: "SSC GD",
    year: "2024",
    rankOrRoll: "Score: 148/160",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    quote: "5km फिजिकल 19 मिनट में क्लियर किया। सर का सपोर्ट हमेशा साथ रहा।",
  },
  {
    id: "r5",
    name: "Rajesh Kumar",
    post: "RPF Constable",
    exam: "RPF",
    year: "2023",
    rankOrRoll: "Roll: 2049102",
    imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    quote: "लॉन्ग जंप और हाई जंप की स्पेशल तकनीक ने मेरा सिलेक्शन आसान बनाया।",
  },
  {
    id: "r6",
    name: "Deepak Kumar",
    post: "Bihar Police SI (दरोगा)",
    exam: "Bihar Police",
    year: "2023",
    rankOrRoll: "SI Merit List",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    quote: "फिजिकल और लिखित परीक्षा दोनों की एक साथ तैयारी ने मुझे स्टार दिलाया!",
  },
];

export default function ResultsWall() {
  const [selectedExam, setSelectedExam] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredResults = RESULTS.filter(
    (r) => selectedExam === "All" || r.exam === selectedExam
  );

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section id="placed-achievements" className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#138808] border border-emerald-300 text-xs font-black mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#138808]" />
              <span>Placed Achievements • 1200+ Selections</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Placed Achievements <span className="text-[#ea580c]">(हमारे चयनित जाँबाज)</span>
            </h2>
            <p className="mt-2 text-slate-600 font-medium text-sm sm:text-base max-w-xl">
              Meet our proud academy alumni selected in Indian Army, Bihar Police, SI, SSC GD, and RPF examinations.
            </p>
          </div>

          {/* Carousel Arrows & Filter Strip */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:border-orange-500 hover:text-[#ea580c] shadow-sm transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:border-orange-500 hover:text-[#ea580c] shadow-sm transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {["All", "Bihar Police", "Army Agniveer", "SSC GD", "RPF"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedExam(tab)}
              className={`pill-tab ${selectedExam === tab ? "pill-tab-active" : ""}`}
            >
              {tab === "All" ? "सभी परिणाम (All Selections)" : tab}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Carousel */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-none pb-4 pt-2 snap-x snap-mandatory"
        >
          {filteredResults.map((candidate, idx) => {
            const borderClass =
              idx % 3 === 0
                ? "bento-card-saffron"
                : idx % 3 === 1
                ? "bento-card-green"
                : "bento-card-navy";

            return (
              <div
                key={candidate.id}
                className={`snap-start shrink-0 w-[300px] sm:w-[340px] bento-card ${borderClass} p-5 flex flex-col justify-between shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div>
                  <div className="relative w-full h-60 rounded-2xl overflow-hidden mb-4 bg-slate-100 ring-2 ring-slate-200/80">
                    <Image
                      src={getCloudinaryUrl(candidate.imageUrl, { width: 450, height: 450, crop: "fill" })}
                      alt={candidate.name}
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-[#ea580c] text-white font-extrabold text-xs rounded-full shadow-lg backdrop-blur-md">
                      {candidate.exam}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">{candidate.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={13} className="fill-amber-400" />
                      <span className="text-xs font-black text-slate-800">Selected</span>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-slate-600 mt-0.5">
                    {candidate.post} ({candidate.year})
                  </p>

                  {candidate.rankOrRoll && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#138808] border border-emerald-300 text-xs font-black rounded-full mt-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#138808]" />
                      <span>{candidate.rankOrRoll}</span>
                    </div>
                  )}

                  {candidate.quote && (
                    <p className="text-xs text-slate-700 font-medium italic leading-relaxed line-clamp-3 mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      &ldquo;{candidate.quote}&rdquo;
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 text-[#ea580c] font-black">
                    <Award className="w-3.5 h-3.5 text-[#ea580c]" /> Placed Hero
                  </span>
                  <span className="font-bold text-slate-700">Lakhisarai</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { MapPin, ShieldCheck, Award, Dumbbell, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";

export const TRAINING_AREAS = [
  {
    region: "Lakhisarai (Main Ground)",
    center: "K.R.K Field Ground",
    landmark: "Main Training Hub, Lakhisarai",
    tag: "Headquarters & Hostel",
    desc: "1600m Track, High Jump Scissor/Tiger Pits, Shot Put Circle, Digital Stop-watch & Medical Checks.",
  },
  {
    region: "Munger Region",
    center: "Munger Candidates Batch",
    landmark: "Direct Transport to KRK Field",
    tag: "Agniveer & Police",
    desc: "Special morning & evening physical training batches for candidates from Jamalpur & Munger district.",
  },
  {
    region: "Jamui Region",
    center: "Jamui District Batch",
    landmark: "KRK Field Practice",
    tag: "Army & SSC GD",
    desc: "Dedicated physical fitness preparation for Army Agniveer rally, SSC GD & RPF aspirants.",
  },
  {
    region: "Sheikhpura Region",
    center: "Sheikhpura Candidate Hub",
    landmark: "Hostel Facility Available",
    tag: "Bihar Police & SI",
    desc: "Targeted physical test training for Bihar Police Constable, SI Daroga & Excise Constable.",
  },
  {
    region: "Begusarai Region",
    center: "Begusarai Candidate Batch",
    landmark: "KRK Field Lakhisarai",
    tag: "Defence Physical",
    desc: "Full time physical coaching with mess food & hostel accommodation for candidates across Begusarai.",
  },
  {
    region: "Patna & All Bihar Districts",
    center: "Bihar State Level Batch",
    landmark: "Outstation Hostel",
    tag: "#1 Physical Academy",
    desc: "Bihar's top rated physical academy attracting defense candidates from all 38 districts of Bihar.",
  },
];

export default function AreaWiseSeoSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#17230D] text-white relative overflow-hidden border-y-4 border-amber-500/40">
      {/* Tactical Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black uppercase tracking-wider backdrop-blur-md">
            <Award size={14} className="text-[#FF9933]" />
            <span>Best Training Academy • Lakhisarai Physical Academy</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Area-Wise <span className="text-[#FF9933]">Army &amp; Bihar Police Physical Training</span> Network
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Lakhisarai Physical Academy (<strong className="text-amber-400">lakhisaraphysicalacademy</strong>) is Bihar&apos;s 
            #1 best training academy at K.R.K Field Lakhisarai, providing elite physical preparation for Indian Army Agniveer, 
            Bihar Police Constable, SI (Daroga), SSC GD, RPF &amp; Defence recruitment tests across all nearby districts.
          </p>
        </div>

        {/* Area-Wise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {TRAINING_AREAS.map((area, idx) => (
            <div
              key={idx}
              className="group rounded-3xl bg-slate-900/90 border border-amber-500/30 p-5 sm:p-6 shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                    {area.tag}
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Active Training</span>
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-[#FF9933] transition-colors flex items-center gap-2">
                  <MapPin size={18} className="text-[#FF9933] shrink-0" />
                  <span>{area.region}</span>
                </h3>

                <p className="text-xs font-extrabold text-amber-200/90 mt-1">
                  {area.center} • {area.landmark}
                </p>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-medium">
                  {area.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">Military Coaching</span>
                <Link
                  href="/admission-form"
                  className="inline-flex items-center gap-1 text-xs font-black text-[#FF9933] hover:underline"
                >
                  <span>Join Area Batch</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Keywords Summary Footer Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-emerald-500/20 p-6 border border-amber-500/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-black text-amber-300">
              #1 Best Training Academy for Defence Physical Tests in Bihar
            </h4>
            <p className="text-xs text-slate-300 font-medium max-w-3xl">
              Specialized coaching by Ganesh Sir &amp; Mahesh Sir for 1600m Running, High Jump (Scissor &amp; Tiger Jump), Shot Put (16lb), 
              Long Jump, Knock-Knee &amp; Flat-Foot medical checkup with dedicated Hostel &amp; Bhojanalaya.
            </p>
          </div>

          <Link
            href="/courses"
            className="px-6 py-3 rounded-full bg-[#FF9933] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shrink-0 flex items-center gap-2 hover:scale-105"
          >
            <Dumbbell size={16} />
            <span>Explore All Training Programs</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

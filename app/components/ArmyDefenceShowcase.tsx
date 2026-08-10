"use client";

import { Shield, Target, Flame, CheckCircle2, ChevronRight, Compass, ShieldCheck, Award } from "lucide-react";
import Container from "./Container";
import { whatsappHref } from "../lib/constants";

const ARMY_PILLARS = [
  {
    title: "1600m Speed & Endurance Track Drill",
    target: "Target Timing: 5:00 – 5:30 Min",
    description: "Daily morning time trials on 400m track at K.R.K Field, Lakhisarai ground under expert stopwatch monitoring.",

    badge: "🪖 1600m Special",
    accentColor: "border-l-4 border-l-[#ea580c]",
    icon: Flame,
  },
  {
    title: "High Jump Technique (Tiger & Scissor)",
    target: "Target Height: 4ft 4in – 5ft+",
    description: "Sand pit high jump practice with scientific landing safety & posture corrections.",
    badge: "🪖 High Jump Drill",
    accentColor: "border-l-4 border-l-[#000080]",
    icon: Target,
  },
  {
    title: "Long Jump & Shot Put Power Throw",
    target: "16lb Ball / 16ft Long Jump",
    description: "Explosive arm & leg muscle training for maximum distance in Police & SSC GD physical tests.",
    badge: "🪖 Power & Distance",
    accentColor: "border-l-4 border-l-[#138808]",
    icon: ShieldCheck,
  },
  {
    title: "Medical & Body Screening Checkup",
    target: "Pre-Exam Screening",
    description: "Knock-knee, flat foot, eyesight check, & chest expansion guidance before main recruitment rally.",
    badge: "🪖 Medical Prep",
    accentColor: "border-l-4 border-l-amber-500",
    icon: Shield,
  },
];

const RECRUITMENT_TARGETS = [
  { name: "Indian Army Agniveer Rally", badge: "GD / Tradesman / Tech" },
  { name: "Bihar Police Constable", badge: "8415+ Posts Prep" },
  { name: "Bihar Daroga (SI)", badge: "Sub-Inspector Physical" },
  { name: "SSC GD (BSF, CISF, CRPF, ITBP)", badge: "5km / 1.6km Run" },
  { name: "RPF Railway Protection Force", badge: "Constable & SI" },
];

export default function ArmyDefenceShowcase() {
  return (
    <section className="py-16 sm:py-24 army-camo-bg text-white relative overflow-hidden">
      {/* Top Tiranga Tricolor Line */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#224223] text-[#d4a359] border border-[#3d633f] text-xs font-black mb-4 shadow-lg">
            <Compass size={14} className="text-amber-400" />
            <span>🪖 वीरता • अनुशासन • लक्ष्य | Indian Army &amp; Defence Preparation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Elite Physical Training for <span className="text-[#ff9933]">Army &amp; Defence Services</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Personalized physical test preparation for Indian Army Agniveer, Bihar Police, Daroga, and Para-military forces guided by **Ganesh Sir &amp; Coach Mahesh Sir**.
          </p>
        </div>

        {/* 4 Training Pillars Grid in Tactical Camo Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARMY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`bento-card bento-card-army p-6 shadow-2xl ${pillar.accentColor} hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="badge-army px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
                    {pillar.badge}
                  </span>
                  <span className="text-xs font-extrabold text-amber-400">
                    {pillar.target}
                  </span>
                </div>

                <div className="flex items-start gap-4 mt-2">
                  <div className="p-3 rounded-2xl bg-[#0d1a0d] border border-[#2d5430] text-[#ff9933] shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 font-medium leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recruitment Targets Strip in Tactical Dark Green */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#142914] border-2 border-[#2b4c2b] shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="text-xs font-black uppercase tracking-widest text-[#ff9933] flex items-center gap-2">
              <Award size={16} className="text-amber-400" />
              <span>🪖 Dedicated Defence &amp; Police Rally Coaching Batches</span>
            </p>
            <span className="text-[10px] font-extrabold text-[#138808] bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700 hidden sm:inline-block">
              Daily Ground Training
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {RECRUITMENT_TARGETS.map((tgt) => (
              <div
                key={tgt.name}
                className="p-3.5 rounded-2xl bg-[#0d1a0d] border border-[#244224] flex items-center justify-between gap-2 hover:border-[#8b9a65] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#138808] shrink-0" />
                  <span className="text-xs font-black text-white">{tgt.name}</span>
                </div>
                <span className="text-[10px] font-extrabold text-[#d4a359] bg-[#1c361e] px-2 py-0.5 rounded-md border border-[#3d633f]">
                  {tgt.badge}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#264726] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-slate-300">
              ⚡ Morning Batch: 5:00 AM • Evening Batch: 4:00 PM (K.R.K Field, Lakhisarai)

            </p>
            <a
              href={whatsappHref("Jai Hind! I want to join the Army / Police physical fitness training batch.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange text-xs py-2.5 px-6 shrink-0 shadow-lg"
            >
              <span>Join Army Training Batch</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

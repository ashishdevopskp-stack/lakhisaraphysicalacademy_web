import {
  Dumbbell,
  Target,
  TrendingUp,
  BarChart3,
  Users,
  Flame,
  ShieldCheck,
  RefreshCw,
  Trophy,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { SectionGlow, AboutSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_AboutMotion";
import { whatsappHref } from "@/app/lib/constants";

export const metadata = {
  title: "What We Train | Lakhisarai Physical Academy",
  description:
    "Every session is built around exam-day standards — 1600m running, high jump, shot put, endurance, and discipline.",
};

const TRAINING_MODULES = [
  {
    title: "1600m / 1000m Running & Lap Pacing",
    desc: "Scientific running drills, stride length improvement, and lap timing to clear 1600m under 5:30 mins.",
    badge: "1600m Specialist",
    icon: Flame,
    color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-600",
  },
  {
    title: "High Jump (Tiger & Scissor Style)",
    desc: "Technique drills, run-up angle, take-off bounce, and landing safety on high-density foam pit.",
    badge: "High Jump",
    icon: Dumbbell,
    color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-600",
  },
  {
    title: "Shot Put (गोला फेंक) Distance Throw",
    desc: "Core strength, elbow release angle, and wrist snap techniques to achieve maximum 20+ feet distance.",
    badge: "Shot Put",
    icon: Trophy,
    badgeColor: "bg-amber-100 text-amber-800",
    color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-600",
  },
  {
    title: "Long Jump & Agility Drills",
    desc: "Speed runway sprint, board take-off, knee tuck, and landing extension for max distance.",
    badge: "Long Jump",
    icon: TrendingUp,
    color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-600",
  },
  {
    title: "Stamina, Core & Muscular Strength",
    desc: "Daily 30-min abdominal core workouts, leg squats, push-ups, and post-workout muscle stretching.",
    badge: "Conditioning",
    icon: ShieldCheck,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-600",
  },
  {
    title: "Weekly Sunday Digital Time Trial",
    desc: "Real exam atmosphere 1600m digital timer evaluation with individual timing report & rank list.",
    badge: "Sunday Trial",
    icon: BarChart3,
    color: "from-red-500/20 to-rose-500/10 border-red-500/30 text-red-600",
  },
];

const WHY_CHOOSE = [
  { icon: Dumbbell, label: "Professional Physical Coaching" },
  { icon: Target, label: "Exam-Oriented PET Standards" },
  { icon: TrendingUp, label: "Strength & Endurance Development" },
  { icon: BarChart3, label: "Regular Performance Evaluation" },
  { icon: Users, label: "Personal Attention to Every Cadet" },
  { icon: Flame, label: "High-Energy Motivational Ground" },
  { icon: ShieldCheck, label: "Disciplined Military Training Environment" },
  { icon: RefreshCw, label: "Continuous Performance Tracking" },
];

export default function WhatWeTrain() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-20 bg-gradient-to-b from-orange-50/70 via-[#faf7f0] to-white border-b border-orange-200/60">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <AboutSubNav current="/about/whatwetrain" />
          </div>

          <FadeInUp className="max-w-[70ch]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-300 text-xs font-black text-orange-800 shadow-2xs mb-4">
              <Sparkles size={14} className="text-orange-600" />
              <span>PHYSICAL EXCELLENCE &amp; DISCIPLINE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600">Train Our Aspirants</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
              Every physical session at K.R.K Field is engineered around exact exam-day PET standards — 1600m running, high jump, shot put, endurance, and unshakeable discipline.
            </p>
          </FadeInUp>
        </Container>
      </section>

      {/* Training Modules Grid */}
      <section className="py-14 sm:py-20 bg-white">
        <Container>
          <ScrollFadeUp className="mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200">
              Core Physical Events
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Physical Events &amp; Training Modules
            </h2>
          </ScrollFadeUp>

          <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAINING_MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <StaggerItem key={module.title}>
                  <div className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-50 border-2 border-slate-200/90 hover:border-orange-500 hover:bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${module.color} border shadow-2xs group-hover:scale-110 transition-transform`}>
                          <Icon size={22} />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200">
                          {module.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {module.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-2 leading-relaxed">
                        {module.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-black text-orange-700">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={15} className="text-orange-600" />
                        <span>Daily Ground Practice</span>
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerList>
        </Container>
      </section>

      {/* Why Students Choose Ganesh Sir */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <SectionGlow variant={3} />
        <Container>
          <ScrollFadeUp className="text-center mb-10">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200">
              Why Aspirants Trust Us
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">
              Why Students Choose Ganesh Sir
            </h2>
          </ScrollFadeUp>

          <StaggerList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map(({ icon: Icon, label }) => (
              <StaggerItem key={label}>
                <div className="flex items-center gap-3.5 p-5 rounded-2xl bg-white border-2 border-slate-200/90 shadow-xs hover:shadow-md hover:border-orange-400 transition-all">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 leading-snug">{label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          <div className="mt-10 text-center">
            <Button href={whatsappHref("Hello Lakhisarai Physical Academy, I want to join training batch.")} variant="primary">
              Join Ground Batch Today
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
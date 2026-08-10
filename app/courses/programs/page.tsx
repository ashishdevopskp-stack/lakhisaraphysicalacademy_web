// app/courses/programs/page.tsx

import {
  ArrowRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Star,
  Flame,
  Dumbbell,
  ClipboardCheck,
  TrainFront,
  Timer,
  BarChart3,
  CheckCircle2,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { SectionGlow, CoursesSubNav, PILL_COLORS } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_CoursesMotion";
import { whatsappHref } from "../../lib/constants";

export const metadata = {
  title: "Training Programs | Lakhisarai Physical Academy",
  description:
    "Army, Bihar Police, Daroga, SSC GD, CISF, CRPF, BSF, Railway, and Fireman physical training programs, each built around that exam's standards.",
};

const PROGRAMS = [
  {
    icon: Shield,
    title: "Army Physical Training",
    badge: "1600m PET Special",
    overview: "Complete physical preparation for candidates appearing in Indian Army Agniveer & Regular recruitment.",
    includes: [
      "1600m Running Practice & Speed Building",
      "Push-ups, Dips & Beam Pull-ups",
      "Endurance & High Stamina Development",
      "Physical Efficiency Test (PET) Mocks",
      "Weekly Timing & Performance Tracking",
    ],
    suitableFor: "Army Aspirants (Agniveer / GD / Tradesman)",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    icon: ShieldAlert,
    title: "Bihar Police Constable Physical Training",
    badge: "Police PET Master",
    overview: "Specialized training for Bihar Police Constable physical test standards & 100-mark scoring.",
    includes: [
      "Long Distance Running & Sprint Techniques",
      "High Jump (Pass & Max Points Guidance)",
      "Gola Fek (Shot Put) Distance Technique",
      "Height, Chest & PET Standards Guidance",
      "Daily Fitness & Mock Physical Evaluation",
    ],
    suitableFor: "Bihar Police Constable Aspirants",
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    icon: Star,
    title: "Bihar Daroga (SI) Physical Training",
    badge: "Sub-Inspector Special",
    overview: "Targeted physical preparation for Bihar Police Sub-Inspector (Daroga) physical efficiency test.",
    includes: [
      "Running Technique & Time Optimization",
      "High Jump & Long Jump Specialized Coaching",
      "Shot Put Training for Maximum Distance",
      "Endurance & Stamina Assessment",
      "Physical Efficiency Test (PET) Mocks",
    ],
    suitableFor: "Sub-Inspector (Daroga) Aspirants",
    gradient: "from-[#ea580c]/10 via-amber-500/5 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "SSC GD Physical Training",
    badge: "5KM / 1.6KM PET",
    overview: "Rigorous stamina and endurance training tailored to SSC GD (Paramilitary) physical test requirements.",
    includes: [
      "5KM Running Sessions for Boys & 1.6KM for Girls",
      "Stamina & Pace Management Techniques",
      "Agility Exercises & Speed Drills",
      "Height & Chest Measurement Guidance",
      "Weekly Mock PET Evaluation",
    ],
    suitableFor: "SSC GD Recruitment Aspirants",
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    icon: Shield,
    title: "CISF Physical Training",
    badge: "Central Industrial Security",
    overview: "Comprehensive fitness training for CISF Constable & Tradesman physical efficiency tests.",
    includes: [
      "Running Practice & Breathing Control",
      "Core & Upper Body Strength Drills",
      "Endurance Building Sessions",
      "Physical Efficiency Test Practice",
      "Strict Attendance & Discipline Monitoring",
    ],
    suitableFor: "CISF Recruitment Aspirants",
    gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "CRPF Physical Training",
    badge: "Paramilitary Force",
    overview: "Intensive endurance & strength conditioning for Central Reserve Police Force physical tests.",
    includes: [
      "Running Sessions & Speed Drills",
      "Body Weight Exercises & Push-ups",
      "Stamina & Recovery Management",
      "Mock PET Tests under NIS Supervision",
      "Personalized Fitness Tracking",
    ],
    suitableFor: "CRPF Recruitment Aspirants",
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  {
    icon: ShieldAlert,
    title: "BSF Physical Training",
    badge: "Border Security Force",
    overview: "Border Security Force physical test coaching focused on stamina, speed, and hurdle endurance.",
    includes: [
      "Paced Distance Running & Sprints",
      "Endurance & Physical Strength Drills",
      "Obstacle & High-Energy Training",
      "PET Practice & Time Improvements",
      "Daily Fitness Assessments",
    ],
    suitableFor: "BSF Recruitment Aspirants",
    gradient: "from-rose-500/10 via-orange-500/5 to-transparent",
  },
  {
    icon: Flame,
    title: "Fireman Physical Training",
    badge: "Fire Services PET",
    overview: "Focused physical training for Bihar Fireman and State Fire Service recruitment exams.",
    includes: [
      "Running Practice & Sprint Drills",
      "Rope Climbing & Weight Carrying Practice",
      "Upper Body Strength Development",
      "Mock Physical Efficiency Test",
      "Stamina & Recovery Guidance",
    ],
    suitableFor: "Fireman Recruitment Candidates",
    gradient: "from-red-500/10 via-amber-500/5 to-transparent",
  },
  {
    icon: TrainFront,
    title: "Railway Physical Training",
    badge: "Railway Group D",
    overview: "Specialized training for Railway Group D physical efficiency test (weight carrying & running).",
    includes: [
      "1000m Running Practice for Male & Female",
      "35kg / 20kg Weight Carrying Sprint Training",
      "Leg Strength & Core Stability Drills",
      "PET Guidance & Trial Runs",
    ],
    suitableFor: "Railway Group D Aspirants",
    gradient: "from-yellow-500/10 via-orange-500/5 to-transparent",
  },
  {
    icon: Timer,
    title: "Running & Endurance Special Batch",
    badge: "Speed & Stamina",
    overview: "High-intensity running batch designed to lower your 1600m / 5KM timing with scientific techniques.",
    includes: [
      "Scientific Running Form & Footwork",
      "Interval Training & Sprint Sessions",
      "Breathing Techniques & Lungs Capacity",
      "Leg Muscle Recovery & Injury Prevention",
    ],
    suitableFor: "All Physical Aspirants & Athletes",
    gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
  },
  {
    icon: Dumbbell,
    title: "Physical Fitness Program",
    badge: "General Body Building",
    overview: "Overall physical transformation, stamina enhancement, and weight management program.",
    includes: [
      "Full Body Functional Workouts",
      "Calisthenics & Strength Exercises",
      "Core & Flexibility Enhancement",
      "Body Weight Management & Fitness",
    ],
    suitableFor: "Anyone interested in physical fitness",
    gradient: "from-teal-500/10 via-cyan-500/5 to-transparent",
  },
  {
    icon: ClipboardCheck,
    title: "Guest Physical Test Program",
    badge: "Trial Assessment",
    overview: "One-day trial assessment at K.R.K Field, Lakhisarai ground with instant performance report card.",

    includes: [
      "Official 1600m / PET Trial Timing",
      "High Jump & Shot Put Trial Assessment",
      "Detailed Performance Report Card",
      "Expert Guidance by Ganesh Sir",
    ],
    suitableFor: "Students from any district / academy",
    ctaLabel: "Register for Trial",
    gradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
  },
];

const EVALUATION_CRITERIA = [
  "1600m Running Speed",
  "High Jump Clearance",
  "Shot Put Distance",
  "Endurance & Lungs Capacity",
  "Physical Fitness & Weight",
  "PET Exam Readiness",
  "Weekly Progress Tracking",
];

export default function Programs() {
  return (
    <>
      {/* Hero Header */}
      <section id="top" className="relative overflow-hidden pb-12 pt-16 sm:pb-20 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <CoursesSubNav current="/courses/programs" />
          </div>

          <FadeInUp className="max-w-[62ch]">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
              Recruitment Specific Batches
            </p>
            <h1 className="font-display mt-4 max-w-[22ch] text-[34px] font-black leading-[1.1] sm:text-[44px] lg:text-[52px] text-slate-900">
              A Program for <span className="text-[#ea580c]">Every Recruitment Goal</span>
            </h1>
            <p className="font-body mt-5 max-w-[54ch] text-[15.5px] leading-relaxed text-slate-600 font-medium">
              From Army and Bihar Police to SSC GD, CISF, CRPF, BSF, Railway,
              and Fireman recruitment — each program is built around the exact
              physical efficiency standards of that exam.
            </p>
          </FadeInUp>
        </Container>
      </section>

      {/* Main Programs Cards Section */}
      <section className="py-12 sm:py-20 bg-slate-50/50">
        <Container>
          <ScrollFadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-orange-100 text-[#ea580c] rounded-full">
                Live Recruitment Batches
              </span>
              <h2 className="font-display text-[26px] font-black sm:text-[36px] text-slate-900 mt-2">
                All Training Programs At A Glance
              </h2>
            </div>
            <p className="text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm w-fit">
              Showing 12 Specialized Batches
            </p>
          </ScrollFadeUp>

          <StaggerList className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {PROGRAMS.map((p) => {
              const Icon = p.icon;
              const whatsappMsg = encodeURIComponent(
                `Hello Lakhisarai Physical Academy, I am interested in joining the ${p.title} batch. Please provide details.`
              );

              return (
                <StaggerItem key={p.title}>
                  <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 transition-all duration-300 group">
                    {/* Background Soft Glow Gradient */}
                    <div
                      aria-hidden
                      className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`}
                    />

                    <div className="relative z-10 space-y-4">
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm group-hover:bg-[#ea580c] group-hover:text-white transition-colors">
                          <Icon size={24} />
                        </div>

                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#ea580c] bg-orange-50 rounded-full border border-orange-200">
                          {p.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-black text-slate-900 group-hover:text-[#ea580c] transition-colors leading-snug">
                        {p.title}
                      </h3>

                      {p.overview && (
                        <p className="text-xs font-medium text-slate-600 leading-relaxed">
                          {p.overview}
                        </p>
                      )}

                      {/* Point-wise Includes List */}
                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                          Key Training Modules:
                        </p>
                        <ul className="space-y-1.5">
                          {p.includes.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-xs font-semibold text-slate-800 leading-snug"
                            >
                              <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer / Suitable & CTA */}
                    <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Target size={14} className="text-[#ea580c] shrink-0" />
                        <span className="truncate">For: {p.suitableFor}</span>
                      </div>

                      <a
                        href={whatsappHref(whatsappMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-slate-900 text-white text-xs font-black hover:bg-[#ea580c] transition-colors shadow-md group-hover:shadow-orange-500/25"
                      >
                        <span>{p.ctaLabel ?? "Join This Batch"}</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerList>
        </Container>
      </section>

      {/* Performance Evaluation Criteria */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <SectionGlow variant={2} />
        <Container>
          <ScrollFadeUp>
            <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-orange-100 text-[#ea580c] rounded-full">
              Evaluation Matrix
            </span>
            <h2 className="font-display mt-3 max-w-[36ch] text-[28px] font-black sm:text-[36px] text-slate-900">
              Every student is regularly assessed on:
            </h2>
          </ScrollFadeUp>

          <StaggerList className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {EVALUATION_CRITERIA.map((item, i) => (
              <StaggerItem key={item}>
                <div className="card-flat flex flex-col items-center justify-center gap-2 p-4 text-center bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-orange-300 hover:shadow-md transition-all">
                  <BarChart3 size={18} className="text-[#ea580c]" />
                  <span className="font-body text-xs font-bold text-slate-800">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>
    </>
  );
}
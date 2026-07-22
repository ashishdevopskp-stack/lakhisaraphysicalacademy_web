import {
  Dumbbell,
  Target,
  TrendingUp,
  BarChart3,
  Users,
  Flame,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, AboutSubNav, PILL_COLORS } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_AboutMotion";

export const metadata = {
  title: "What We Train | Lakhisarai Physical Academy",
  description:
    "Every session is built around exam-day standards — running, endurance, strength, and the discipline it takes to keep improving day after day.",
};

const TRAINING_FOCUS = [
  "Running Practice",
  "Endurance Training",
  "Speed Development",
  "Strength & Conditioning",
  "Physical Test Preparation",
  "Daily Performance Monitoring",
  "Motivation & Discipline",
];

const WHY_CHOOSE = [
  { icon: Dumbbell, label: "Professional Physical Guidance" },
  { icon: Target, label: "Exam-Oriented Training" },
  { icon: TrendingUp, label: "Strength & Endurance Development" },
  { icon: BarChart3, label: "Regular Performance Evaluation" },
  { icon: Users, label: "Personal Attention" },
  { icon: Flame, label: "Motivational Coaching" },
  { icon: ShieldCheck, label: "Disciplined Training Environment" },
  { icon: RefreshCw, label: "Continuous Improvement" },
];

const ICON_TINTS = [
  "text-signal-strong",
  "text-accent-strong",
  "text-teal",
  "text-pink",
  "text-signal-strong",
  "text-accent-strong",
  "text-teal",
  "text-pink",
];

export default function WhatWeTrain() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <AboutSubNav current="/about/whatwetrain" />
          </div>

          <FadeInUp className="max-w-[62ch]">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              What We Train
            </p>

            <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
              How We{" "}
              <span className="text-gradient-brand">Train Our Students</span>
            </h1>

            <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              Every session at the academy is built around exam-day standards
              — running, endurance, strength, and the discipline it takes to
              keep improving day after day.
            </p>
          </FadeInUp>
        </Container>
      </section>

      {/* Training Philosophy */}
      <section className="py-16 sm:py-24">
        <Container>
          <ScrollFadeUp>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              How We Train
            </p>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.05}>
            <h2 className="font-display mt-4 max-w-[30ch] text-[28px] font-bold sm:text-[36px]">
              Training focuses on overall physical development
            </h2>
          </ScrollFadeUp>

          <StaggerList className="card-flat mt-10 divide-y divide-line overflow-hidden">
            {TRAINING_FOCUS.map((item, i) => (
              <StaggerItem key={item} className="flex items-center gap-5 px-6 py-4">
                <span className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} font-mono text-[12px]`}>
                  Lane {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-[15px] font-medium text-text">{item}</span>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>

      {/* Why Students Choose Ganesh Sir */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <SectionGlow variant={3} />
        <Container>
          <ScrollFadeUp>
            <h2 className="font-display max-w-[24ch] text-[28px] font-bold sm:text-[36px]">
              Why Students Choose{" "}
              <span className="text-gradient-brand">Ganesh Sir</span>
            </h2>
          </ScrollFadeUp>

          <StaggerList className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map(({ icon: Icon, label }, i) => (
              <StaggerItem key={label} variant="scale" hover className="card-flat p-6">
                <Icon size={22} className={ICON_TINTS[i]} />
                <p className="font-body mt-4 text-[14px] font-semibold text-text">{label}</p>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>
    </>
  );
}
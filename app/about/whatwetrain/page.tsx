"use client";

import { motion } from "framer-motion";
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

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const images = {
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(20,184,166,0.10), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.12), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(59,130,246,0.10), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(245,166,35,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(59,130,246,0.10), transparent 55%)",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: images[variant] }}
    />
  );
}

const ABOUT_NAV = [
  { href: "/about", label: "Overview" },
  { href: "/about/founderanddirector", label: "Founder & Director" },
  { href: "/about/ourstory", label: "Our Story" },
  { href: "/about/whatwetrain", label: "What We Train" },
  { href: "/about/facilities", label: "Facilities" },
  { href: "/about/achievements", label: "Achievements" },
];

function AboutSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="About section pages" className="flex flex-wrap gap-2">
      {ABOUT_NAV.map((item) => {
        const active = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active
                ? "pill pill-color-1 font-semibold"
                : "font-body rounded-full border border-line px-3.5 py-1.5 text-[13px] text-text-muted transition-colors hover:border-line-strong hover:text-text"
            }
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

/* =========================================================
   1. Hero
   ========================================================= */
function WhatWeTrainHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <div className="mb-10">
          <AboutSubNav current="/about/whatwetrain" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
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
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Training Philosophy — laid out like track lanes
   ========================================================= */
const TRAINING_FOCUS = [
  "Running Practice",
  "Endurance Training",
  "Speed Development",
  "Strength & Conditioning",
  "Physical Test Preparation",
  "Daily Performance Monitoring",
  "Motivation & Discipline",
];

function TrainingPhilosophy() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          How We Train
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[30ch] text-[28px] font-bold sm:text-[36px]"
        >
          Training focuses on overall physical development
        </motion.h2>

        <div className="card-flat mt-10 divide-y divide-line overflow-hidden">
          {TRAINING_FOCUS.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="flex items-center gap-5 px-6 py-4"
            >
              <span
                className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} font-mono text-[12px]`}
              >
                Lane {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body text-[15px] font-medium text-text">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Why Students Choose Ganesh Sir
   ========================================================= */
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

function WhyChoose() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={3} />
      <Container>
        <motion.h2
          {...fadeUp}
          className="font-display max-w-[24ch] text-[28px] font-bold sm:text-[36px]"
        >
          Why Students Choose{" "}
          <span className="text-gradient-brand">Ganesh Sir</span>
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="card-flat p-6"
            >
              <Icon size={22} className={ICON_TINTS[i]} />
              <p className="font-body mt-4 text-[14px] font-semibold text-text">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function WhatWeTrain() {
  return (
    <>
      <WhatWeTrainHero />
      <TrainingPhilosophy />
      <WhyChoose />
    </>
  );
}
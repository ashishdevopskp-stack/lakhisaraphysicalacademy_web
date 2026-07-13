"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

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
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(34,197,94,0.08), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.10), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(37,99,235,0.08), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(34,197,94,0.09), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(37,99,235,0.08), transparent 55%)",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: images[variant] }}
    />
  );
}

const COURSES_NAV = [
  { href: "/courses", label: "Overview" },
  { href: "/courses/programs", label: "Training Programs" },
  { href: "/courses/schedule", label: "Schedule" },
  { href: "/courses/facilities", label: "Facilities" },
  { href: "/courses/fees-admission", label: "Fees & Admission" },
  { href: "/courses/faq", label: "FAQ" },
];

function CoursesSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Courses section pages" className="flex flex-wrap gap-2">
      {COURSES_NAV.map((item) => {
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
function ProgramsHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <div className="mb-10">
          <CoursesSubNav current="/courses/programs" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Training Programs
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
            A Program for{" "}
            <span className="text-gradient-brand">Every Recruitment Goal</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            From Army and Bihar Police to SSC GD, CISF, CRPF, BSF, Railway,
            and Fireman recruitment — each program is built around the
            physical standards of that exam.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Training Programs
   ========================================================= */
const PROGRAMS = [
  {
    icon: Shield,
    title: "Army Physical Training",
    overview:
      "Complete physical preparation for candidates appearing in Indian Army recruitment.",
    includes: [
      "Running Practice",
      "Push-ups & Strength Training",
      "Endurance Development",
      "Physical Efficiency Test (PET)",
      "Speed Improvement",
      "Stamina Building",
      "Performance Monitoring",
    ],
    suitableFor: "Army Aspirants",
  },
  {
    icon: ShieldAlert,
    title: "Bihar Police Constable Physical Training",
    includes: [
      "Long Distance Running",
      "Sprint Practice",
      "Height & Physical Standards Guidance",
      "PET Preparation",
      "Daily Fitness Assessment",
      "Mock Physical Test",
    ],
    suitableFor: "Bihar Police Constable Aspirants",
  },
  {
    icon: Star,
    title: "Bihar Daroga (SI) Physical Training",
    includes: [
      "Running Practice",
      "Endurance & Stamina Training",
      "Physical Test Preparation",
      "Mock PET",
      "Fitness Evaluation",
      "Performance Improvement",
    ],
    suitableFor: "Sub-Inspector (Daroga) Aspirants",
  },
  {
    icon: ShieldCheck,
    title: "SSC GD Physical Training",
    includes: [
      "Running Sessions",
      "Endurance Training",
      "Speed Development",
      "Physical Test Practice",
      "Agility Exercises",
      "Mock PET",
    ],
    suitableFor: "SSC GD Candidates",
  },
  {
    icon: Shield,
    title: "CISF Physical Training",
    includes: [
      "Running",
      "Physical Fitness",
      "Strength Building",
      "PET Preparation",
      "Endurance Exercises",
    ],
    suitableFor: "CISF Aspirants",
  },
  {
    icon: ShieldCheck,
    title: "CRPF Physical Training",
    includes: [
      "Running Practice",
      "Physical Endurance",
      "Strength Exercises",
      "Mock Physical Tests",
      "Performance Tracking",
    ],
    suitableFor: "CRPF Aspirants",
  },
  {
    icon: ShieldAlert,
    title: "BSF Physical Training",
    includes: [
      "Running",
      "Endurance",
      "Stamina",
      "Speed Development",
      "PET Practice",
    ],
    suitableFor: "BSF Aspirants",
  },
  {
    icon: Flame,
    title: "Fireman Physical Training",
    includes: [
      "Running",
      "Rope Climbing Practice",
      "Endurance Building",
      "Physical Fitness",
      "Mock Physical Test",
    ],
    suitableFor: "Fireman Recruitment Candidates",
  },
  {
    icon: TrainFront,
    title: "Railway Physical Training",
    includes: [
      "Running",
      "Endurance",
      "Strength Exercises",
      "Physical Test Guidance",
    ],
    suitableFor: "Railway Recruitment Aspirants",
  },
  {
    icon: Timer,
    title: "Running & Endurance Special Batch",
    includes: [
      "Long Distance Running",
      "Sprint Sessions",
      "Speed Improvement",
      "Breathing Techniques",
      "Recovery Guidance",
      "Stamina Development",
    ],
    suitableFor: "All Students",
  },
  {
    icon: Dumbbell,
    title: "Physical Fitness Program",
    includes: [
      "Full Body Workout",
      "Strength Training",
      "Core Exercises",
      "Functional Fitness",
      "Flexibility",
      "Weight Management",
    ],
    suitableFor: "Anyone interested in improving physical fitness",
  },
  {
    icon: ClipboardCheck,
    title: "Guest Physical Test Program",
    includes: [
      "Trial Physical Test",
      "Running Assessment",
      "Performance Report",
      "Expert Feedback",
      "Improvement Suggestions",
    ],
    suitableFor: "Students from any district",
    ctaLabel: "Register Now",
  },
];

function TrainingPrograms() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Our Training Programs
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]"
        >
          All programs at a glance
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
              className="card-flat flex flex-col p-6"
            >
              <p.icon size={22} className="text-signal" />
              <h3 className="font-display mt-4 text-[16px] font-semibold text-text">
                {p.title}
              </h3>

              {p.overview && (
                <p className="font-body mt-2 text-[13px] text-text-muted">
                  {p.overview}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.includes.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>

              <p className="font-body mt-4 text-[13px] text-text-muted">
                Suitable for: <span className="text-text">{p.suitableFor}</span>
              </p>

              <div className="mt-5">
                <Button href="/courses/fees-admission#admission" variant="ghost" icon={ArrowRight}>
                  {p.ctaLabel ?? "Join Now"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Performance Evaluation
   ========================================================= */
const EVALUATION_CRITERIA = [
  "Running Speed",
  "Stamina",
  "Endurance",
  "Strength",
  "Physical Fitness",
  "PET Readiness",
  "Overall Progress",
];

function PerformanceEvaluation() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Performance Evaluation
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[36ch] text-[28px] font-bold sm:text-[36px]"
        >
          Every student is regularly assessed on
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {EVALUATION_CRITERIA.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} flex items-center justify-center gap-2 py-3.5 text-center`}
            >
              <BarChart3 size={16} className="shrink-0" />
              <span className="font-body text-[14px] font-medium">{item}</span>
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
export default function Programs() {
  return (
    <>
      <ProgramsHero />
      <TrainingPrograms />
      <PerformanceEvaluation />
    </>
  );
}
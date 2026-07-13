"use client";

import { motion } from "framer-motion";
import { Sunrise, Sunset, CheckCircle2 } from "lucide-react";
import Container from "../../components/Container";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

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
function ScheduleHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <div className="mb-10">
          <CoursesSubNav current="/courses/schedule" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Schedule
          </p>

          <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
            Training Batches{" "}
            <span className="text-gradient-brand">That Fit Your Day</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            Morning and evening batches, built around consistent daily
            practice — because exam-day performance comes from routine, not
            one big push.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Training Schedule
   ========================================================= */
function TrainingSchedule() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Training Schedule
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <motion.div {...fadeUp} className="card-flat p-7">
            <Sunrise size={22} className="text-signal" />
            <p className="font-display mt-4 text-[16px] font-semibold text-text">
              Morning Batch
            </p>
            <p className="font-mono mt-1 text-[15px] text-text-muted">
              05:00 AM &ndash; 08:00 AM
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
            className="card-flat p-7"
          >
            <Sunset size={22} className="text-accent-strong" />
            <p className="font-display mt-4 text-[16px] font-semibold text-text">
              Evening Batch
            </p>
            <p className="font-mono mt-1 text-[15px] text-text-muted">
              04:00 PM &ndash; 07:00 PM
            </p>
          </motion.div>
        </div>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="font-body mt-6 text-[13px] italic text-text-muted"
        >
          Batch timings may change according to season or special training
          sessions.
        </motion.p>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Why Choose Our Training
   ========================================================= */
const WHY_CHOOSE = [
  "Professional Physical Coaching",
  "Daily Running Practice",
  "Exam-Oriented Training",
  "Regular Mock Physical Tests",
  "Performance Monitoring",
  "Motivational Environment",
  "Discipline & Consistency",
  "Personalized Guidance",
];

function WhyChoose() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display max-w-[24ch] text-[28px] font-bold sm:text-[36px]">
          Why Choose Our Training?
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((label, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="card-flat p-6"
            >
              <CheckCircle2 size={20} className="text-accent-strong" />
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
export default function Schedule() {
  return (
    <>
      <ScheduleHero />
      <TrainingSchedule />
      <WhyChoose />
    </>
  );
}
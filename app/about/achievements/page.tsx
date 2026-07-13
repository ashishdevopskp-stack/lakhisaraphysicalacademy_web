"use client";

import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

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
function AchievementsHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <div className="mb-10">
          <AboutSubNav current="/about/achievements" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Achievements
          </p>

          <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
            Student{" "}
            <span className="text-gradient-brand">Success Stories</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            Every selection is proof the training works. Here are some of
            the students who trained at the academy and made it through.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Student Success
   ========================================================= */
const ACHIEVERS = [
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
];

function StudentSuccess() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.div {...fadeUp}>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              Selected Students
            </p>
            <h2 className="font-display mt-4 text-[28px] font-bold sm:text-[36px]">
              Student Success
            </h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <Button href="/students" variant="ghost" icon={Trophy}>
              View All Selected Students
            </Button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {ACHIEVERS.map((a, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-6"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line-strong bg-bg-raised-2 font-mono text-[12px] text-text-muted">
                Photo
              </div>
              <p className="font-body mt-4 text-center text-[15px] font-semibold text-text">
                {a.name}
              </p>
              <p className="font-body text-center text-[13px] text-text-muted">
                {a.post} &middot; {a.exam} &middot; {a.year}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Student Reviews
   ========================================================= */
const REVIEWS = [
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
];

function Reviews() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Student Reviews
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-6"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-body mt-3 text-[14px] leading-relaxed text-text-muted">
                &ldquo;{r.review}&rdquo;
              </p>
              <p className="font-display mt-4 text-[14px] font-semibold text-text">
                {r.name}
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
export default function Achievements() {
  return (
    <>
      <AchievementsHero />
      <StudentSuccess />
      <Reviews />
    </>
  );
}
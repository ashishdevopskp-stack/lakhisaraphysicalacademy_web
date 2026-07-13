"use client";

import { motion } from "framer-motion";
import { Compass, Target, CheckCircle2 } from "lucide-react";
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
function OurStoryHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <div className="mb-10">
          <AboutSubNav current="/about/ourstory" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Our Story
          </p>

          <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
            The Story Behind{" "}
            <span className="text-gradient-brand">Lakhisarai Physical Academy</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            Ganesh Sir established Lakhisarai Physical Academy with the
            vision of providing quality physical training to students who
            aspire to serve the nation. Through structured workouts,
            discipline, and personalized guidance, he has created a
            motivating environment where students can prepare confidently
            for competitive physical tests.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Vision & Mission
   ========================================================= */
const MISSION = [
  "Provide professional physical training.",
  "Build strength, stamina, and endurance.",
  "Prepare students for government recruitment physical tests.",
  "Encourage discipline, dedication, and consistency.",
  "Support every student in reaching their career goals.",
];

function VisionMission() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div {...fadeUp} className="card-flat p-7">
            <div className="flex items-center gap-2 text-signal-strong">
              <Compass size={20} />
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em]">
                Our Vision
              </p>
            </div>
            <p className="font-body mt-4 text-[15.5px] leading-relaxed text-text-muted">
              To become one of the most trusted physical training academies
              in Bihar by empowering students with discipline, fitness, and
              confidence, helping them achieve success in defence, police,
              and other government services.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="card-flat p-7"
          >
            <div className="flex items-center gap-2 text-accent-strong">
              <Target size={20} />
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em]">
                Our Mission
              </p>
            </div>
            <ul className="mt-4 space-y-3">
              {MISSION.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-accent-strong"
                  />
                  <span className="font-body text-[15px] text-text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function OurStory() {
  return (
    <>
      <OurStoryHero />
      <VisionMission />
    </>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Phone,
  MessageCircle,
  ArrowRight,
  Dumbbell,
  CalendarClock,
  Building2,
  Wallet,
  HelpCircle,
  Mail,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

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

/* =========================================================
   Shared sub-navigation across all /courses pages
   ========================================================= */
export const COURSES_NAV = [
  { href: "/courses", label: "Overview" },
  { href: "/courses/programs", label: "Training Programs" },
  { href: "/courses/schedule", label: "Schedule" },
  { href: "/courses/facilities", label: "Facilities" },
  { href: "/courses/fees-admission", label: "Fees & Admission" },
  { href: "/courses/faq", label: "FAQ" },
];

export function CoursesSubNav({ current }: { current: string }) {
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
   1. Hub Hero
   ========================================================= */
function CoursesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Courses &amp; Training Programs
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
            Professional Physical Training for{" "}
            <span className="text-gradient-brand">Defence, Police &amp; Government Recruitment</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            Lakhisarai Physical Academy offers structured physical training
            programs designed to help candidates prepare for various
            government recruitment physical examinations. Our training
            focuses on improving stamina, speed, endurance, strength,
            agility, and overall physical performance.
          </p>

          <div className="mt-8">
            <CoursesSubNav current="/courses" />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/courses/fees-admission#admission" variant="primary" icon={ClipboardList}>
              Apply for Admission
            </Button>
            <Button
              href="https://wa.me/918863081082"
              variant="secondary"
              icon={MessageCircle}
            >
              WhatsApp Enquiry
            </Button>
            <Button href="tel:8863081082" variant="secondary" icon={Phone}>
              Call Now
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Explore Grid — links out to the five subpages
   ========================================================= */
const EXPLORE_CARDS = [
  {
    href: "/courses/programs",
    icon: Dumbbell,
    title: "Training Programs",
    desc: "Army, Police, Daroga, SSC GD, and every other program on offer.",
  },
  {
    href: "/courses/schedule",
    icon: CalendarClock,
    title: "Schedule",
    desc: "Morning and evening batch timings, plus why students choose us.",
  },
  {
    href: "/courses/facilities",
    icon: Building2,
    title: "Facilities",
    desc: "Hostel facility for students coming from nearby districts.",
  },
  {
    href: "/courses/fees-admission",
    icon: Wallet,
    title: "Fees & Admission",
    desc: "How to apply, batch selection, and getting in touch.",
  },
  {
    href: "/courses/faq",
    icon: HelpCircle,
    title: "FAQ",
    desc: "Common questions about courses, hostel, and guest tests.",
  },
];

const ICON_TINTS = [
  "text-signal-strong",
  "text-accent-strong",
  "text-teal",
  "text-pink",
  "text-signal-strong",
];

function ExploreGrid() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Explore
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]"
        >
          Find the right program
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_CARDS.map(({ href, icon: Icon, title, desc }, i) => (
            <motion.a
              key={href}
              href={href}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="card-flat group flex flex-col p-6"
            >
              <Icon size={22} className={ICON_TINTS[i % ICON_TINTS.length]} />
              <h3 className="font-display mt-4 text-[16px] font-semibold text-text">
                {title}
              </h3>
              <p className="font-body mt-2 text-[13.5px] leading-relaxed text-text-muted">
                {desc}
              </p>
              <span className="font-body mt-5 flex items-center gap-1.5 text-[13px] font-medium text-signal-strong">
                Explore
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Contact
   ========================================================= */
function ContactInfo() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Founder &amp; Director
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Contact Ganesh Sir
        </motion.h2>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="card-flat p-5">
            <Phone size={18} className="text-signal" />
            <p className="font-display mt-3 text-[14px] font-semibold text-text">Mobile</p>
            <p className="font-body text-[14px] text-text-muted">8863081082</p>
            <p className="font-body text-[14px] text-text-muted">7739776471</p>
          </div>
          <div className="card-flat p-5">
            <MessageCircle size={18} className="text-signal" />
            <p className="font-display mt-3 text-[14px] font-semibold text-text">WhatsApp</p>
            <p className="font-body text-[14px] text-text-muted">8863081082</p>
            <p className="font-body text-[14px] text-text-muted">7739776471</p>
          </div>
          <div className="card-flat p-5">
            <Mail size={18} className="text-signal" />
            <p className="font-display mt-3 text-[14px] font-semibold text-text">Email</p>
            <p className="font-body break-all text-[14px] text-text-muted">
              ganeshkumar90067@gmail.com
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Courses() {
  return (
    <>
      <CoursesHero />
      <ExploreGrid />
      <ContactInfo />
    </>
  );
}
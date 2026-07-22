"use client";

import { motion } from "framer-motion";
import {
  Megaphone,
  ClipboardList,
  GraduationCap,
  Shield,
  CalendarClock,
  Trophy,
  PartyPopper,
  Building2,
  AlertTriangle,
  FileText,
} from "lucide-react";
import Container from "../../components/Container";


const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const CATEGORIES = [
  { label: "Academy Announcements", icon: Megaphone },
  { label: "Admission Updates", icon: ClipboardList },
  { label: "New Batch Notifications", icon: GraduationCap },
  { label: "Government Job Alerts", icon: Shield },
  { label: "Exam & Admit Card Updates", icon: CalendarClock },
  { label: "Result Announcements", icon: Trophy },
  { label: "Events & Workshops", icon: PartyPopper },
  { label: "Hostel Updates", icon: Building2 },
  { label: "Holiday Notices", icon: AlertTriangle },
  { label: "Important Circulars", icon: FileText },
] as const;

function CategoriesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-14 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(245,166,35,0.16), transparent 70%)",
        }}
      />
      <Container>
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
          Announcements
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[28px] font-bold sm:text-[38px]">
          Notification <span className="text-gradient-brand">Categories</span>
        </h1>
        <div className="mt-8">
          
        </div>
      </Container>
    </section>
  );
}

function CategoriesGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {CATEGORIES.map(({ label, icon: Icon }, i) => (
            <motion.a
              key={label}
              href={`/notifications/updates?category=${encodeURIComponent(label)}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 5) * 0.04 }}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center transition-transform hover:scale-[1.03]"
            >
              <Icon size={20} className="text-signal-strong" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function NotificationCategoriesPage() {
  return (
    <>
      <CategoriesHero />
      <CategoriesGrid />
    </>
  );
}
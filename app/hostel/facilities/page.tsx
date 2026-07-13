"use client";

import { motion } from "framer-motion";
import {
  BedDouble,
  Utensils,
  ShowerHead,
  Droplets,
  BatteryCharging,
  Wifi,
  BookOpen,
  Sparkles,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Container from "../../components/Container";
import { HostelSubNav } from "../page";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

function SectionGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(34,197,94,0.08), transparent 55%)",
      }}
    />
  );
}

const OVERVIEW = [
  "Safe & Secure Environment",
  "Comfortable Rooms",
  "Healthy & Hygienic Food",
  "24×7 Water & Electricity",
  "Clean Washrooms",
  "Peaceful Study Atmosphere",
  "Walking Distance from Academy",
  "Discipline & Regular Monitoring",
];

const FACILITIES = [
  { label: "Furnished Rooms", icon: BedDouble },
  { label: "Mess Facility", icon: Utensils },
  { label: "Clean Bathrooms", icon: ShowerHead },
  { label: "RO Drinking Water", icon: Droplets },
  { label: "Power Backup", icon: BatteryCharging },
  { label: "Wi-Fi (If Available)", icon: Wifi },
  { label: "Self Study Area", icon: BookOpen },
  { label: "Regular Cleaning", icon: Sparkles },
  { label: "Near Training Ground", icon: MapPin },
  { label: "Safe Environment", icon: ShieldCheck },
] as const;

function FacilitiesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-16 sm:pt-24">
      <SectionGlow />
      <Container>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Hostel
          </p>
          <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
            Hostel <span className="text-gradient-brand">Facilities</span>
          </h1>
          <div className="mt-8">
            <HostelSubNav current="/hostel/facilities" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function HostelOverview() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[22px] font-bold sm:text-[28px]">
          At a Glance
        </motion.h2>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 4) * 0.05 }}
              className="card-flat flex items-center gap-3 px-4 py-4"
            >
              <ShieldCheck size={16} className="shrink-0 text-signal" />
              <span className="font-body text-[13px] text-text">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FacilitiesGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[22px] font-bold sm:text-[28px]">
          What's Included
        </motion.h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {FACILITIES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 5) * 0.04 }}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center"
            >
              <Icon size={20} className="text-signal" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function HostelFacilitiesPage() {
  return (
    <>
      <FacilitiesHero />
      <HostelOverview />
      <FacilitiesGrid />
    </>
  );
}
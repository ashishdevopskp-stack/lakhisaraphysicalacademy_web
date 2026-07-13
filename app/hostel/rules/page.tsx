"use client";

import { motion } from "framer-motion";
import { Ban } from "lucide-react";
import Container from "../../components/Container";
import { HostelSubNav } from "../page";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const RULES = [
  "Maintain Discipline",
  "Keep Rooms Clean",
  "Follow Hostel Timings",
  "Respect Fellow Students",
  "No Smoking or Alcohol",
  "Damage to Property is Chargeable",
];

function RulesHero() {
  return (
    <section id="top" className="pb-8 pt-16 sm:pt-24">
      <Container>
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
          Hostel
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
          Hostel <span className="text-gradient-brand">Rules</span>
        </h1>
        <div className="mt-8">
          <HostelSubNav current="/hostel/rules" />
        </div>
      </Container>
    </section>
  );
}

function RulesGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RULES.map((rule, i) => (
            <motion.div
              key={rule}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
              className="card-flat flex items-center gap-3 px-4 py-4"
            >
              <Ban size={16} className="shrink-0 text-accent-strong" />
              <span className="font-body text-[13px] text-text">{rule}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function HostelRulesPage() {
  return (
    <>
      <RulesHero />
      <RulesGrid />
    </>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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

const FAQS = [
  {
    q: "Is hostel available for boys/girls?",
    a: "We offer separate hostel accommodation for boys and girls, each with independent supervision and facilities.",
  },
  {
    q: "Is food included?",
    a: "Yes, mess facility with healthy and hygienic food is available. Food charges are billed separately from the room fee.",
  },
  {
    q: "How far is the hostel from the academy?",
    a: "The hostel is within walking distance of the training ground, so students can reach sessions on time without commuting.",
  },
  {
    q: "Are visitors allowed?",
    a: "Visitors are allowed during designated hours only, in line with hostel discipline and safety rules.",
  },
  {
    q: "What facilities are available?",
    a: "Furnished rooms, mess facility, clean bathrooms, RO drinking water, power backup, self-study area, and regular cleaning.",
  },
];

function FaqHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-16 sm:pt-24">
      <SectionGlow />
      <Container>
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
          Hostel
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
          Frequently Asked <span className="text-gradient-brand">Questions</span>
        </h1>
        <div className="mt-8">
          <HostelSubNav current="/hostel/faq" />
        </div>
      </Container>
    </section>
  );
}

function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <motion.div
          {...fadeUp}
          className="card-flat max-w-[70ch] divide-y divide-line overflow-hidden px-6"
        >
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-[15px] font-medium text-text">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="font-body pb-5 text-[14px] text-text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default function HostelFaqPage() {
  return (
    <>
      <FaqHero />
      <FaqList />
    </>
  );
}
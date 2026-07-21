"use client";

import { motion } from "framer-motion";
import Container from "../../components/Container";

import { GALLERY_GROUPS } from "@/app/lib/events-data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

function GalleryHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(236,72,153,0.12), transparent 70%)",
        }}
      />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Events &amp; Activities
          </p>
          <h1 className="font-display mt-5 max-w-[22ch] text-[32px] font-extrabold leading-[1.1] sm:text-[42px]">
            Event Gallery
          </h1>
          <p className="font-body mt-5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
            Moments from our training camps, award ceremonies, and academy
            celebrations.
          </p>
          <div className="mt-8">
          
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function GalleryGrid() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {GALLERY_GROUPS.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat flex aspect-square flex-col items-center justify-center gap-3 text-center"
            >
              <span className="glass flex h-11 w-11 items-center justify-center rounded-full">
                <Icon size={18} className="text-signal-strong" />
              </span>
              <p className="font-body px-3 text-[13px] font-medium text-text">{label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function EventGalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
    </>
  );
}
"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import Container from "../../components/Container";
import { HostelSubNav } from "../page";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

const GALLERY = [
  "Hostel Rooms",
  "Beds",
  "Mess Area",
  "Washrooms",
  "Study Area",
  "Outside View",
];

function GalleryHero() {
  return (
    <section id="top" className="pb-8 pt-16 sm:pt-24">
      <Container>
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
          Hostel
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
          Hostel <span className="text-gradient-brand">Gallery</span>
        </h1>
        <div className="mt-8">
          <HostelSubNav current="/hostel/gallery" />
        </div>
      </Container>
    </section>
  );
}

function GalleryGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {GALLERY.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 6) * 0.05 }}
              className={`card-flat flex aspect-square flex-col items-center justify-center gap-2 px-3 text-center ${PILL_COLORS[i % PILL_COLORS.length]}`}
            >
              <Building2 size={20} />
              <span className="font-body text-[12px] font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function HostelGalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
    </>
  );
}
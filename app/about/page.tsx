"use client";

import { motion } from "framer-motion";
import { ClipboardList, Phone, MessageCircle } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

function SectionGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(20,184,166,0.10), transparent 55%)",
      }}
    />
  );
}

/* =========================================================
   Shared sub-navigation across all /about pages
   ========================================================= */
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
   Hub Hero
   ========================================================= */
function AboutHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            About Us
          </p>

          <h1 className="font-display mt-5 max-w-[18ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
            About{" "}
            <span className="text-gradient-brand">Lakhisarai Physical Academy</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            From the founder&rsquo;s mission to our training philosophy,
            facilities, and the students who&rsquo;ve made it through —
            here&rsquo;s everything to know about Lakhisarai Physical
            Academy.
          </p>

          <div className="mt-8">
            <AboutSubNav current="/about" />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="tel:8863081082" variant="primary" icon={Phone}>
              Contact Now
            </Button>
            <Button href="#admission" variant="secondary" icon={ClipboardList}>
              Apply for Admission
            </Button>
            <Button
              href="https://wa.me/918863081082"
              variant="whatsapp"
              icon={MessageCircle}
            >
              WhatsApp
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function About() {
  return <AboutHero />;
}
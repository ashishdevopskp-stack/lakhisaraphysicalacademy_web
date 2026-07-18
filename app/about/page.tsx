"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ClipboardList, Phone, MessageCircle } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const PHONE_NUMBER = "918863081082";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'd like to know more about admission at Lakhisarai Physical Academy."
);

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
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---------------- Left: founder photo ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[400px] lg:max-w-none"
          >
            {/* Soft color glow behind the photo */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[28px] opacity-70 blur-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(37,99,235,0.35), rgba(20,184,166,0.30), rgba(34,197,94,0.30))",
              }}
            />

            {/* Hidden SVG def for the organic clip-path, matching the homepage hero */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="aboutBlob" clipPathUnits="objectBoundingBox">
                  <path d="M0.21,0.05 C0.35,-0.04 0.53,0.01 0.68,0.03 C0.83,0.05 0.97,0.12 1,0.28 C1.03,0.44 0.93,0.58 0.87,0.73 C0.81,0.88 0.79,1.03 0.63,1.02 C0.47,1.01 0.36,0.9 0.22,0.85 C0.08,0.8 -0.06,0.76 -0.02,0.6 C0.02,0.44 0.02,0.27 0.09,0.16 C0.13,0.1 0.16,0.08 0.21,0.05 Z" />
                </clipPath>
              </defs>
            </svg>

            <div
              className="group relative aspect-[4/5] w-full"
              style={{
                clipPath: "url(#aboutBlob)",
                filter: "drop-shadow(0 18px 34px rgba(15, 23, 42, 0.22))",
              }}
            >
              <Image
                src="/ganeshsir.png"
                alt="Founder and Director of Lakhisarai Physical Academy"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
              className="card-flat absolute -bottom-5 left-1/2 w-[80%] -translate-x-1/2 px-5 py-3.5 text-center sm:-bottom-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                Founder &amp; Director
              </p>
              <p className="mt-0.5 text-[15px] font-semibold text-text">
                Lakhisarai Physical Academy
              </p>
            </motion.div>
          </motion.div>

          {/* ---------------- Right: copy + CTAs ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
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
              <Button href={`tel:+${PHONE_NUMBER}`} variant="primary" icon={Phone}>
                Contact Now
              </Button>
              <Button href="#admission" variant="secondary" icon={ClipboardList}>
                Apply for Admission
              </Button>
              <Button
                href={`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                variant="whatsapp"
                icon={MessageCircle}
              >
                WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
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
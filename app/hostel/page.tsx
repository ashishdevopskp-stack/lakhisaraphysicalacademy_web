"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, MessageCircle, Phone } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WHATSAPP_NUMBER = "918863081082";
const HOSTEL_ENQUIRY_MESSAGE =
  "Hello Lakhisarai Physical Academy, I would like to apply for hostel accommodation. Please share the details.";
const HOSTEL_WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  HOSTEL_ENQUIRY_MESSAGE
)}`;

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

/* =========================================================
   Shared sub-navigation across all /hostel pages
   ========================================================= */
export const HOSTEL_NAV = [
  { href: "/hostel", label: "Overview" },
  { href: "/hostel/facilities", label: "Facilities" },
  { href: "/hostel/gallery", label: "Gallery" },
  { href: "/hostel/fees", label: "Fees" },
  { href: "/hostel/rules", label: "Rules" },
  { href: "/hostel/faq", label: "FAQ" },
];

export function HostelSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Hostel section pages" className="flex flex-wrap gap-2">
      {HOSTEL_NAV.map((item) => {
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
function HostelHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---------------- Left: hostel photo ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
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

            {/* Hidden SVG def for the organic clip-path, matching the other hero sections */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="hostelBlob" clipPathUnits="objectBoundingBox">
                  <path d="M0.79,0.06 C0.92,0.13 1,0.29 0.99,0.46 C0.98,0.63 0.93,0.79 0.8,0.89 C0.67,0.99 0.49,1.02 0.33,0.97 C0.17,0.92 0.04,0.8 0.01,0.63 C-0.02,0.46 0.05,0.29 0.16,0.16 C0.27,0.03 0.43,-0.06 0.58,-0.03 C0.65,-0.02 0.71,0.02 0.79,0.06 Z" />
                </clipPath>
              </defs>
            </svg>

            <div
              className="group relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]"
              style={{
                clipPath: "url(#hostelBlob)",
                filter: "drop-shadow(0 18px 34px rgba(15, 23, 42, 0.22))",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80"
                alt="Hostel accommodation at Lakhisarai Physical Academy"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 80vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
              className="card-flat absolute -bottom-5 left-1/2 w-[82%] -translate-x-1/2 px-5 py-3.5 text-center sm:-bottom-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                For Outstation Students
              </p>
              <p className="mt-0.5 text-[15px] font-semibold text-text">
                Safe &amp; disciplined stay
              </p>
            </motion.div>
          </motion.div>

          {/* ---------------- Right: copy + CTAs ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              Hostel
            </p>

            <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
              <span className="text-gradient-brand">Hostel Facility</span>
            </h1>

            <p className="font-body mt-5 text-[15.5px] font-medium text-text">
              Safe, comfortable &amp; disciplined accommodation for students.
            </p>

            <p className="font-body mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              Lakhisarai Physical Academy provides a secure and
              student-friendly hostel environment with comfortable
              accommodation, nutritious meals, and easy access to the
              training ground, helping students stay focused on their
              preparation.
            </p>

            <div className="mt-8">
              <HostelSubNav current="/hostel" />
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={HOSTEL_WHATSAPP_HREF} variant="primary" icon={Building2}>
                Apply for Hostel
              </Button>
              <Button
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                variant="secondary"
                icon={MessageCircle}
              >
                WhatsApp Enquiry
              </Button>
              <Button href={`tel:+${WHATSAPP_NUMBER}`} variant="secondary" icon={Phone}>
                Contact Now
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
export default function Hostel() {
  return <HostelHero />;
}
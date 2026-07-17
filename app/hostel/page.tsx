"use client";

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
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
            <Button href="tel:8863081082" variant="secondary" icon={Phone}>
              Contact Now
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
export default function Hostel() {
  return <HostelHero />;
}
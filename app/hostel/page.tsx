// app/hostel/page.tsx

import Image from "next/image";
import { Building2, MessageCircle, Phone } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { PHONE_NUMBER, whatsappHref, telHref } from "../lib/constants";
import { SectionGlow, HostelSubNav } from "./_shared";
import { FadeInUp, ScaleIn } from "./_HostelMotion";

const HOSTEL_ENQUIRY_MESSAGE =
  "Hello Lakhisarai Physical Academy, I would like to apply for hostel accommodation. Please share the details.";

export const metadata = {
  title: "Hostel Facility | Lakhisarai Physical Academy",
  description:
    "Safe, comfortable & disciplined hostel accommodation for students, with meals, water, power backup and easy access to the training ground.",
};

function HostelHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---------------- Left: hostel photo ---------------- */}
          <ScaleIn delay={0.15} className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
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

            <FadeInUp
              y={12}
              duration={0.5}
              delay={0.55}
              className="card-flat absolute -bottom-5 left-1/2 w-[82%] -translate-x-1/2 px-5 py-3.5 text-center sm:-bottom-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                For Outstation Students
              </p>
              <p className="mt-0.5 text-[15px] font-semibold text-text">
                Safe &amp; disciplined stay
              </p>
            </FadeInUp>
          </ScaleIn>

          {/* ---------------- Right: copy + CTAs ---------------- */}
          <FadeInUp>
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
              <Button href={whatsappHref(HOSTEL_ENQUIRY_MESSAGE)} variant="primary" icon={Building2}>
                Apply for Hostel
              </Button>
              <Button href={whatsappHref()} variant="secondary" icon={MessageCircle}>
                WhatsApp Enquiry
              </Button>
              <Button href={telHref(PHONE_NUMBER)} variant="secondary" icon={Phone}>
                Contact Now
              </Button>
            </div>
          </FadeInUp>
        </div>
      </Container>
    </section>
  );
}

export default function Hostel() {
  return <HostelHero />;
}
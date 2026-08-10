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
                  "linear-gradient(135deg, rgba(234,88,12,0.35), rgba(20,184,166,0.30), rgba(19,136,8,0.30))",
              }}
            />

            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
              <Image
                src="/hostelbuilding.jpg"
                alt="Lakhisarai Physical Academy Hostel Building"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 80vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent"
              />
            </div>

            <FadeInUp
              y={12}
              duration={0.5}
              delay={0.55}
              className="absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 px-5 py-3.5 text-center sm:-bottom-6 rounded-2xl bg-slate-950/95 border border-amber-500/40 shadow-2xl shadow-black/80 backdrop-blur-xl z-20"
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400">
                Official Hostel Campus
              </p>
              <p className="mt-0.5 text-[15px] font-extrabold text-white">
                Safe &amp; Disciplined Stay
              </p>
            </FadeInUp>
          </ScaleIn>

          {/* ---------------- Right: copy + CTAs ---------------- */}
          <FadeInUp>
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
              Hostel Campus
            </p>

            <h1 className="font-display mt-4 max-w-[20ch] text-[34px] font-black leading-[1.1] sm:text-[44px] lg:text-[52px] text-slate-900">
              Hostel <span className="text-[#ea580c]">Facility</span>
            </h1>

            <p className="font-body mt-4 text-[15.5px] font-bold text-slate-800">
              Safe, comfortable &amp; disciplined accommodation for outstation candidates.
            </p>

            <p className="font-body mt-3 max-w-[54ch] text-[15.5px] leading-relaxed text-slate-600 font-medium">
              Lakhisarai Physical Academy provides a secure and student-friendly hostel building with comfortable rooms, nutritious mess meals, water &amp; power backup, and quick access to Gandhi Maidan ground.
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
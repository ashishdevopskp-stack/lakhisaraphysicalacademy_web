// app/hostel/page.tsx

import { Building2, MessageCircle, Phone } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { PHONE_NUMBER, whatsappHref, telHref } from "../lib/constants";
import { SectionGlow, HostelSubNav } from "./_shared";
import { FadeInUp, ScaleIn } from "./_HostelMotion";
import { HostelHeroImageShowcase } from "./_HostelHeroImageShowcase";

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
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ---------------- Left: Dual Hostel Photos Showcase ---------------- */}
          <ScaleIn delay={0.15}>
            <HostelHeroImageShowcase />
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
              Lakhisarai Physical Academy provides a secure and student-friendly hostel building with comfortable rooms, individual beds, storage shelves, nutritious mess meals, water &amp; power backup, and quick access to K.R.K Field, Lakhisarai ground.

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
import Image from "next/image";
import { ClipboardList, Phone, MessageCircle } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { SectionGlow, CoursesSubNav } from "./_shared";
import { FadeInUp, ScaleIn } from "./_CoursesMotion";
import { PHONE_NUMBER, whatsappHref, telHref } from "../lib/constants";

export const metadata = {
  title: "Courses & Training Programs | Lakhisarai Physical Academy",
  description:
    "Structured physical training programs for Army, Bihar Police, Daroga, SSC GD, CISF, CRPF, BSF and other government recruitment physical examinations.",
};

export default function Courses() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <FadeInUp>
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              Courses &amp; Training Programs
            </p>

            <h1 className="font-display mt-5 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
              Professional Physical Training for{" "}
              <span className="text-gradient-brand">Defence, Police &amp; Government Recruitment</span>
            </h1>

            <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              Lakhisarai Physical Academy offers structured physical training
              programs designed to help candidates prepare for various
              government recruitment physical examinations. Our training
              focuses on improving stamina, speed, endurance, strength,
              agility, and overall physical performance.
            </p>

            <div className="mt-8">
              <CoursesSubNav current="/courses" />
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#admission" variant="primary" icon={ClipboardList}>
                Apply for Admission
              </Button>
              <Button href={whatsappHref()} variant="secondary" icon={MessageCircle}>
                WhatsApp Enquiry
              </Button>
              <Button href={telHref(PHONE_NUMBER)} variant="secondary" icon={Phone}>
                Call Now
              </Button>
            </div>
          </FadeInUp>

          <ScaleIn delay={0.15} className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[28px] opacity-70 blur-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(37,99,235,0.35), rgba(20,184,166,0.30), rgba(34,197,94,0.30))",
              }}
            />

            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="coursesBlob" clipPathUnits="objectBoundingBox">
                  <path d="M0.79,0.06 C0.92,0.13 1,0.29 0.99,0.46 C0.98,0.63 0.93,0.79 0.8,0.89 C0.67,0.99 0.49,1.02 0.33,0.97 C0.17,0.92 0.04,0.8 0.01,0.63 C-0.02,0.46 0.05,0.29 0.16,0.16 C0.27,0.03 0.43,-0.06 0.58,-0.03 C0.65,-0.02 0.71,0.02 0.79,0.06 Z" />
                </clipPath>
              </defs>
            </svg>

            <div
              className="group relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]"
              style={{
                clipPath: "url(#coursesBlob)",
                filter: "drop-shadow(0 18px 34px rgba(15, 23, 42, 0.22))",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
                alt="Candidates training together at Lakhisarai Physical Academy"
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
              delay={0.55}
              className="card-flat absolute -bottom-5 left-1/2 w-[82%] -translate-x-1/2 px-5 py-3.5 text-center sm:-bottom-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                Structured Programs
              </p>
              <p className="mt-0.5 text-[15px] font-semibold text-text">
                Built around each exam&rsquo;s standards
              </p>
            </FadeInUp>
          </ScaleIn>
        </div>
      </Container>
    </section>
  );
}
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ClipboardList, Phone, MessageCircle, ArrowRight } from "lucide-react";
import Container from "../components/Container";

const EXAMS = ["Army", "Bihar Police", "Daroga", "SSC GD", "CISF", "CRPF", "BSF"];
const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];
const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------------- Left: copy + CTAs ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-start"
          >
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal">
              Lakhisarai Physical Academy
            </p>

            <h1 className="mt-5 max-w-[18ch] text-[34px] sm:text-[44px] lg:text-[56px]">
              The Most Trusted{" "}
              <span className="text-gradient-brand">Physical Training</span>{" "}
              Academy in Lakhisarai
            </h1>

            <p className="mt-6 max-w-[46ch] text-[17px] font-medium text-text">
              Professional physical training for Army, Bihar Police, Daroga,
              SSC GD, CISF, CRPF, BSF and other government recruitment
              physical tests.
            </p>

            <p className="mt-3.5 max-w-[50ch] text-[15px] leading-relaxed text-text-muted">
              We help students clear defence and government physical
              recruitment tests through disciplined training, expert
              guidance, and continuous performance improvement — with
              structured preparation built around each exam&rsquo;s actual
              standards.
            </p>

            <div
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Exams we train for"
            >
              {EXAMS.map((exam, i) => (
                <span
                  key={exam}
                  className={`pill ${PILL_COLORS[i % PILL_COLORS.length]}`}
                >
                  {exam}
                </span>
              ))}
            </div>

            {/* CTAs — solid fills with brand-color glow shadows */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#enroll" className="btn btn-primary">
                <ClipboardList className="h-4 w-4" />
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:+910000000000" className="btn btn-secondary">
                <Phone className="h-4 w-4" />
                Call Us
              </a>
              <a href="https://wa.me/910000000000" className="btn btn-accent">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* ---------------- Right: photo panel ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[480px] lg:max-w-none"
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

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line shadow-[var(--shadow-card-hover)] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1754873361598-254d39b9bdde?auto=format&fit=crop&w=1400&q=80"
                alt="Empty running track at sunrise, ready for the morning training session"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>

            <div className="card-flat absolute -bottom-6 left-1/2 flex w-[86%] -translate-x-1/2 items-center justify-between gap-4 px-5 py-3.5 sm:-bottom-7 sm:w-[80%]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
                  Morning batch
                </p>
                <p className="mt-0.5 text-[15px] font-semibold text-text">
                  Starts 5:30 AM daily
                </p>
              </div>
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
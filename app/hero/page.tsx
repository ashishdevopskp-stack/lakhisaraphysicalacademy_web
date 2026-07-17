"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ClipboardList, Phone, MessageCircle, ArrowRight } from "lucide-react";
import Container from "../components/Container";

const EXAMS = ["Army", "Bihar Police", "Daroga", "SSC GD", "CISF", "CRPF", "BSF"];
const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];
const EASE = [0.22, 0.61, 0.36, 1] as const;

const pillContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.5 },
  },
};

const pillItem = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: EASE } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      {/* Ambient background glow — purely decorative, sits behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-40 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 30% 0%, rgba(37,99,235,0.25), transparent 70%), radial-gradient(50% 50% at 85% 10%, rgba(20,184,166,0.2), transparent 70%)",
        }}
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------------- Left: copy + CTAs ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-start"
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
              className="flex items-center gap-2 font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Lakhisarai Physical Academy
            </motion.p>

            <h1 className="mt-5 max-w-[18ch] text-[34px] leading-[1.1] sm:text-[44px] lg:text-[56px]">
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

            <motion.div
              variants={pillContainer}
              initial="hidden"
              animate="show"
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Exams we train for"
            >
              {EXAMS.map((exam, i) => (
                <motion.span
                  key={exam}
                  variants={pillItem}
                  className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} transition-transform duration-200 hover:-translate-y-0.5`}
                >
                  {exam}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs — solid fills with brand-color glow shadows, all live links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#enroll"
                className="btn btn-primary group transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <ClipboardList className="h-4 w-4" />
                Enroll Now
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+910000000000"
                className="btn btn-secondary transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </motion.div>

            {/* Trust strip — quick reassurance under the CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-text-faint"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Daily 5:30 AM &amp; evening batches
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Hostel available for outstation students
              </span>
            </motion.div>
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

            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line shadow-[var(--shadow-card-hover)] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1754873361598-254d39b9bdde?auto=format&fit=crop&w=1400&q=80"
                alt="Empty running track at sunrise, ready for the morning training session"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Bottom gradient so the floating card always reads clearly against any photo */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
              className="card-flat absolute -bottom-6 left-1/2 flex w-[86%] -translate-x-1/2 items-center justify-between gap-4 px-5 py-3.5 sm:-bottom-7 sm:w-[80%]"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
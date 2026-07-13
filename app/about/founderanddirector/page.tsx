"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Phone,
  MessageCircle,
  Trophy,
  Mail,
  MapPin,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const images = {
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(20,184,166,0.10), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.12), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(59,130,246,0.10), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(245,166,35,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(59,130,246,0.10), transparent 55%)",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: images[variant] }}
    />
  );
}

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
   1. Founder Hero
   ========================================================= */
function FounderHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <div className="mb-10">
          <AboutSubNav current="/about/founderanddirector" />
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              Founder &amp; Director
            </p>

            <h1 className="font-display mt-5 max-w-[16ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
              About{" "}
              <span className="text-gradient-brand">Trainer Ganesh</span>
            </h1>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Roles">
              {["Dedicated Mentor", "Professional Physical Trainer", "Founder & Director"].map(
                (role, i) => (
                  <span key={role} className={`pill ${PILL_COLORS[i % PILL_COLORS.length]}`}>
                    {role}
                  </span>
                )
              )}
            </div>

            <p className="font-body mt-6 max-w-[52ch] text-[15.5px] leading-relaxed text-text-muted">
              Ganesh Sir is the Founder &amp; Director of Lakhisarai Physical
              Academy. With a passion for physical fitness and disciplined
              training, he has been guiding aspiring candidates preparing for
              Army, Bihar Police, Daroga, SSC GD, and other government
              recruitment physical examinations. His goal is to help every
              student improve their physical performance, confidence, and
              overall readiness for selection.
            </p>

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

          {/* Founder portrait frame — liquid glass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative order-first mx-auto aspect-[4/5] w-full max-w-[320px] lg:order-last"
          >
            <div
              aria-hidden
              className="absolute -inset-5 -z-10 rounded-[28px] opacity-70 blur-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(59,130,246,0.34), rgba(20,184,166,0.26), rgba(245,166,35,0.24))",
              }}
            />
            <div className="glass glass-sheen absolute inset-4 flex flex-col items-center justify-center overflow-hidden rounded-[16px] shadow-[var(--shadow-card)]">
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
                Founder Photo
              </span>
              <span className="mt-4 flex h-24 w-24 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-[28px] font-bold text-signal-strong">
                GS
              </span>
              <span className="font-display mt-4 text-[13px] font-medium text-text-muted">
                Ganesh Sir
              </span>
            </div>
            {/* Corner trophy mark */}
            <div className="absolute -bottom-3 -right-3 flex h-14 w-14 items-center justify-center rounded-full border border-signal-strong bg-signal text-on-signal shadow-[0_4px_14px_rgba(37,99,235,0.4)]">
              <Trophy size={22} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Meet Our Founder & Director
   ========================================================= */
function MeetFounder() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div {...fadeUp} className="max-w-[62ch]">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            In His Own Words
          </p>
          <h2 className="font-display mt-4 text-[28px] font-bold sm:text-[36px]">
            Meet Our Founder &amp; Director
          </h2>
          <p className="font-body mt-5 text-[15.5px] leading-relaxed text-text-muted">
            Ganesh Sir established Lakhisarai Physical Academy with the
            vision of providing quality physical training to students who
            aspire to serve the nation. Through structured workouts,
            discipline, and personalized guidance, he has created a
            motivating environment where students can prepare confidently
            for competitive physical tests.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Contact
   ========================================================= */
function ContactSection() {
  const cards = [
    { icon: Phone, label: "Mobile", lines: ["8863081082", "7739776471"] },
    { icon: MessageCircle, label: "WhatsApp", lines: ["8863081082", "7739776471"] },
    { icon: Mail, label: "Email", lines: ["ganeshkumar90067@gmail.com"], breakAll: true },
    {
      icon: MapPin,
      label: "Academy Address",
      lines: [
        "K.R.K. Ground, Near Lakhisarai Railway Station, Nawada Sikandara Road, Lakhisarai, Bihar – 811311",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={3} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          Founder &amp; Director
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Contact Ganesh Sir
        </motion.h2>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map(({ icon: Icon, label, lines, breakAll }) => (
            <div key={label} className="card-flat p-5">
              <Icon size={18} className="text-signal-strong" />
              <p className="font-display mt-3 text-[14px] font-semibold text-text">
                {label}
              </p>
              {lines.map((line) => (
                <p
                  key={line}
                  className={`font-body text-[14px] text-text-muted ${breakAll ? "break-all" : ""}`}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function FounderAndDirector() {
  return (
    <>
      <FounderHero />
      <MeetFounder />
      <ContactSection />
    </>
  );
}
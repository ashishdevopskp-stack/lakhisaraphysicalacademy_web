"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ClipboardList, Phone, MessageCircle, ArrowRight } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

const EXAMS = ["Army", "Bihar Police", "Daroga", "SSC GD", "CISF", "CRPF", "BSF"];
const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ---------------- Left: copy + CTAs ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal">
              Lakhisarai Physical Academy
            </p>

            <h1 className="mt-5 max-w-[15ch] text-[34px] sm:text-[44px] lg:text-[56px]">
              The Most Trusted Physical Training Academy in Lakhisarai
            </h1>

            <p className="mt-6 max-w-[46ch] text-[17px] font-medium text-text">
              Professional physical training for Army, Bihar Police, Daroga,
              SSC GD, CISF, CRPF, BSF and other government recruitment
              physical tests.
            </p>

            <p className="mt-3.5 max-w-[50ch] text-[15px] text-text-muted">
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
              {EXAMS.map((exam) => (
                <Badge key={exam}>{exam}</Badge>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#admission" variant="primary" icon={ClipboardList}>
                Apply Online
              </Button>
              <Button href="tel:8863081082" variant="secondary" icon={Phone}>
                Call Now
              </Button>
              <Button
                href="https://wa.me/918863081082"
                variant="secondary"
                icon={MessageCircle}
              >
                WhatsApp
              </Button>
              <Button href="#admission" variant="ghost" icon={ArrowRight}>
                Join Today
              </Button>
            </div>
          </motion.div>

          {/* ---------------- Right: signature visual ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative order-first mx-auto aspect-square w-full max-w-[360px] lg:order-last lg:max-w-none"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 rounded-full border border-line"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, var(--color-bg-raised) 0%, var(--color-bg) 72%)",
              }}
            />
            <StopwatchDial />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Signature element: a stopwatch dial marked out like a
   400m track (lane ring + minute ticks), with a sweep hand
   that completes one rotation per minute — the exact
   instrument that decides pass or fail on every physical
   test these students train for.
   ========================================================= */
function StopwatchDial() {
  const shouldReduceMotion = useReducedMotion();
  const minorTicks = Array.from({ length: 60 });

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Stopwatch, representing timed physical tests"
      className="relative h-full w-full"
    >
      {/* Crown */}
      <rect x="184" y="18" width="32" height="26" rx="3" fill="var(--color-line-strong)" />
      <rect
        x="170"
        y="6"
        width="60"
        height="16"
        rx="3"
        fill="var(--color-bg-raised-2)"
        stroke="var(--color-line-strong)"
      />

      {/* Outer case */}
      <circle
        cx="200"
        cy="216"
        r="178"
        fill="var(--color-bg-raised)"
        stroke="var(--color-line-strong)"
        strokeWidth="2"
      />
      {/* Lane ring, like a track marking */}
      <circle
        cx="200"
        cy="216"
        r="156"
        fill="none"
        stroke="var(--color-olive)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {/* Face */}
      <circle
        cx="200"
        cy="216"
        r="140"
        fill="var(--color-bg)"
        stroke="var(--color-line)"
        strokeWidth="1"
      />

      {/* Minute ticks */}
      {minorTicks.map((_, i) => {
        const angle = (i / 60) * 360;
        const isMajor = i % 5 === 0;
        return (
          <line
            key={i}
            x1="200"
            y1="86"
            x2="200"
            y2={isMajor ? "98" : "94"}
            stroke={isMajor ? "var(--color-text-muted)" : "var(--color-line-strong)"}
            strokeWidth={isMajor ? 2 : 1}
            transform={`rotate(${angle} 200 216)`}
          />
        );
      })}

      {/* Numerals at 12 / 3 / 6 / 9 */}
      <text x="200" y="126" textAnchor="middle" className="fill-text-muted font-mono text-[15px]">
        60
      </text>
      <text x="326" y="222" textAnchor="middle" className="fill-text-muted font-mono text-[15px]">
        15
      </text>
      <text x="200" y="322" textAnchor="middle" className="fill-text-muted font-mono text-[15px]">
        30
      </text>
      <text x="74" y="222" textAnchor="middle" className="fill-text-muted font-mono text-[15px]">
        45
      </text>

      {/* Center hub + sweep hand */}
      <motion.g
        style={{ transformOrigin: "200px 216px" }}
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 60, ease: "linear", repeat: Infinity }
        }
      >
        <line
          x1="200"
          y1="216"
          x2="200"
          y2="108"
          stroke="var(--color-signal)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.g>
      <circle cx="200" cy="216" r="7" fill="var(--color-signal)" />
      <circle cx="200" cy="216" r="2.5" fill="var(--color-on-signal)" />
    </svg>
  );
}
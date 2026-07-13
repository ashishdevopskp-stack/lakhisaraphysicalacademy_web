"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Clock,
  ClipboardList,
  MessageCircle,
  Timer,
  Users,
  Tag,
  ChevronRight,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Events from "../page";
import { EVENTS, WHATSAPP_NUMBER } from "@/app/lib/events-data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

/* =========================================================
   1. Hero
   ========================================================= */
function UpcomingHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(59,130,246,0.16), transparent 70%)",
        }}
      />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Events &amp; Activities
          </p>
          <h1 className="font-display mt-5 max-w-[22ch] text-[32px] font-extrabold leading-[1.1] sm:text-[42px]">
            Upcoming Events
          </h1>
          <p className="font-body mt-5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
            Open training camps, workshops, and guest tests with registration
            currently open. Reserve your seat before the last date.
          </p>
          <div className="mt-8">
            <Events />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Next-up banner
   ========================================================= */
function NextUpBanner() {
  const nextEvent = useMemo(() => {
    const now = new Date();
    return (
      EVENTS.filter((e) => e.date.getTime() >= now.getTime()).sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      )[0] ?? null
    );
  }, []);

  if (!nextEvent) return null;

  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.max(
    0,
    Math.ceil((nextEvent.date.getTime() - now.getTime()) / msPerDay)
  );

  const registerHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I want to register for "${nextEvent.title}" on ${nextEvent.dateLabel}.`
  )}`;
  const enquiryHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I have a question about "${nextEvent.title}".`
  )}`;

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <motion.div
          {...fadeUp}
          className="glass glass-sheen sheen-run relative overflow-hidden rounded-2xl p-7 shadow-[var(--shadow-card)] sm:p-10"
        >
          <span className="ribbon-bar absolute inset-x-0 top-0 h-[4px]" aria-hidden />

          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Next Up
          </p>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display max-w-[26ch] text-[24px] font-bold sm:text-[30px]">
                {nextEvent.title}
              </h2>
              <p className="font-body mt-2 max-w-[50ch] text-[14px] text-text-muted">
                {nextEvent.subtitle}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={15} className="text-signal-strong" />
                  {nextEvent.dateLabel}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-signal-strong" />
                  {nextEvent.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-signal-strong" />
                  {nextEvent.venue}
                </span>
              </div>
            </div>

            <div className="glass flex shrink-0 items-center gap-4 rounded-xl px-5 py-4">
              <Timer size={20} className="text-signal-strong" />
              <div>
                <p className="text-[22px] font-semibold leading-none text-text">
                  {daysLeft}
                </p>
                <p className="mt-1 text-[12px] text-text-muted">
                  {daysLeft === 1 ? "day to go" : "days to go"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href={registerHref} variant="primary" icon={ClipboardList}>
              Register Now
            </Button>
            <Button href={enquiryHref} variant="whatsapp" icon={MessageCircle}>
              WhatsApp Enquiry
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Open events list
   ========================================================= */
function OpenEventsList() {
  const upcoming = useMemo(() => {
    const now = new Date();
    return EVENTS.filter((e) => e.date.getTime() >= now.getTime()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, []);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[26px] font-bold sm:text-[32px]">
          All Upcoming Events
        </motion.h2>

        <div className="mt-8 flex flex-col gap-4">
          {upcoming.map((event, i) => {
            const registerHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hello, I want to register for "${event.title}" on ${event.dateLabel}.`
            )}`;
            return (
              <motion.div
                key={event.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="card-flat flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                      event.status === "Open"
                        ? "border-transparent bg-signal-dim text-signal-strong"
                        : "border-line-strong bg-bg-raised-2 text-text-faint"
                    }`}
                  >
                    {event.status === "Open" ? "Registration Open" : "Registration Closed"}
                  </span>
                  <h3 className="font-display mt-2 text-[17px] font-semibold text-text">
                    {event.title}
                  </h3>
                  <p className="font-body mt-1 text-[13px] text-text-muted">
                    {event.subtitle}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={13} className="text-signal-strong" />
                      {event.dateLabel}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-signal-strong" />
                      {event.time}
                    </span>
                    {event.seats && (
                      <span className="flex items-center gap-1.5">
                        <Users size={13} className="text-signal-strong" />
                        {event.seats}
                      </span>
                    )}
                    {event.lastRegistration && (
                      <span className="flex items-center gap-1.5">
                        <Tag size={13} className="text-signal-strong" />
                        Last date: {event.lastRegistration}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                  {event.status === "Open" && (
                    <Button href={registerHref} variant="primary" icon={ClipboardList}>
                      Register
                    </Button>
                  )}
                  <a
                    href={`/events/categories`}
                    className="flex items-center gap-1 text-[13px] font-medium text-signal-strong"
                  >
                    Details <ChevronRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default function UpcomingEvents() {
  return (
    <>
      <UpcomingHero />
      <NextUpBanner />
      <OpenEventsList />
    </>
  );
}
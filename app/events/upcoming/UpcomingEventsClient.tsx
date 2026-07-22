"use client";

import { useMemo } from "react";
import {
  CalendarDays,
  Clock,
  ClipboardList,
  Users,
  Tag,
  ChevronRight,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { whatsappHref } from "@/app/lib/constants";
import { type EventItem } from "@/app/lib/events-data";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_EventsMotion";
import { EventsSubNav, UpcomingEventBanner } from "../_shared";

interface EventsProps {
  events: EventItem[];
}

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
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Events &amp; Activities
          </p>
          <h1 className="font-display mt-5 max-w-[22ch] text-[32px] font-extrabold leading-[1.1] sm:text-[42px]">
            Upcoming Events
          </h1>
          <p className="font-body mt-5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
            Open training camps, workshops, and guest tests with registration currently open.
            Reserve your seat before the last date.
          </p>
          <div className="mt-8">
            <EventsSubNav />
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Next-up banner
   ========================================================= */
function NextUpBanner({ events }: EventsProps) {
  const nextEvent = useMemo(() => {
    const now = new Date();
    return (
      events.filter((e) => e.date.getTime() >= now.getTime()).sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      )[0] ?? null
    );
  }, [events]);

  if (!nextEvent) return null;

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <ScrollFadeUp>
          <UpcomingEventBanner event={nextEvent} />
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Open events list
   ========================================================= */
function OpenEventsList({ events }: EventsProps) {
  const upcoming = useMemo(() => {
    const now = new Date();
    return events.filter((e) => e.date.getTime() >= now.getTime()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [events]);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[26px] font-bold sm:text-[32px]">
          All Upcoming Events
        </ScrollFadeUp>

        <StaggerList className="mt-8 flex flex-col gap-4">
          {upcoming.map((event) => {
            const registerHref = whatsappHref(
              `Hello, I want to register for "${event.title}" on ${event.dateLabel}.`
            );
            return (
              <StaggerItem
                key={event.id}
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
                  <p className="font-body mt-1 text-[13px] text-text-muted">{event.subtitle}</p>
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
                    href="/events/categories"
                    className="flex items-center gap-1 text-[13px] font-medium text-signal-strong"
                  >
                    Details <ChevronRight size={14} />
                  </a>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Container>
    </section>
  );
}

export default function UpcomingEventsClient({ events }: EventsProps) {
  return (
    <>
      <UpcomingHero />
      <NextUpBanner events={events} />
      <OpenEventsList events={events} />
    </>
  );
}
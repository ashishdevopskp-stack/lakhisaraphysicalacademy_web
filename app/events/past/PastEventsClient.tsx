"use client";

import { useMemo } from "react";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import Container from "../../components/Container";
import { CATEGORY_ICONS, type EventItem } from "@/app/lib/events-data";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_EventsMotion";
import { EventsSubNav } from "../_shared";

interface EventsProps {
  events: EventItem[];
}

function PastHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(148,163,184,0.14), transparent 70%)",
        }}
      />
      <Container>
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Events &amp; Activities
          </p>
          <h1 className="font-display mt-5 max-w-[22ch] text-[32px] font-extrabold leading-[1.1] sm:text-[42px]">
            Past Events Archive
          </h1>
          <p className="font-body mt-5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
            A record of completed camps, challenges, and celebrations at Lakhisarai Physical
            Academy.
          </p>
          <div className="mt-8">
            <EventsSubNav />
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

function PastTimeline({ events }: EventsProps) {
  const past = useMemo(() => {
    const now = new Date();
    return events.filter((e) => e.date.getTime() < now.getTime()).sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
  }, [events]);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <StaggerList className="relative flex flex-col gap-5 border-l border-line pl-6 sm:pl-8">
          {past.map((event) => {
            const Icon = CATEGORY_ICONS[event.category];
            return (
              <StaggerItem key={event.id} className="card-flat relative p-5">
                <span
                  aria-hidden
                  className="glass absolute -left-[34px] top-5 flex h-7 w-7 items-center justify-center rounded-full sm:-left-[42px]"
                >
                  <Icon size={13} className="text-signal-strong" />
                </span>

                <span className="rounded-full border border-line-strong bg-bg-raised-2 px-2.5 py-0.5 text-[11px] font-medium text-text-faint">
                  {event.category}
                </span>

                <h3 className="font-display mt-2.5 text-[16px] font-semibold text-text">
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
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-signal-strong" />
                    {event.venue}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Container>
    </section>
  );
}

export default function PastEventsClient({ events }: EventsProps) {
  return (
    <>
      <PastHero />
      <PastTimeline events={events} />
    </>
  );
}
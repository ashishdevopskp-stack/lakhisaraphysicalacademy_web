"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ClipboardList,
  MessageCircle,
  Play,
  Video as Youtube,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { whatsappHref } from "@/app/lib/constants";
import {
  CATEGORIES,
  MONTHS,
  type Category,
  type EventItem,
  type GalleryTile,
} from "../lib/events-data";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "./_EventsMotion";
import { CategoryPills, SearchFilter, EventCard, UpcomingEventBanner, type Timeframe } from "./_shared";

/* =========================================================
   1. Hero
   ========================================================= */
function EventsHero() {
  const href = whatsappHref(
    "Hello Lakhisarai Physical Academy, I'd like to know about upcoming events."
  );

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
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
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Events &amp; Activities
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[32px] font-bold sm:text-[42px] lg:text-[50px]">
            Training Camps, Competitions &amp; Special Academy Events
          </h1>

          <p className="font-body mt-5 text-[15px] font-medium text-text">
            Explore our training camps, competitions, workshops, and special academy events.
          </p>

          <p className="font-body mt-4 text-[15px] leading-relaxed text-text-muted">
            Stay updated with all upcoming and past events at Lakhisarai Physical Academy,
            including physical test camps, workshops, seminars, fitness challenges,
            recruitment awareness programs, and student achievement celebrations.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#upcoming" variant="primary" icon={CalendarDays}>
              Upcoming Events
            </Button>
            <Button href="#events" variant="secondary" icon={ClipboardList}>
              Register Now
            </Button>
            <Button href={href} variant="whatsapp" icon={MessageCircle}>
              WhatsApp Enquiry
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Event Categories
   ========================================================= */
function EventCategories({
  active,
  onSelect,
}: {
  active: Category | "All";
  onSelect: (c: Category | "All") => void;
}) {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[24px] font-bold sm:text-[28px]">
          Event Categories
        </ScrollFadeUp>
        <ScrollFadeUp as="p" delay={0.05} className="font-body mt-2 text-[14px] text-text-muted">
          Tap a category to filter events below.
        </ScrollFadeUp>

        <ScrollFadeUp delay={0.08} className="mt-6">
          <CategoryPills active={active} onSelect={onSelect} />
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Upcoming Event Banner
   ========================================================= */
function UpcomingBannerSection({ event }: { event: EventItem | null }) {
  if (!event) return null;
  return (
    <section id="upcoming" className="py-16 sm:py-20">
      <Container>
        <ScrollFadeUp>
          <UpcomingEventBanner event={event} />
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Events Grid Section
   ========================================================= */
function EventsGrid({
  events,
  category,
  onCategory,
}: {
  events: EventItem[];
  category: Category | "All";
  onCategory: (c: Category | "All") => void;
}) {
  const [timeframe, setTimeframe] = useState<Timeframe>("Upcoming");
  const [month, setMonth] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const now = new Date();
    return events
      .filter((e) => {
        const isUpcoming = e.date.getTime() >= now.getTime();
        if (timeframe === "Upcoming" && !isUpcoming) return false;
        if (timeframe === "Past" && isUpcoming) return false;
        if (category !== "All" && e.category !== category) return false;
        if (month !== "All" && MONTHS[e.date.getMonth()] !== month) return false;
        if (
          query.trim() &&
          !`${e.title} ${e.subtitle} ${e.category}`.toLowerCase().includes(query.trim().toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) =>
        timeframe === "Upcoming"
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime()
      );
  }, [events, timeframe, month, query, category]);

  return (
    <section id="events" className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <ScrollFadeUp>
            <h2 className="font-display text-[28px] font-bold sm:text-[34px]">All Events</h2>
            <p className="font-body mt-2 max-w-[55ch] text-[14px] text-text-muted">
              Browse upcoming and past academy events. Filter by category, month, or search by
              name.
            </p>
          </ScrollFadeUp>

          {category !== "All" && (
            <button
              type="button"
              onClick={() => onCategory("All")}
              className="text-[13px] font-medium text-signal-strong"
            >
              Clear category filter
            </button>
          )}
        </div>

        <ScrollFadeUp delay={0.06} className="mt-7">
          <SearchFilter
            timeframe={timeframe}
            onTimeframe={setTimeframe}
            month={month}
            onMonth={setMonth}
            query={query}
            onQuery={setQuery}
          />
        </ScrollFadeUp>

        {filtered.length === 0 ? (
          <ScrollFadeUp as="p" className="font-body mt-14 text-center text-[14px] text-text-muted">
            No events match your filters right now. Try a different category or month.
          </ScrollFadeUp>
        ) : (
          <StaggerList className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <StaggerItem key={event.id}>
                <EventCard event={event} />
              </StaggerItem>
            ))}
          </StaggerList>
        )}
      </Container>
    </section>
  );
}

/* =========================================================
   5. Event Gallery
   ========================================================= */
function EventGallery({ gallery }: { gallery: GalleryTile[] }) {
  if (gallery.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[28px] font-bold sm:text-[34px]">
          Event Gallery
        </ScrollFadeUp>
        <ScrollFadeUp as="p" delay={0.05} className="font-body mt-3 max-w-[60ch] text-[15px] text-text-muted">
          Moments from our training camps, award ceremonies, and academy celebrations.
        </ScrollFadeUp>

        <StaggerList className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {gallery.map((tile) => (
            <StaggerItem key={tile.id} className="card-flat group relative aspect-square overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.imageUrl}
                alt={tile.label}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="font-body text-[12px] font-medium text-white">{tile.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   6. Event Videos
   ========================================================= */
function EventVideos({ events }: { events: EventItem[] }) {
  const videos = events
    .filter((e): e is EventItem & { youtube: string } => Boolean(e.youtube))
    .map((e) => ({ title: e.title, href: e.youtube }));

  if (videos.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp as="h2" className="font-display text-[28px] font-bold sm:text-[34px]">
          Event Videos
        </ScrollFadeUp>
        <ScrollFadeUp as="p" delay={0.05} className="font-body mt-3 max-w-[60ch] text-[15px] text-text-muted">
          Watch highlights from our camps and celebrations on YouTube.
        </ScrollFadeUp>

        <StaggerList className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {videos.map((video) => (
            <StaggerItem
              key={video.href}
              as="a"
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-flat group overflow-hidden"
            >
              <div
                className="relative flex h-36 items-center justify-center border-b border-line"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 75%)",
                }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-signal text-on-signal shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-transform duration-300 group-hover:scale-110">
                  <Play size={16} fill="currentColor" />
                </span>
              </div>
              <div className="flex items-center gap-2 p-4">
                <Youtube size={16} className="shrink-0 text-signal-strong" />
                <p className="font-body text-[13px] font-medium text-text">{video.title}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export — receives real Supabase data as props
   from the server component (page.tsx) that fetches it.
   ========================================================= */
export default function EventsClient({
  events,
  gallery,
}: {
  events: EventItem[];
  gallery: GalleryTile[];
}) {
  const [category, setCategory] = useState<Category | "All">("All");

  const nextEvent = useMemo(() => {
    const now = new Date();
    return (
      events.filter((e) => e.date.getTime() >= now.getTime()).sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      )[0] ?? null
    );
  }, [events]);

  return (
    <>
      <EventsHero />
      <EventCategories active={category} onSelect={setCategory} />
      <UpcomingBannerSection event={nextEvent} />
      <EventsGrid events={events} category={category} onCategory={setCategory} />
      <EventGallery gallery={gallery} />
      <EventVideos events={events} />
    </>
  );
}
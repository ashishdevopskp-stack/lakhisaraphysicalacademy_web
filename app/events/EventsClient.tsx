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
    <section id="top" className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 bg-gradient-to-b from-orange-50/80 via-[#faf7f0] to-white border-b border-orange-200/60">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(234,88,12,0.15), transparent 70%)",
        }}
      />
      <Container>
        <FadeInUp className="max-w-[70ch]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-300 text-xs font-black text-orange-800 shadow-2xs mb-4">
            <span>🇮🇳 JAI HIND · ACADEMY EVENTS &amp; ACTIVITIES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Training Camps, Competitions &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600">Special Academy Events</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
            Stay updated with physical test camps, 1600m trials, workshops, seminars, and student felicitation ceremonies at Lakhisarai Physical Academy.
          </p>

          {/* Quick Stat Highlights */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-white border border-orange-200 shadow-2xs flex items-center gap-2.5">
              <span className="text-lg">🏃</span>
              <div>
                <p className="text-xs font-black text-slate-900">Weekly 1600m Trials</p>
                <p className="text-[10px] font-semibold text-slate-500">Every Sunday Morning</p>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-2xs flex items-center gap-2.5">
              <span className="text-lg">🏆</span>
              <div>
                <p className="text-xs font-black text-slate-900">100+ Events Held</p>
                <p className="text-[10px] font-semibold text-slate-500">Camps &amp; Competitions</p>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-emerald-200 shadow-2xs flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <span className="text-lg">🏅</span>
              <div>
                <p className="text-xs font-black text-slate-900">Selection Honors</p>
                <p className="text-[10px] font-semibold text-slate-500">Felicitation Days</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
          <ScrollFadeUp className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-orange-50/80 via-white to-amber-50/60 border-2 border-orange-200 text-center shadow-lg max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black flex items-center justify-center mx-auto shadow-md mb-4">
              <CalendarDays size={32} />
            </div>
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-black uppercase">
              Event Schedule Update
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-3">
              No Events Match Your Filter
            </h3>
            <p className="text-sm font-medium text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
              We hold weekly 1600m Sunday Time Trials and physical test camps at K.R.K Field Lakhisarai. Try resetting your search or filter.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setTimeframe("Upcoming");
                  setMonth("All");
                  setQuery("");
                  onCategory("All");
                }}
                className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-md transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
              <a
                href={whatsappHref("Jai Hind! When is the next 1600m Sunday Trial / Event at Lakhisarai Physical Academy?")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5"
              >
                <MessageCircle size={14} />
                <span>Ask Next Event Date</span>
              </a>
            </div>
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
   6. Event Videos - Cinema YouTube Showcase
   ========================================================= */
function getYouTubeThumbnail(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function EventVideos({ events }: { events: EventItem[] }) {
  const dynamicVideos = events
    .filter((e): e is EventItem & { youtube: string } => Boolean(e.youtube))
    .map((e) => ({
      title: e.title,
      href: e.youtube,
      category: e.category,
      duration: "HD Video",
    }));

  const allVideos = dynamicVideos;

  if (allVideos.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-orange-50/70 via-[#faf7f0] to-white text-slate-900 border-t border-b border-orange-200/60 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-500/10 blur-[120px] pointer-events-none rounded-full" />

      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <ScrollFadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-black uppercase tracking-wider mb-3 shadow-2xs">
              <Youtube size={15} className="text-red-600" />
              <span>Video Highlights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Watch Academy <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-amber-600">Event Videos</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl font-medium">
              Watch live action from 1600m running trials, high jump technique sessions, and student celebrations on YouTube.
            </p>
          </ScrollFadeUp>

          <ScrollFadeUp delay={0.1}>
            <a
              href="https://www.youtube.com/@lakhisaraphysicalacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-lg shadow-red-600/25 hover:scale-105 transition-all"
            >
              <Youtube size={16} />
              <span>Subscribe on YouTube</span>
            </a>
          </ScrollFadeUp>
        </div>

        <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allVideos.map((video, idx) => {
            const thumb = getYouTubeThumbnail(video.href);
            return (
              <StaggerItem key={idx}>
                <a
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col rounded-3xl bg-white border-2 border-slate-200/90 hover:border-red-500 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  {/* Thumbnail / Video Screen Banner */}
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-red-950/40 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center mb-2">
                          <Youtube size={32} />
                        </div>
                        <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider">
                          Lakhisarai Physical Academy
                        </span>
                      </div>
                    )}

                    {/* Dark Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Red Play Pulse Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/50 group-hover:scale-115 group-hover:bg-red-500 transition-all duration-300">
                        <Play size={22} className="fill-white translate-x-0.5" />
                      </div>
                    </div>

                    {/* Top Category Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[10px] font-black text-amber-300 uppercase tracking-wider">
                      {video.category}
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                      {video.title}
                    </h3>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-red-600">
                      <span className="flex items-center gap-1.5">
                        <Youtube size={14} className="text-red-600" />
                        <span>Watch Video</span>
                      </span>
                      <span className="text-slate-400 group-hover:text-red-600">↗</span>
                    </div>
                  </div>
                </a>
              </StaggerItem>
            );
          })}
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

      <UpcomingBannerSection event={nextEvent} />
      <EventsGrid events={events} category={category} onCategory={setCategory} />
      <EventGallery gallery={gallery} />
      <EventVideos events={events} />
    </>
  );
}
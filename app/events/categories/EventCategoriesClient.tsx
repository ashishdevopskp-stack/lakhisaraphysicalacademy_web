"use client";

import { useMemo, useState } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";
import { MONTHS, type Category, type EventItem } from "@/app/lib/events-data";
import Container from "../../components/Container";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_EventsMotion";
import { EventsSubNav, CategoryPills, SearchFilter, EventCard, type Timeframe } from "../_shared";

/* =========================================================
   1. Hero
   ========================================================= */
function CategoriesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(20,184,166,0.14), transparent 70%)",
        }}
      />
      <Container>
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Events &amp; Activities
          </p>
          <h1 className="font-display mt-5 max-w-[22ch] text-[32px] font-extrabold leading-[1.1] sm:text-[42px]">
            Browse by Category
          </h1>
          <p className="font-body mt-5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
            Filter every camp, workshop, and ceremony by type, month, or keyword to find exactly
            what you're looking for.
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
   2. Filtered grid
   ========================================================= */
function FilteredGrid({
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
    <section className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <ScrollFadeUp as="h2" className="font-display text-[26px] font-bold sm:text-[32px]">
            Results
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
                href="https://wa.me/917739776471?text=Jai%20Hind!%20When%20is%20the%20next%201600m%20Sunday%20Trial%20/%20Event%20at%20Lakhisarai%20Physical%20Academy%3F"
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

interface EventCategoriesClientProps {
  events: EventItem[];
}

export default function EventCategoriesClient({ events }: EventCategoriesClientProps) {
  const [category, setCategory] = useState<Category | "All">("All");
  return (
    <>
      <CategoriesHero />
      <section className="py-8">
        <Container>
          <ScrollFadeUp>
            <CategoryPills active={category} onSelect={setCategory} />
          </ScrollFadeUp>
        </Container>
      </section>
      <FilteredGrid events={events} category={category} onCategory={setCategory} />
    </>
  );
}
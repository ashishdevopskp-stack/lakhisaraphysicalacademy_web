"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Clock,
  Tag,
  Users,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  Search,
  Navigation,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import EventsSubNav from "../page";
import {
  CATEGORY_ICONS,
  CATEGORIES,
  MONTHS,
  WHATSAPP_NUMBER,
  type Category,
  type EventItem,
} from "@/app/lib/events-data";

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
            Browse by Category
          </h1>
          <p className="font-body mt-5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
            Filter every camp, workshop, and ceremony by type, month, or
            keyword to find exactly what you're looking for.
          </p>
          <div className="mt-8">
            <EventsSubNav />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Category pills
   ========================================================= */
function CategoryPills({
  active,
  onSelect,
}: {
  active: Category | "All";
  onSelect: (c: Category | "All") => void;
}) {
  return (
    <section className="py-8">
      <Container>
        <motion.div {...fadeUp} className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelect(cat)}
                className={`pill ${isActive ? "pill-active" : ""}`}
              >
                {cat === "All" ? "All Events" : cat}
              </button>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Search & filter bar
   ========================================================= */
type Timeframe = "Upcoming" | "Past";

function SearchFilter({
  timeframe,
  onTimeframe,
  month,
  onMonth,
  query,
  onQuery,
}: {
  timeframe: Timeframe;
  onTimeframe: (t: Timeframe) => void;
  month: string;
  onMonth: (m: string) => void;
  query: string;
  onQuery: (q: string) => void;
}) {
  const fieldClasses = "glass rounded-lg px-3.5 py-2.5 text-[13px] text-text outline-none";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="glass flex rounded-lg p-1">
        {(["Upcoming", "Past"] as Timeframe[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTimeframe(t)}
            className={`rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              timeframe === t ? "bg-signal text-on-signal" : "text-text-muted hover:text-text"
            }`}
          >
            {t} Events
          </button>
        ))}
      </div>

      <select className={fieldClasses} value={month} onChange={(e) => onMonth(e.target.value)}>
        <option value="All">All Months</option>
        {MONTHS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <div className="relative">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search events..."
          className="glass w-[200px] rounded-lg py-2.5 pl-9 pr-3.5 text-[13px] text-text outline-none placeholder:text-text-faint"
        />
      </div>
    </div>
  );
}

/* =========================================================
   4. Event Card
   ========================================================= */
function EventCard({ event, index }: { event: EventItem; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = CATEGORY_ICONS[event.category];

  const mapsQuery = encodeURIComponent(`${event.venue}, Lakhisarai, Bihar`);
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const registerHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I want to register for "${event.title}" on ${event.dateLabel}.`
  )}`;

  return (
    <motion.div
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: (index % 6) * 0.05 }}
      className="card-flat flex flex-col overflow-hidden"
    >
      <div
        className="relative flex h-36 items-center justify-center border-b border-line"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 75%)",
        }}
      >
        <Icon size={40} className="text-signal-strong" strokeWidth={1.5} />
        <span className="glass absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium text-text-muted">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
              event.status === "Open"
                ? "border-transparent bg-signal-dim text-signal-strong"
                : "border-line-strong bg-bg-raised-2 text-text-faint"
            }`}
          >
            {event.status === "Open" ? "Registration Open" : "Registration Closed"}
          </span>
        </div>

        <h3 className="font-display mt-3 text-[17px] font-semibold text-text">{event.title}</h3>
        <p className="font-body mt-1 text-[13px] text-text-muted">{event.subtitle}</p>

        <div className="mt-4 flex flex-col gap-1.5 text-[13px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} className="text-signal-strong" />
            {event.dateLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-signal-strong" />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-signal-strong" />
            {event.venue}
          </span>
        </div>

        <p className="font-body mt-4 text-[13px] leading-relaxed text-text-muted">
          {event.description}
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-4 flex items-center gap-1.5 text-[13px] font-medium text-signal-strong"
        >
          View Details
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-line pt-4">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-faint">
                  Highlights
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {event.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[13px] text-text-muted">
                      <ChevronRight size={14} className="mt-0.5 shrink-0 text-signal-strong" />
                      {h}
                    </li>
                  ))}
                </ul>

                {event.eligibility && (
                  <>
                    <p className="font-mono mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-text-faint">
                      Eligibility
                    </p>
                    <p className="font-body mt-1.5 text-[13px] text-text-muted">
                      {event.eligibility}
                    </p>
                  </>
                )}

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[12px] text-text-muted">
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
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {event.status === "Open" && (
            <Button href={registerHref} variant="primary" icon={ClipboardList}>
              Register Now
            </Button>
          )}
          <Button href={directionsHref} variant="ghost" icon={Navigation}>
            Get Directions
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   5. Filtered grid
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
          !`${e.title} ${e.subtitle} ${e.category}`
            .toLowerCase()
            .includes(query.trim().toLowerCase())
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
          <motion.h2 {...fadeUp} className="font-display text-[26px] font-bold sm:text-[32px]">
            Results
          </motion.h2>
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

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.06 }} className="mt-7">
          <SearchFilter
            timeframe={timeframe}
            onTimeframe={setTimeframe}
            month={month}
            onMonth={setMonth}
            query={query}
            onQuery={setQuery}
          />
        </motion.div>

        {filtered.length === 0 ? (
          <motion.p {...fadeUp} className="font-body mt-14 text-center text-[14px] text-text-muted">
            No events match your filters right now. Try a different category or month.
          </motion.p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
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
      <CategoryPills active={category} onSelect={setCategory} />
      <FilteredGrid events={events} category={category} onCategory={setCategory} />
    </>
  );
}
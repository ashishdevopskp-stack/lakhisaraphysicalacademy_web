"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Clock,
  Tag,
  Users,
  ClipboardList,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Search,
  Navigation,
  Timer,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { whatsappHref } from "@/app/lib/constants";
import {
  CATEGORY_ICONS,
  CATEGORIES,
  MONTHS,
  type Category,
  type EventItem,
} from "@/app/lib/events-data";
import { EASE } from "./_EventsMotion";

/* =========================================================
   Sub-nav — shared across every /events/* route.
   (Replaces the previous broken `import X from "../page"` pattern,
   which tried to render the async server page component inline.)
   ========================================================= */
const EVENTS_NAV = [
  { label: "All Events", href: "/events" },
  { label: "Upcoming", href: "/events/upcoming" },
  { label: "Past Events", href: "/events/past" },
  { label: "Categories", href: "/events/categories" },
  { label: "Gallery", href: "/events/gallery" },
] as const;

export function EventsSubNav() {
  const pathname = usePathname();
  return (
    <nav className="glass flex flex-wrap gap-1 rounded-lg p-1">
      {EVENTS_NAV.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              isActive ? "bg-signal text-on-signal" : "text-text-muted hover:text-text"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* =========================================================
   Category pill row — used on the main events page and the
   categories page.
   ========================================================= */
export function CategoryPills({
  active,
  onSelect,
  className,
}: {
  active: Category | "All";
  onSelect: (c: Category | "All") => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
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
    </div>
  );
}

/* =========================================================
   Timeframe / month / search bar — used on the main events
   page and the categories page.
   ========================================================= */
export type Timeframe = "Upcoming" | "Past";

export function SearchFilter({
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
   Event card — used on the main events page and the
   categories page.
   ========================================================= */
export function EventCard({ event }: { event: EventItem }) {
  const [open, setOpen] = useState(false);
  const Icon = CATEGORY_ICONS[event.category];

  const mapsQuery = encodeURIComponent(`${event.venue}, Lakhisarai, Bihar`);
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const registerHref = whatsappHref(
    `Hello, I want to register for "${event.title}" on ${event.dateLabel}.`
  );

  return (
    <div className="card-flat flex flex-col overflow-hidden">
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

        <h3 className="font-display mt-3 text-[17px] font-semibold text-text">
          {event.title}
        </h3>
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
    </div>
  );
}

/* =========================================================
   "Next up" glass banner — used on the main events page and
   the upcoming-events page.
   ========================================================= */
export function UpcomingEventBanner({ event }: { event: EventItem | null }) {
  if (!event) return null;

  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.max(0, Math.ceil((event.date.getTime() - now.getTime()) / msPerDay));

  const registerHref = whatsappHref(
    `Hello, I want to register for "${event.title}" on ${event.dateLabel}.`
  );
  const enquiryHref = whatsappHref(`Hello, I have a question about "${event.title}".`);

  return (
    <div className="glass glass-sheen sheen-run relative overflow-hidden rounded-2xl p-7 shadow-[var(--shadow-card)] sm:p-10">
      <span className="ribbon-bar absolute inset-x-0 top-0 h-[4px]" aria-hidden />

      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
        Next Up
      </p>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display max-w-[26ch] text-[24px] font-bold sm:text-[30px]">
            {event.title}
          </h2>
          <p className="font-body mt-2 max-w-[50ch] text-[14px] text-text-muted">
            {event.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={15} className="text-signal-strong" />
              {event.dateLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-signal-strong" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-signal-strong" />
              {event.venue}
            </span>
          </div>
        </div>

        <div className="glass flex shrink-0 items-center gap-4 rounded-xl px-5 py-4">
          <Timer size={20} className="text-signal-strong" />
          <div>
            <p className="text-[22px] font-semibold leading-none text-text">{daysLeft}</p>
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
    </div>
  );
}
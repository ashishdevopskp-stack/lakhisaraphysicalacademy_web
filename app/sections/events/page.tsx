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
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Search,
  Navigation,
  Play,
  Video as Youtube,
  Dumbbell,
  Shield,
  ShieldCheck,
  Star,
  Target,
  UserCheck,
  Trophy,
  Flame,
  GraduationCap,
  Megaphone,
  Medal,
  PartyPopper,
  Timer,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WHATSAPP_NUMBER = "918863081082";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

/* =========================================================
   Data
   ========================================================= */
type Category =
  | "Physical Training Camp"
  | "Army Preparation Camp"
  | "Bihar Police Camp"
  | "Daroga Workshop"
  | "SSC GD Practice Camp"
  | "Guest Physical Test"
  | "Selection Felicitation"
  | "Fitness Challenge"
  | "Career Guidance Seminar"
  | "Recruitment Awareness Program"
  | "Sports Competition"
  | "Academy Celebrations";

type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  date: Date;
  dateLabel: string;
  time: string;
  venue: string;
  status: "Open" | "Closed";
  description: string;
  highlights: string[];
  eligibility?: string;
  seats?: string;
  lastRegistration?: string;
  youtube?: string;
};

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  "Physical Training Camp": Dumbbell,
  "Army Preparation Camp": Shield,
  "Bihar Police Camp": ShieldCheck,
  "Daroga Workshop": Star,
  "SSC GD Practice Camp": Target,
  "Guest Physical Test": UserCheck,
  "Selection Felicitation": Trophy,
  "Fitness Challenge": Flame,
  "Career Guidance Seminar": GraduationCap,
  "Recruitment Awareness Program": Megaphone,
  "Sports Competition": Medal,
  "Academy Celebrations": PartyPopper,
};

const CATEGORIES: Category[] = [
  "Physical Training Camp",
  "Army Preparation Camp",
  "Bihar Police Camp",
  "Daroga Workshop",
  "SSC GD Practice Camp",
  "Guest Physical Test",
  "Selection Felicitation",
  "Fitness Challenge",
  "Career Guidance Seminar",
  "Recruitment Awareness Program",
  "Sports Competition",
  "Academy Celebrations",
];

const EVENTS: EventItem[] = [
  {
    id: "guest-physical-test-jul-2026",
    title: "Guest Physical Test",
    subtitle: "Open trial run under real recruitment test conditions",
    category: "Guest Physical Test",
    date: new Date("2026-07-25T06:00:00"),
    dateLabel: "25 July 2026",
    time: "06:00 AM – 09:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "A guest trial for outside students to attempt the run, long jump, and endurance drills exactly as measured on official recruitment day, with instant feedback from our trainers.",
    highlights: [
      "Timed 1.6 km / 5 km run on marked track",
      "Standing long jump & chin-up assessment",
      "One-to-one feedback from Ganesh Sir",
    ],
    eligibility: "Open to all aspirants aged 17–25, no prior enrolment required.",
    seats: "40 seats",
    lastRegistration: "23 July 2026",
  },
  {
    id: "army-prep-camp-aug-2026",
    title: "Army Preparation Camp",
    subtitle: "10-day intensive drill for the upcoming Army rally",
    category: "Army Preparation Camp",
    date: new Date("2026-08-05T05:00:00"),
    dateLabel: "5 – 14 August 2026",
    time: "05:00 AM – 08:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "Focused conditioning for the Army rally bharti standards — running, beam, ditch, and zig-zag balance — with daily timing records so students can track improvement.",
    highlights: [
      "Daily 1.6 km timed runs with logged records",
      "Beam, ditch & zig-zag balance practice",
      "Diet and recovery guidance included",
    ],
    eligibility: "Enrolled academy students; guest slots on request.",
    seats: "60 seats",
    lastRegistration: "3 August 2026",
  },
  {
    id: "bihar-police-camp-aug-2026",
    title: "Bihar Police Camp",
    subtitle: "Full-format PET/PST practice for Bihar Police recruitment",
    category: "Bihar Police Camp",
    date: new Date("2026-08-20T04:00:00"),
    dateLabel: "20 August 2026",
    time: "04:00 PM – 07:00 PM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "A dedicated evening camp mirroring the Bihar Police physical efficiency and standard tests, with height, chest, and run measurements taken exactly as on selection day.",
    highlights: [
      "Mock PST — height, chest & weight check",
      "PET run under official time limits",
      "Q&A on documentation and cut-offs",
    ],
    seats: "50 seats",
    lastRegistration: "18 August 2026",
  },
  {
    id: "ssc-gd-camp-sep-2026",
    title: "SSC GD Practice Camp",
    subtitle: "Race-pace training for the SSC GD physical round",
    category: "SSC GD Practice Camp",
    date: new Date("2026-09-10T05:00:00"),
    dateLabel: "10 September 2026",
    time: "05:00 AM – 08:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "Structured interval training to help students hit SSC GD's 24-minute (male) and 8.5-minute (female) benchmarks, with weekly pace tracking.",
    highlights: [
      "Interval and pace-building sessions",
      "Category-wise timing targets",
      "Mock test in the final week",
    ],
    seats: "45 seats",
    lastRegistration: "8 September 2026",
  },
  {
    id: "daroga-workshop-oct-2026",
    title: "Daroga Workshop",
    subtitle: "Seminar on the Bihar Daroga (SI) physical & written pattern",
    category: "Daroga Workshop",
    date: new Date("2026-10-05T16:00:00"),
    dateLabel: "5 October 2026",
    time: "04:00 PM – 06:30 PM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "A workshop covering the complete Daroga (Sub-Inspector) selection process — physical standards, exam pattern, and a realistic preparation timeline.",
    highlights: [
      "Physical standards & measurement rules explained",
      "Exam pattern and cut-off trends",
      "Open floor Q&A with past selects",
    ],
    seats: "80 seats",
    lastRegistration: "3 October 2026",
  },
  {
    id: "fitness-challenge-jun-2026",
    title: "Fitness Challenge",
    subtitle: "Academy-wide endurance and strength challenge",
    category: "Fitness Challenge",
    date: new Date("2026-06-15T05:00:00"),
    dateLabel: "15 June 2026",
    time: "05:00 AM – 08:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "Students competed across running, push-ups, and pull-up stations to mark mid-year progress, with results posted on the academy notice board.",
    highlights: [
      "1.6 km timed run",
      "Max push-ups & pull-ups in 2 minutes",
      "Top performers felicitated on the spot",
    ],
  },
  {
    id: "selection-felicitation-may-2026",
    title: "Selection Felicitation",
    subtitle: "Honouring students selected in Army & Police recruitment",
    category: "Selection Felicitation",
    date: new Date("2026-05-30T16:00:00"),
    dateLabel: "30 May 2026",
    time: "04:00 PM – 06:00 PM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "A felicitation ceremony celebrating students who cleared Army and Bihar Police recruitment this season, with certificates and words of guidance for juniors.",
    highlights: [
      "Certificates for all selected candidates",
      "Success stories shared with juniors",
      "Group photo and refreshments",
    ],
  },
  {
    id: "career-guidance-apr-2026",
    title: "Career Guidance Seminar",
    subtitle: "Choosing the right government exam path",
    category: "Career Guidance Seminar",
    date: new Date("2026-04-12T16:00:00"),
    dateLabel: "12 April 2026",
    time: "04:00 PM – 06:00 PM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "A guidance session helping students map their age, education, and fitness level to the most suitable defence or police exam track.",
    highlights: [
      "Eligibility comparison across exams",
      "Personalised guidance for parents & students",
      "Roadmap handout for the coming year",
    ],
  },
  {
    id: "sports-competition-mar-2026",
    title: "Sports Competition",
    subtitle: "Inter-batch athletics meet",
    category: "Sports Competition",
    date: new Date("2026-03-08T05:00:00"),
    dateLabel: "8 March 2026",
    time: "05:00 AM – 09:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "Morning and evening batches competed in track events, long jump, and relay races, building the competitive edge needed for selection day.",
    highlights: [
      "100m, 400m & 1.6 km races",
      "Long jump and relay events",
      "Medals for top three in each event",
    ],
  },
  {
    id: "academy-celebration-jan-2026",
    title: "Republic Day Academy Celebration",
    subtitle: "Flag hoisting and cultural programme",
    category: "Academy Celebrations",
    date: new Date("2026-01-26T08:00:00"),
    dateLabel: "26 January 2026",
    time: "08:00 AM – 10:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "Students and families gathered for flag hoisting, a march-past by the academy's Army-aspirant batch, and a short cultural programme.",
    highlights: [
      "Flag hoisting ceremony",
      "March-past by senior batch",
      "Sweets and group photographs",
    ],
  },
];

const GALLERY_GROUPS = [
  { label: "Training Moments", icon: Dumbbell },
  { label: "Award Ceremony", icon: Trophy },
  { label: "Group Photos", icon: Users },
  { label: "Practice Sessions", icon: Target },
];

const VIDEOS = [
  {
    title: "Army Preparation Camp — Highlights",
    href: "https://youtube.com",
  },
  {
    title: "Selection Felicitation 2026",
    href: "https://youtube.com",
  },
  {
    title: "Bihar Police Camp — Mock PST",
    href: "https://youtube.com",
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* =========================================================
   1. Hero
   ========================================================= */
function EventsHero() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Lakhisarai Physical Academy, I'd like to know about upcoming events."
  )}`;

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Events &amp; Activities
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[32px] font-bold sm:text-[42px] lg:text-[50px]">
            Training Camps, Competitions &amp; Special Academy Events
          </h1>

          <p className="font-body mt-5 text-[15px] font-medium text-text">
            Explore our training camps, competitions, workshops, and special
            academy events.
          </p>

          <p className="font-body mt-4 text-[15px] leading-relaxed text-text-muted">
            Stay updated with all upcoming and past events at Lakhisarai
            Physical Academy, including physical test camps, workshops,
            seminars, fitness challenges, recruitment awareness programs, and
            student achievement celebrations.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#upcoming" variant="primary" icon={CalendarDays}>
              Upcoming Events
            </Button>
            <Button href="#events" variant="secondary" icon={ClipboardList}>
              Register Now
            </Button>
            <Button href={whatsappHref} variant="whatsapp" icon={MessageCircle}>
              WhatsApp Enquiry
            </Button>
          </div>
        </motion.div>
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
        <motion.h2 {...fadeUp} className="font-display text-[24px] font-bold sm:text-[28px]">
          Event Categories
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-body mt-2 text-[14px] text-text-muted"
        >
          Tap a category to filter events below.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="mt-6 flex flex-wrap gap-2"
        >
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
   3. Upcoming Event Banner — signature glass panel
   ========================================================= */
function UpcomingEventBanner({ event }: { event: EventItem | null }) {
  if (!event) return null;

  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.max(
    0,
    Math.ceil((event.date.getTime() - now.getTime()) / msPerDay)
  );

  const registerHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I want to register for "${event.title}" on ${event.dateLabel}.`
  )}`;
  const enquiryHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I have a question about "${event.title}".`
  )}`;

  return (
    <section id="upcoming" className="py-16 sm:py-20">
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
   4. Search & Filter
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
  const fieldClasses =
    "glass rounded-lg px-3.5 py-2.5 text-[13px] text-text outline-none";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="glass flex rounded-lg p-1">
        {(["Upcoming", "Past"] as Timeframe[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTimeframe(t)}
            className={`rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              timeframe === t
                ? "bg-signal text-on-signal"
                : "text-text-muted hover:text-text"
            }`}
          >
            {t} Events
          </button>
        ))}
      </div>

      <select
        className={fieldClasses}
        value={month}
        onChange={(e) => onMonth(e.target.value)}
      >
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
   5. Event Card
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
      {/* Banner */}
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
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
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
                    <li
                      key={h}
                      className="flex items-start gap-2 text-[13px] text-text-muted"
                    >
                      <ChevronRight
                        size={14}
                        className="mt-0.5 shrink-0 text-signal-strong"
                      />
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
   6. Events Grid Section
   ========================================================= */
function EventsGrid({
  category,
  onCategory,
}: {
  category: Category | "All";
  onCategory: (c: Category | "All") => void;
}) {
  const [timeframe, setTimeframe] = useState<Timeframe>("Upcoming");
  const [month, setMonth] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const now = new Date();
    return EVENTS.filter((e) => {
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
    }).sort((a, b) =>
      timeframe === "Upcoming"
        ? a.date.getTime() - b.date.getTime()
        : b.date.getTime() - a.date.getTime()
    );
  }, [timeframe, month, query, category]);

  return (
    <section id="events" className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-[28px] font-bold sm:text-[34px]">
              All Events
            </h2>
            <p className="font-body mt-2 max-w-[55ch] text-[14px] text-text-muted">
              Browse upcoming and past academy events. Filter by category,
              month, or search by name.
            </p>
          </motion.div>

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

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
          className="mt-7"
        >
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
          <motion.p
            {...fadeUp}
            className="font-body mt-14 text-center text-[14px] text-text-muted"
          >
            No events match your filters right now. Try a different category
            or month.
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

/* =========================================================
   7. Event Gallery
   ========================================================= */
function EventGallery() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Event Gallery
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-body mt-3 max-w-[60ch] text-[15px] text-text-muted"
        >
          Moments from our training camps, award ceremonies, and academy
          celebrations.
        </motion.p>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {GALLERY_GROUPS.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat flex aspect-square flex-col items-center justify-center gap-3 text-center"
            >
              <span className="glass flex h-11 w-11 items-center justify-center rounded-full">
                <Icon size={18} className="text-signal-strong" />
              </span>
              <p className="font-body px-3 text-[13px] font-medium text-text">{label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   8. Event Videos
   ========================================================= */
function EventVideos() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Event Videos
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-body mt-3 max-w-[60ch] text-[15px] text-text-muted"
        >
          Watch highlights from our camps and celebrations on YouTube.
        </motion.p>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {VIDEOS.map((video, i) => (
            <motion.a
              key={video.title}
              href={video.href}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
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
                <p className="font-body text-[13px] font-medium text-text">
                  {video.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Events() {
  const [category, setCategory] = useState<Category | "All">("All");

  const nextEvent = useMemo(() => {
    const now = new Date();
    return (
      EVENTS.filter((e) => e.date.getTime() >= now.getTime()).sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      )[0] ?? null
    );
  }, []);

  return (
    <>
      <EventsHero />
      <EventCategories active={category} onSelect={setCategory} />
      <UpcomingEventBanner event={nextEvent} />
      <EventsGrid category={category} onCategory={setCategory} />
      <EventGallery />
      <EventVideos />
    </>
  );
}
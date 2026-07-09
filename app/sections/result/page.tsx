"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  PlayCircle,
  MessageCircle,
  ArrowRight,
  Search,
  Download,
  Eye,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Shield,
  ShieldCheck,
  TrainFront,
  TreePine,
  Flame,
  Home as HomeIcon,
  MoreHorizontal,
  Video,
  ChevronDown,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* =========================================================
   Data
   ========================================================= */

type Category = {
  name: string;
  icon: typeof Shield;
};

const CATEGORIES: Category[] = [
  { name: "Army", icon: Shield },
  { name: "Bihar Police", icon: ShieldCheck },
  { name: "Daroga (SI)", icon: Award },
  { name: "SSC GD", icon: ShieldCheck },
  { name: "CISF", icon: Shield },
  { name: "CRPF", icon: Shield },
  { name: "BSF", icon: Shield },
  { name: "ITBP", icon: Shield },
  { name: "Indian Navy", icon: Award },
  { name: "Air Force", icon: Award },
  { name: "Railway", icon: TrainFront },
  { name: "Forest Guard", icon: TreePine },
  { name: "Fireman", icon: Flame },
  { name: "Home Guard", icon: HomeIcon },
  { name: "Other Exams", icon: MoreHorizontal },
];

type ResultStatus = "New" | "Updated";

type ResultItem = {
  id: string;
  title: string;
  subtitle: string;
  org: string;
  date: string;
  category: string;
  status: ResultStatus;
  totalSelected?: string;
};

const RESULTS: ResultItem[] = [
  {
    id: "bihar-police-constable-2026",
    title: "Bihar Police Constable Result 2026",
    subtitle: "PET / PST qualified list released",
    org: "Bihar Police Subordinate Services Commission",
    date: "02 Jul 2026",
    category: "Bihar Police",
    status: "New",
    totalSelected: "9,842",
  },
  {
    id: "ssc-gd-2026",
    title: "SSC GD Constable Result 2026",
    subtitle: "Physical Efficiency Test merit list",
    org: "Staff Selection Commission",
    date: "28 Jun 2026",
    category: "SSC GD",
    status: "New",
    totalSelected: "26,140",
  },
  {
    id: "army-agniveer-bharti-2026",
    title: "Army Agniveer Bharti Result",
    subtitle: "Physical & medical round outcome",
    org: "Indian Army Recruitment Office",
    date: "21 Jun 2026",
    category: "Army",
    status: "Updated",
    totalSelected: "1,205",
  },
  {
    id: "bihar-daroga-si-2026",
    title: "Bihar Daroga (SI) Result 2026",
    subtitle: "Written exam cut-off & merit list",
    org: "Bihar Public Service Commission",
    date: "14 Jun 2026",
    category: "Daroga (SI)",
    status: "Updated",
    totalSelected: "2,317",
  },
  {
    id: "crpf-constable-gd-2026",
    title: "CRPF Constable (GD) Result",
    subtitle: "Document verification list out",
    org: "Central Reserve Police Force",
    date: "05 Jun 2026",
    category: "CRPF",
    status: "New",
    totalSelected: "4,590",
  },
  {
    id: "railway-rpf-2026",
    title: "RPF Constable Result 2026",
    subtitle: "PET/PMT qualified candidates",
    org: "Railway Protection Force",
    date: "30 May 2026",
    category: "Railway",
    status: "Updated",
    totalSelected: "6,003",
  },
];

const STATS = [
  { label: "Total Vacancies Tracked", value: "48,500+", icon: ClipboardList },
  { label: "Candidates Qualified", value: "9,200+", icon: Users },
  { label: "Selection Ratio", value: "1 : 19", icon: TrendingUp },
  { label: "Results Published", value: "60+", icon: Award },
];

const VIDEOS = [
  { title: "Bihar Police Constable — Full Result Analysis", duration: "12:40" },
  { title: "SSC GD Cut-off Marks Explained", duration: "9:15" },
  { title: "Army Agniveer Bharti Result Breakdown", duration: "15:02" },
];

const BLOGS = [
  "How to Read Your Cut-off Marks Correctly",
  "Merit List vs Waiting List — What's the Difference",
  "Document Verification: What to Carry",
  "What Happens After Your Result — Next Stage Prep",
];

const YEARS = ["2026", "2025", "2024"];
const RESULT_TYPES = ["All Types", "Latest", "Final", "PET Result", "Written Result"];

/* =========================================================
   Page
   ========================================================= */

export default function ResultsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(YEARS[0]);
  const [type, setType] = useState(RESULT_TYPES[0]);

  const filteredResults = useMemo(() => {
    return RESULTS.filter((r) => {
      const matchesCategory = activeCategory ? r.category === activeCategory : true;
      const matchesQuery = query
        ? (r.title + r.org + r.category).toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <>
      <ResultsHero />
      <CategorySection active={activeCategory} onSelect={setActiveCategory} />
      <ListingsSection
        results={filteredResults}
        query={query}
        onQueryChange={setQuery}
        year={year}
        onYearChange={setYear}
        type={type}
        onTypeChange={setType}
      />
      <StatsSection />
      <VideosSection />
      <BlogsSection />
      <StayUpdatedSection />
    </>
  );
}

/* =========================================================
   Hero
   ========================================================= */

function ResultsHero() {
  return (
    <section
      id="results-top"
      className="relative overflow-hidden border-b border-line pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal">
              Result Centre
            </p>

            <h1 className="mt-5 max-w-[16ch] text-[34px] sm:text-[44px] lg:text-[56px]">
              Latest Exam Results
            </h1>

            <p className="mt-6 max-w-[48ch] text-[17px] font-medium text-text">
              Check the latest government recruitment results, merit lists
              and selection updates as soon as they&rsquo;re declared.
            </p>

            <p className="mt-3.5 max-w-[52ch] text-[15px] text-text-muted">
              Stay updated with results for Army, Bihar Police, Daroga, SSC
              GD, Railway, CISF, CRPF, BSF, ITBP, Fireman and other
              government exams &mdash; official PDFs, merit lists, cut-offs
              and scorecards, all in one place.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#results-listings" variant="primary" icon={ClipboardList}>
                View Latest Results
              </Button>
              <Button href="#results-videos" variant="secondary" icon={PlayCircle}>
                Watch Result Analysis
              </Button>
              <Button
                href="https://wa.me/918863081082"
                variant="secondary"
                icon={MessageCircle}
              >
                WhatsApp Support
              </Button>
            </div>
          </motion.div>

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
            <DeclaredStamp />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------
   Signature element: a result sheet with an official stamp
   slamming down onto it — the exact moment a result becomes
   real for these candidates.
   --------------------------------------------------------- */
function DeclaredStamp() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Result sheet being stamped as declared"
      className="relative h-full w-full"
    >
      {/* Document */}
      <rect
        x="96"
        y="72"
        width="208"
        height="264"
        rx="6"
        fill="var(--color-bg)"
        stroke="var(--color-line-strong)"
        strokeWidth="2"
      />
      {/* Document header block */}
      <rect x="120" y="100" width="120" height="10" rx="2" fill="var(--color-line-strong)" />
      <rect x="120" y="120" width="160" height="6" rx="2" fill="var(--color-line)" />

      {/* Text lines */}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          x="120"
          y={150 + i * 18}
          width={i % 3 === 2 ? 96 : 160}
          height="6"
          rx="2"
          fill="var(--color-line)"
        />
      ))}

      {/* Pulsing ripple behind the stamp */}
      {!shouldReduceMotion && (
        <motion.circle
          cx="242"
          cy="270"
          r="46"
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="2"
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "242px 270px" }}
        />
      )}

      {/* Stamp seal, drops in and settles at an angle */}
      <motion.g
        style={{ transformOrigin: "242px 270px" }}
        initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.6, rotate: 6 }}
        animate={{ opacity: 1, scale: 1, rotate: -10 }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 0.5, delay: 0.5, type: "spring", stiffness: 260, damping: 16 }
        }
      >
        <circle
          cx="242"
          cy="270"
          r="46"
          fill="var(--color-bg)"
          stroke="var(--color-signal)"
          strokeWidth="3"
        />
        <circle
          cx="242"
          cy="270"
          r="37"
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="1.5"
        />
        <text
          x="242"
          y="266"
          textAnchor="middle"
          className="fill-signal font-mono text-[12px] font-bold uppercase tracking-[0.12em]"
        >
          Result
        </text>
        <text
          x="242"
          y="282"
          textAnchor="middle"
          className="fill-signal font-mono text-[12px] font-bold uppercase tracking-[0.12em]"
        >
          Declared
        </text>
      </motion.g>
    </svg>
  );
}

/* =========================================================
   Category browse
   ========================================================= */

function CategorySection({
  active,
  onSelect,
}: {
  active: string | null;
  onSelect: (name: string | null) => void;
}) {
  return (
    <section className="border-b border-line py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Browse by Exam"
          title="Find results for your exam"
          description="Select a category to filter the listings below."
        />

        <div className="mt-8 flex flex-wrap gap-2.5">
          <button
            onClick={() => onSelect(null)}
            className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
              active === null
                ? "border-signal bg-signal text-on-signal"
                : "border-line text-text-muted hover:border-line-strong hover:text-text"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map(({ name, icon: Icon }) => {
            const isActive = active === name;
            return (
              <button
                key={name}
                onClick={() => onSelect(isActive ? null : name)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  isActive
                    ? "border-signal bg-signal text-on-signal"
                    : "border-line text-text-muted hover:border-line-strong hover:text-text"
                }`}
              >
                <Icon size={14} />
                {name}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Search, filters & listings
   ========================================================= */

function ListingsSection({
  results,
  query,
  onQueryChange,
  year,
  onYearChange,
  type,
  onTypeChange,
}: {
  results: ResultItem[];
  query: string;
  onQueryChange: (v: string) => void;
  year: string;
  onYearChange: (v: string) => void;
  type: string;
  onTypeChange: (v: string) => void;
}) {
  return (
    <section id="results-listings" className="border-b border-line py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Latest Updates"
          title="Result listings"
          description="Official result PDFs, merit lists, cut-offs and scorecards as they're released."
        />

        {/* Search + filters */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by exam, organisation or category"
              className="w-full rounded-lg border border-line bg-bg-raised py-2.5 pl-10 pr-4 text-[14px] text-text placeholder:text-text-muted focus:border-line-strong focus:outline-none"
            />
          </div>

          <FilterSelect value={year} onChange={onYearChange} options={YEARS} />
          <FilterSelect value={type} onChange={onTypeChange} options={RESULT_TYPES} />
        </div>

        {/* Cards */}
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.length > 0 ? (
            results.map((r, i) => <ResultCard key={r.id} result={r} index={i} />)
          ) : (
            <p className="col-span-full py-10 text-center text-[14px] text-text-muted">
              No results match your filters yet &mdash; try a different category or search term.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-line bg-bg-raised py-2.5 pl-4 pr-9 text-[14px] text-text focus:border-line-strong focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
      />
    </div>
  );
}

function ResultCard({ result, index }: { result: ResultItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE, delay: (index % 3) * 0.06 }}
      className="flex flex-col rounded-xl border border-line bg-bg-raised p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <Badge>{result.category}</Badge>
        <span
          className={`font-mono text-[11px] font-semibold uppercase tracking-[0.1em] ${
            result.status === "New" ? "text-signal" : "text-text-muted"
          }`}
        >
          {result.status}
        </span>
      </div>

      <h3 className="mt-4 text-[17px] font-semibold text-text">{result.title}</h3>
      <p className="mt-1.5 text-[14px] text-text-muted">{result.subtitle}</p>

      <p className="mt-3 text-[13px] text-text-muted">{result.org}</p>

      <div className="mt-3 flex items-center gap-4 text-[13px] text-text-muted">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {result.date}
        </span>
        {result.totalSelected && (
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {result.totalSelected} selected
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
        <Button href={`/results/${result.id}`} variant="primary" icon={Eye}>
          View Result
        </Button>
        <Button href={`/results/${result.id}#pdf`} variant="secondary" icon={Download}>
          Download PDF
        </Button>
        <Button href={`/results/${result.id}#video`} variant="ghost" icon={PlayCircle}>
          Watch Analysis
        </Button>
      </div>
    </motion.div>
  );
}

/* =========================================================
   Stats strip
   ========================================================= */

function StatsSection() {
  return (
    <section className="border-b border-line py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow="At a Glance" title="Result statistics" />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className="rounded-xl border border-line bg-bg-raised p-6"
            >
              <Icon size={18} className="text-signal" />
              <p className="mt-4 font-mono text-[28px] font-semibold text-text">{value}</p>
              <p className="mt-1 text-[13px] text-text-muted">{label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Videos
   ========================================================= */

function VideosSection() {
  return (
    <section id="results-videos" className="border-b border-line py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Watch & Understand"
          title="Result analysis videos"
          description="A walkthrough of every cut-off, merit list and selection ratio, explained."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <motion.a
              key={v.title}
              href="#"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className="group overflow-hidden rounded-xl border border-line bg-bg-raised"
            >
              <div className="relative flex aspect-video items-center justify-center bg-bg-raised-2">
                <Video size={20} className="absolute left-3 top-3 text-text-muted" />
                <PlayCircle
                  size={40}
                  className="text-signal transition-transform group-hover:scale-110"
                />
                <span className="absolute bottom-2 right-2.5 rounded bg-bg px-1.5 py-0.5 font-mono text-[11px] text-text-muted">
                  {v.duration}
                </span>
              </div>
              <p className="p-4 text-[14px] font-medium text-text">{v.title}</p>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Related blogs
   ========================================================= */

function BlogsSection() {
  return (
    <section className="border-b border-line py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Read Next" title="Related articles" />

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {BLOGS.map((title, i) => (
            <motion.a
              key={title}
              href="#"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
              className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-bg-raised px-5 py-4"
            >
              <span className="text-[14px] font-medium text-text">{title}</span>
              <ArrowRight
                size={16}
                className="shrink-0 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-signal"
              />
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Stay updated CTA
   ========================================================= */

function StayUpdatedSection() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-bg-raised p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal">
              Stay Updated
            </p>
            <h2 className="mt-3 max-w-[28ch] text-[26px] sm:text-[30px]">
              Never miss a result update
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              href="https://wa.me/918863081082"
              variant="primary"
              icon={MessageCircle}
            >
              Join WhatsApp Channel
            </Button>
            <Button href="#" variant="secondary" icon={Video}>
              Subscribe on Video
            </Button>
            <Button href="#" variant="ghost" icon={ArrowRight}>
              Read Latest Blogs
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Shared heading
   ========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-[52ch]">
      <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[28px] sm:text-[34px]">{title}</h2>
      {description && (
        <p className="mt-3 text-[15px] text-text-muted">{description}</p>
      )}
    </div>
  );
}
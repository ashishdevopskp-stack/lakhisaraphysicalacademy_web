"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  MessageCircle,
  Video,
  Search,
  MapPin,
  Calendar,
  Clock,
  Download,
  PlayCircle,
  ArrowRight,
  Newspaper,
  Bell,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Star,
  Mountain,
  Anchor,
  Plane,
  TrainFront,
  TreePine,
  Flame,
  Home as HomeIcon,
  Landmark,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

/* Reusable soft gradient wash for section backgrounds — matches About/Hero */
function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const images = {
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(20,184,166,0.10), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.12), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(59,130,246,0.10), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(245,166,35,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(59,130,246,0.10), transparent 55%)",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: images[variant] }}
    />
  );
}

/* =========================================================
   1. Hero
   ========================================================= */
function JobsHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
      <SectionGlow variant={1} />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Job Vacancies
          </p>

          <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
            Latest{" "}
            <span className="text-gradient-brand">Government Job</span>{" "}
            Vacancies
          </h1>

          <p className="font-body mt-6 text-[15.5px] font-medium text-text">
            Stay updated with the latest Defence, Police, Railway &amp;
            Government recruitment notifications.
          </p>

          <p className="font-body mt-3.5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
            Get the latest and verified updates on government job
            recruitments, including Defence, Police, Paramilitary, Railway,
            SSC, Bihar Government, and other competitive examinations. Each
            vacancy includes complete eligibility, physical standards,
            important dates, official notification PDF, and video guidance.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#listings" variant="primary" icon={ClipboardList}>
              View Latest Jobs
            </Button>
            <Button href="#videos" variant="secondary" icon={PlayCircle}>
              Watch Guidance Videos
            </Button>
            <Button
              href="https://wa.me/918863081082"
              variant="whatsapp"
              icon={MessageCircle}
            >
              WhatsApp Enquiry
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Job Categories
   ========================================================= */
const CATEGORIES = [
  { label: "Army", icon: Shield },
  { label: "Bihar Police Constable", icon: ShieldAlert },
  { label: "Bihar Daroga (SI)", icon: Star },
  { label: "SSC GD", icon: ShieldCheck },
  { label: "CISF", icon: Shield },
  { label: "CRPF", icon: ShieldCheck },
  { label: "BSF", icon: ShieldAlert },
  { label: "ITBP", icon: Mountain },
  { label: "SSB", icon: Shield },
  { label: "Indian Navy", icon: Anchor },
  { label: "Indian Air Force", icon: Plane },
  { label: "Railway", icon: TrainFront },
  { label: "Forest Guard", icon: TreePine },
  { label: "Fireman", icon: Flame },
  { label: "Home Guard", icon: HomeIcon },
  { label: "Other Government Jobs", icon: Landmark },
] as const;

function JobCategories() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          Browse By
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Job Categories
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 8) * 0.03 }}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center"
            >
              <Icon size={20} className="text-signal-strong" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Latest Job Listings — sample data, wire to your CMS/API
   ========================================================= */
type JobStatus = "New" | "Ongoing" | "Closed";

interface JobListing {
  title: string;
  subtitle: string;
  organization: string;
  notificationDate: string;
  lastDate: string;
  location: string;
  category: string;
  status: JobStatus;
}

const JOBS: JobListing[] = [
  {
    title: "Indian Army Agniveer Recruitment",
    subtitle: "Open Rally for Agniveer (GD, Technical, Clerk)",
    organization: "Indian Army",
    notificationDate: "10 Jun 2026",
    lastDate: "30 Jul 2026",
    location: "Bihar",
    category: "Army",
    status: "New",
  },
  {
    title: "Bihar Police Constable Recruitment",
    subtitle: "Constable (General Cadre) Vacancy",
    organization: "Bihar Police",
    notificationDate: "02 Jun 2026",
    lastDate: "15 Jul 2026",
    location: "Bihar",
    category: "Bihar Police Constable",
    status: "Ongoing",
  },
  {
    title: "Bihar Daroga (SI) Recruitment",
    subtitle: "Sub-Inspector Direct Recruitment",
    organization: "Bihar Police Subordinate Services Commission",
    notificationDate: "20 May 2026",
    lastDate: "10 Jul 2026",
    location: "Bihar",
    category: "Bihar Daroga (SI)",
    status: "Ongoing",
  },
  {
    title: "SSC GD Constable Recruitment",
    subtitle: "General Duty Constable in CAPF, NIA, SSF, Rifleman",
    organization: "Staff Selection Commission",
    notificationDate: "15 May 2026",
    lastDate: "05 Jul 2026",
    location: "All India",
    category: "SSC GD",
    status: "New",
  },
  {
    title: "Railway RRB Group D Recruitment",
    subtitle: "Level 1 Posts across Zonal Railways",
    organization: "Railway Recruitment Board",
    notificationDate: "01 Apr 2026",
    lastDate: "20 May 2026",
    location: "All India",
    category: "Railway",
    status: "Closed",
  },
  {
    title: "CRPF Constable (GD) Recruitment",
    subtitle: "Constable General Duty Vacancy",
    organization: "Central Reserve Police Force",
    notificationDate: "12 Mar 2026",
    lastDate: "30 Apr 2026",
    location: "All India",
    category: "CRPF",
    status: "Closed",
  },
];

const STATUS_STYLES: Record<JobStatus, string> = {
  New: "text-signal-strong",
  Ongoing: "text-accent-strong",
  Closed: "text-text-faint",
};

function JobListings() {
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categoryOptions = useMemo(
    () => ["All", ...CATEGORIES.map((c) => c.label)],
    []
  );
  const statusOptions = ["All", "New", "Ongoing", "Closed"];

  const filtered = JOBS.filter((job) => {
    const matchesCategory = category === "All" || job.category === category;
    const matchesStatus = status === "All" || job.status === status;
    const matchesQuery =
      query.trim() === "" ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.organization.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesStatus && matchesQuery;
  });

  return (
    <section id="listings" className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          Stay Ahead
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Latest Job Listings
        </motion.h2>

        {/* Search & Filter */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="card-flat mt-8 flex flex-col gap-3 p-3 sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-line bg-bg px-4 py-2.5">
            <Search size={16} className="shrink-0 text-text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by job title or organization"
              className="font-body w-full bg-transparent text-[14px] text-text outline-none placeholder:text-text-faint"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="font-body rounded-lg border border-line bg-bg px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="font-body rounded-lg border border-line bg-bg px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Status" : s}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job, i) => (
            <motion.div
              key={job.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
              className="card-flat flex flex-col p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`pill ${PILL_COLORS[i % PILL_COLORS.length]}`}>
                  {job.category}
                </span>
                <span
                  className={`font-mono text-[12px] font-medium ${STATUS_STYLES[job.status]}`}
                >
                  ● {job.status}
                </span>
              </div>

              <h3 className="font-display mt-4 text-[16px] font-semibold text-text">
                {job.title}
              </h3>
              <p className="font-body mt-1 text-[13px] text-text-muted">
                {job.subtitle}
              </p>
              <p className="font-body mt-2 text-[13px] text-text-muted">
                {job.organization}
              </p>

              <div className="font-body mt-4 flex flex-col gap-1.5 text-[13px] text-text-muted">
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-text-faint" /> Notified: {job.notificationDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-text-faint" /> Last date: {job.lastDate}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-text-faint" /> {job.location}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button href="#" variant="primary" icon={ArrowRight}>
                  Read More
                </Button>
                <Button href="#" variant="secondary" icon={Download}>
                  Download PDF
                </Button>
                <Button href="#" variant="ghost" icon={PlayCircle}>
                  Watch Video
                </Button>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="font-body col-span-full text-[14px] text-text-muted">
              No vacancies match these filters right now.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Recruitment Guidance Videos — sample data
   ========================================================= */
const VIDEOS = [
  { title: "Running Technique for PET", duration: "8:24" },
  { title: "Army Physical Test Guidance", duration: "12:10" },
  { title: "Bihar Police PET Preparation", duration: "9:47" },
];

function GuidanceVideos() {
  return (
    <section id="videos" className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          Watch &amp; Learn
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Recruitment Guidance Videos
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {VIDEOS.map((video, i) => (
            <motion.div
              key={video.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-5"
            >
              <div className="flex aspect-video items-center justify-center rounded-[12px] border border-line bg-bg-raised-2">
                <PlayCircle size={30} className="text-signal-strong" />
              </div>
              <p className="font-display mt-4 text-[14px] font-semibold text-text">
                {video.title}
              </p>
              <p className="font-mono mt-1 text-[12px] text-text-faint">
                {video.duration}
              </p>
              <div className="mt-4">
                <Button href="https://youtube.com" variant="ghost" icon={PlayCircle}>
                  Watch Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Related Blog Articles — sample data
   ========================================================= */
const BLOGS = [
  "Preparation Tips",
  "Physical Training Guides",
  "Exam Strategy",
  "Previous Year Analysis",
  "Success Stories",
];

function RelatedBlogs() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={3} />
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
            Related Blog Articles
          </motion.h2>
          <motion.div {...fadeUp}>
            <Button href="/blog" variant="ghost" icon={Newspaper}>
              Read Latest Blogs
            </Button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {BLOGS.map((topic, i) => (
            <motion.div
              key={topic}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className={`card-flat flex aspect-square flex-col items-center justify-center gap-2 px-3 text-center ${PILL_COLORS[i % PILL_COLORS.length]}`}
            >
              <Newspaper size={20} />
              <span className="font-body text-[12px] font-medium">{topic}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   6. Job Alert CTA
   ========================================================= */
function JobAlertCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-2xl border border-line px-6 py-14 text-center sm:px-14"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <span className="ribbon-bar absolute inset-x-0 top-0 h-[4px]" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 800px 400px at 15% 0%, rgba(59,130,246,0.38), transparent 60%), radial-gradient(ellipse 700px 400px at 90% 100%, rgba(245,166,35,0.24), transparent 55%)",
            }}
          />
          <div className="relative">
            <Bell size={26} className="mx-auto text-white" />
            <h2 className="font-display mx-auto mt-4 max-w-[28ch] text-[28px] font-bold text-white sm:text-[38px]">
              Never Miss a Government Job Update!
            </h2>
            <p className="font-body mx-auto mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-text-on-dark-muted">
              Join our WhatsApp channel and YouTube for verified, timely
              updates on every new vacancy, notification, and physical test
              guidance.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href="https://wa.me/918863081082"
                variant="whatsapp"
                icon={MessageCircle}
              >
                Join WhatsApp Channel
              </Button>
              <Button href="https://youtube.com" variant="secondary" icon={Video}>
                Subscribe on YouTube
              </Button>
              <Button href="/blog" variant="primary" icon={Newspaper}>
                Read Latest Blogs
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Jobs() {
  return (
    <>
      <JobsHero />
      <JobCategories />
      <JobListings />
      <GuidanceVideos />
      <RelatedBlogs />
      <JobAlertCTA />
    </>
  );
}
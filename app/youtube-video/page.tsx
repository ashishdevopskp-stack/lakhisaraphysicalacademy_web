"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Video as Youtube,
  MessageCircle,
  Search,
  Calendar,
  PlayCircle,
  Shield,
  ShieldAlert,
  Star,
  ShieldCheck,
  Flame,
  Dumbbell,
  Target,
  Trophy,
  Megaphone,
  Sparkles,
  Bell,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WHATSAPP_NUMBER = "918863081082";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

/* Reusable soft gradient wash for section backgrounds — matches Hero/About/Jobs */
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
function VideosHero() {
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
            Video Library
          </p>

          <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
            YouTube{" "}
            <span className="text-gradient-brand">Videos</span>
          </h1>

          <p className="font-body mt-6 text-[15.5px] font-medium text-text">
            Watch training sessions, recruitment updates &amp; preparation
            guides.
          </p>

          <p className="font-body mt-3.5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
            Explore the latest videos from Lakhisarai Physical Academy,
            including physical training, running tips, recruitment updates,
            student success stories, motivational videos, and fitness
            guidance.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#videos" variant="primary" icon={PlayCircle}>
              Watch Videos
            </Button>
            <Button
              href="https://youtube.com"
              variant="secondary"
              icon={Youtube}
            >
              Subscribe on YouTube
            </Button>
            <Button
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
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
   2. Video Categories
   ========================================================= */
const CATEGORIES = [
  { label: "Army", icon: Shield },
  { label: "Bihar Police", icon: ShieldAlert },
  { label: "Daroga", icon: Star },
  { label: "SSC GD", icon: ShieldCheck },
  { label: "Running Tips", icon: Flame },
  { label: "Fitness & Workout", icon: Dumbbell },
  { label: "Physical Test", icon: Target },
  { label: "Student Success", icon: Trophy },
  { label: "Recruitment Updates", icon: Megaphone },
  { label: "Motivation", icon: Sparkles },
] as const;

function VideoCategories() {
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
          Video Categories
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {CATEGORIES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 5) * 0.04 }}
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
   3. Video Grid — sample data, wire to your CMS/API
   ========================================================= */
interface VideoItem {
  title: string;
  description: string;
  category: string;
  publishDate: string;
  featured?: boolean;
}

const VIDEO_CATEGORY_LABELS = CATEGORIES.map((c) => c.label);

const VIDEOS: VideoItem[] = [
  {
    title: "Army Physical Test Guidance — Complete Breakdown",
    description: "Standards, scoring, and how to train for each event.",
    category: "Army",
    publishDate: "05 Jul 2026",
    featured: true,
  },
  {
    title: "Perfect Running Technique for 1600m",
    description: "Pacing and breathing drills that lower your time.",
    category: "Running Tips",
    publishDate: "01 Jul 2026",
  },
  {
    title: "Bihar Police PET Preparation",
    description: "Race, long jump, and high jump standards explained.",
    category: "Bihar Police",
    publishDate: "26 Jun 2026",
  },
  {
    title: "SSC GD Physical Standards Explained",
    description: "Everything you need to know before appearing.",
    category: "SSC GD",
    publishDate: "18 Jun 2026",
  },
  {
    title: "Bodyweight Strength Routine for Recruits",
    description: "A workout you can do without any equipment.",
    category: "Fitness & Workout",
    publishDate: "10 Jun 2026",
  },
  {
    title: "How I Cleared My Daroga Physical Test",
    description: "A student walks through his preparation journey.",
    category: "Student Success",
    publishDate: "02 Jun 2026",
  },
  {
    title: "Latest Recruitment Notifications — June 2026",
    description: "A quick roundup of open government vacancies.",
    category: "Recruitment Updates",
    publishDate: "28 May 2026",
  },
  {
    title: "Stay Consistent: A Message for Every Aspirant",
    description: "Motivation for the days training feels hard.",
    category: "Motivation",
    publishDate: "20 May 2026",
  },
];

function VideoGrid() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categoryOptions = useMemo(
    () => ["All", ...VIDEO_CATEGORY_LABELS],
    []
  );

  const filtered = VIDEOS.filter((v) => {
    const matchesCategory = category === "All" || v.category === category;
    const matchesQuery =
      query.trim() === "" || v.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featured = filtered.find((v) => v.featured);
  const rest = filtered.filter((v) => v !== featured);

  return (
    <section id="videos" className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          Fresh Uploads
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Latest Videos
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
              placeholder="Search videos"
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
        </motion.div>

        {/* Featured video */}
        {featured && (
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="card-flat mt-8 flex flex-col overflow-hidden sm:flex-row"
          >
            <div className="flex aspect-video items-center justify-center border-b border-line bg-bg-raised-2 sm:w-[55%] sm:border-b-0 sm:border-r">
              <PlayCircle size={36} className="text-signal-strong" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6">
              <span className="font-mono inline-flex w-fit items-center gap-1 rounded-full border border-line-strong bg-bg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal-strong">
                Featured
              </span>
              <h3 className="font-display mt-3 text-[18px] font-semibold text-text">
                {featured.title}
              </h3>
              <p className="font-body mt-2 text-[13px] text-text-muted">
                {featured.description}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span className={`pill ${PILL_COLORS[0]}`}>{featured.category}</span>
                <span className="font-body flex items-center gap-1.5 text-[12px] text-text-faint">
                  <Calendar size={13} /> {featured.publishDate}
                </span>
              </div>
              <div className="mt-5">
                <Button href="https://youtube.com" variant="primary" icon={PlayCircle}>
                  Watch on YouTube
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((video, i) => (
            <motion.div
              key={video.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
              className="card-flat flex flex-col p-5"
            >
              <div className="flex aspect-video items-center justify-center rounded-[12px] border border-line-strong bg-bg-raised-2">
                <PlayCircle size={28} className="text-signal-strong" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <span className={`pill ${PILL_COLORS[(i + 1) % PILL_COLORS.length]}`}>
                  {video.category}
                </span>
                <span className="font-body flex items-center gap-1.5 text-[12px] text-text-faint">
                  <Calendar size={13} /> {video.publishDate}
                </span>
              </div>

              <h3 className="font-display mt-3 text-[15px] font-semibold text-text">
                {video.title}
              </h3>
              <p className="font-body mt-1.5 text-[13px] text-text-muted">
                {video.description}
              </p>

              <div className="mt-5">
                <Button href="https://youtube.com" variant="ghost" icon={PlayCircle}>
                  Watch on YouTube
                </Button>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="font-body col-span-full text-[14px] text-text-muted">
              No videos match these filters right now.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Subscribe CTA
   ========================================================= */
function SubscribeCTA() {
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
              Never Miss a New Video!
            </h2>
            <p className="font-body mx-auto mt-4 max-w-[48ch] text-[15.5px] leading-relaxed text-text-on-dark-muted">
              Subscribe on YouTube and join our WhatsApp channel for new
              training sessions and recruitment updates.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="https://youtube.com" variant="primary" icon={Youtube}>
                Subscribe on YouTube
              </Button>
              <Button
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                variant="whatsapp"
                icon={MessageCircle}
              >
                Join WhatsApp Channel
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
export default function Videos() {
  return (
    <>
      <VideosHero />
      <VideoCategories />
      <VideoGrid />
      <SubscribeCTA />
    </>
  );
}
"use client";

import { useMemo, useState } from "react";
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
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { PHONE_NUMBER } from "@/app/lib/constants";
import {
  CATEGORIES,
  JOB_CATEGORY_LABELS,
  STATUS_STYLES,
  type JobItem,
} from "../lib/jobs-data";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "./_JobsMotion";

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

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
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Job Vacancies
          </p>

          <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
            Latest <span className="text-gradient-brand">Government Job</span> Vacancies
          </h1>

          <p className="font-body mt-6 text-[15.5px] font-medium text-text">
            Stay updated with the latest Defence, Police, Railway &amp; Government recruitment notifications.
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
            <Button href={`https://wa.me/${PHONE_NUMBER}`} variant="whatsapp" icon={MessageCircle}>
              WhatsApp Enquiry
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Job Categories
   ========================================================= */
function JobCategories() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp as="p" className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
          Browse By
        </ScrollFadeUp>
        <ScrollFadeUp
          as="h2"
          delay={0.05}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Job Categories
        </ScrollFadeUp>

        <StaggerList className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <StaggerItem
              key={label}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center"
            >
              <Icon size={20} className="text-signal-strong" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Latest Job Listings (data-driven)
   ========================================================= */
function JobListings({ jobs }: { jobs: JobItem[] }) {
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categoryOptions = useMemo(() => ["All", ...JOB_CATEGORY_LABELS], []);
  const statusOptions = ["All", "New", "Ongoing", "Closed"];

  const filtered = jobs.filter((job) => {
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
        <ScrollFadeUp as="p" className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
          Stay Ahead
        </ScrollFadeUp>
        <ScrollFadeUp
          as="h2"
          delay={0.05}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Latest Job Listings
        </ScrollFadeUp>

        {/* Search & Filter */}
        <ScrollFadeUp
          delay={0.1}
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
        </ScrollFadeUp>

        {/* Cards */}
        {filtered.length === 0 ? (
          <p className="font-body col-span-full mt-8 text-[14px] text-text-muted">
            No vacancies match these filters right now.
          </p>
        ) : (
          <StaggerList className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((job, i) => (
              <StaggerItem key={job.id} className="card-flat flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className={`pill ${PILL_COLORS[i % PILL_COLORS.length]}`}>
                    {job.category}
                  </span>
                  <span className={`font-mono text-[12px] font-medium ${STATUS_STYLES[job.status]}`}>
                    ● {job.status}
                  </span>
                </div>

                <h3 className="font-display mt-4 text-[16px] font-semibold text-text">
                  {job.title}
                </h3>
                {job.subtitle && (
                  <p className="font-body mt-1 text-[13px] text-text-muted">{job.subtitle}</p>
                )}
                <p className="font-body mt-2 text-[13px] text-text-muted">{job.organization}</p>

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
                  {job.detailsUrl && (
                    <Button href={job.detailsUrl} variant="primary" icon={ArrowRight}>
                      Read More
                    </Button>
                  )}
                  {job.pdfUrl && (
                    <Button href={job.pdfUrl} variant="secondary" icon={Download}>
                      Download PDF
                    </Button>
                  )}
                  {job.videoUrl && (
                    <Button href={job.videoUrl} variant="ghost" icon={PlayCircle}>
                      Watch Video
                    </Button>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        )}
      </Container>
    </section>
  );
}

/* =========================================================
   4. Recruitment Guidance Videos — static, unrelated to jobs
   table. Currently unused (see export at bottom).
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
        <ScrollFadeUp as="p" className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
          Watch &amp; Learn
        </ScrollFadeUp>
        <ScrollFadeUp
          as="h2"
          delay={0.05}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Recruitment Guidance Videos
        </ScrollFadeUp>

        <StaggerList className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {VIDEOS.map((video) => (
            <StaggerItem key={video.title} className="card-flat p-5">
              <div className="flex aspect-video items-center justify-center rounded-[12px] border border-line bg-bg-raised-2">
                <PlayCircle size={30} className="text-signal-strong" />
              </div>
              <p className="font-display mt-4 text-[14px] font-semibold text-text">{video.title}</p>
              <p className="font-mono mt-1 text-[12px] text-text-faint">{video.duration}</p>
              <div className="mt-4">
                <Button href="https://youtube.com" variant="ghost" icon={PlayCircle}>
                  Watch Now
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Related Blog Articles — static. Currently unused (see
   export at bottom).
   ========================================================= */
const BLOGS = ["Preparation Tips", "Physical Training Guides", "Exam Strategy", "Previous Year Analysis", "Success Stories"];

function RelatedBlogs() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={3} />
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <ScrollFadeUp as="h2" className="font-display text-[28px] font-bold sm:text-[36px]">
            Related Blog Articles
          </ScrollFadeUp>
          <ScrollFadeUp>
            <Button href="/blog" variant="ghost" icon={Newspaper}>
              Read Latest Blogs
            </Button>
          </ScrollFadeUp>
        </div>

        <StaggerList className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {BLOGS.map((topic, i) => (
            <StaggerItem
              key={topic}
              className={`card-flat flex aspect-square flex-col items-center justify-center gap-2 px-3 text-center ${PILL_COLORS[i % PILL_COLORS.length]}`}
            >
              <Newspaper size={20} />
              <span className="font-body text-[12px] font-medium">{topic}</span>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   6. Job Alert CTA — currently unused (see export at bottom).
   ========================================================= */
function JobAlertCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp
          className="relative overflow-hidden rounded-2xl border border-line px-6 py-14 text-center sm:px-14 bg-navy"
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
              <Button href={`https://wa.me/${PHONE_NUMBER}`} variant="whatsapp" icon={MessageCircle}>
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
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export — receives DB-backed data from
   app/jobs/page.tsx (server component)
   ========================================================= */
export default function JobsClient({ jobs }: { jobs: JobItem[] }) {
  return (
    <>
      <JobsHero />
      <JobCategories />
      <JobListings jobs={jobs} />
      {/* <GuidanceVideos />
      <RelatedBlogs />
      <JobAlertCTA /> */}
    </>
  );
}
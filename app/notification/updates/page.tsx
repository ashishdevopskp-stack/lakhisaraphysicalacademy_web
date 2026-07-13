"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Calendar,
  User,
  Download,
  ArrowRight,
  PlayCircle,
  Flame,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { NotificationsSubNav } from "../page";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

interface NotificationItem {
  title: string;
  subtitle: string;
  category: string;
  publishDate: string;
  publishedBy: string;
  description: string;
  featured?: boolean;
  hasPdf?: boolean;
  hasVideo?: boolean;
}

const NOTIFICATION_CATEGORY_LABELS = [
  "Academy Announcements", "Admission Updates", "New Batch Notifications",
  "Government Job Alerts", "Exam & Admit Card Updates", "Result Announcements",
  "Events & Workshops", "Hostel Updates", "Holiday Notices", "Important Circulars",
];
const TIME_FILTERS = ["All", "Latest", "This Week", "This Month"];

const NOTIFICATIONS: NotificationItem[] = [
  {
    title: "New Batch Starting from 15 July 2026",
    subtitle: "Morning and evening batches open for enrollment",
    category: "New Batch Notifications",
    publishDate: "08 Jul 2026, 10:30 AM",
    publishedBy: "Academy Admin",
    description:
      "Admissions are now open for the new batch starting 15 July 2026. Limited seats available across morning and evening slots.",
    featured: true,
  },
  {
    title: "Army Agniveer Rally Notification Released",
    subtitle: "Open rally dates announced for Bihar region",
    category: "Government Job Alerts",
    publishDate: "06 Jul 2026, 9:00 AM",
    publishedBy: "Academy Admin",
    description:
      "The Indian Army has released the Agniveer open rally schedule for the Bihar region. Eligible candidates should check dates and standards.",
    hasPdf: true,
  },
  {
    title: "Bihar Police Constable Admit Card Released",
    subtitle: "Download your admit card before the exam date",
    category: "Exam & Admit Card Updates",
    publishDate: "03 Jul 2026, 4:15 PM",
    publishedBy: "Academy Admin",
    description:
      "Admit cards for the Bihar Police Constable physical test are now available. Students are advised to download and verify details.",
    hasPdf: true,
  },
  {
    title: "SSC GD Result Declared",
    subtitle: "Check your result and next steps",
    category: "Result Announcements",
    publishDate: "30 Jun 2026, 6:00 PM",
    publishedBy: "Academy Admin",
    description:
      "SSC GD physical test results have been declared. Selected candidates should proceed with document verification as scheduled.",
  },
  {
    title: "Academy Closed for Rath Yatra",
    subtitle: "Holiday notice — training resumes next day",
    category: "Holiday Notices",
    publishDate: "27 Jun 2026, 8:00 AM",
    publishedBy: "Academy Admin",
    description:
      "The academy will remain closed on account of Rath Yatra. Regular training sessions will resume the following day.",
  },
  {
    title: "Free Fitness Workshop This Weekend",
    subtitle: "Open session on running technique and recovery",
    category: "Events & Workshops",
    publishDate: "22 Jun 2026, 11:00 AM",
    publishedBy: "Coach Ravi Kumar",
    description:
      "Join our free weekend workshop covering running technique, injury prevention, and recovery practices. Open to all students.",
    hasVideo: true,
  },
  {
    title: "Hostel Rooms Now Available for New Session",
    subtitle: "Limited seats — apply early to confirm",
    category: "Hostel Updates",
    publishDate: "18 Jun 2026, 2:30 PM",
    publishedBy: "Academy Admin",
    description:
      "Hostel accommodation for the upcoming session is now open. Students preparing away from home are encouraged to apply early.",
  },
  {
    title: "Revised Timings Circular — Effective Immediately",
    subtitle: "Updated morning and evening training slots",
    category: "Important Circulars",
    publishDate: "12 Jun 2026, 7:00 AM",
    publishedBy: "Academy Admin",
    description:
      "Training timings have been revised for the summer schedule. Please check the updated slots and plan your attendance accordingly.",
    hasPdf: true,
  },
];

function UpdatesHero() {
  return (
    <section id="top" className="pb-8 pt-14 sm:pt-20">
      <Container>
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
          Announcements
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[28px] font-bold sm:text-[38px]">
          All <span className="text-gradient-brand">Notifications</span>
        </h1>
        <div className="mt-8">
          <NotificationsSubNav current="/notifications/updates" />
        </div>
      </Container>
    </section>
  );
}

function NotificationListings() {
  const [category, setCategory] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const [query, setQuery] = useState("");

  const categoryOptions = useMemo(
    () => ["All", ...NOTIFICATION_CATEGORY_LABELS],
    []
  );

  const featured = NOTIFICATIONS.find((n) => n.featured);
  const rest = NOTIFICATIONS.filter((n) => !n.featured);

  const filtered = rest.filter((n) => {
    const matchesCategory = category === "All" || n.category === category;
    const matchesQuery =
      query.trim() === "" || n.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="notifications" className="py-12 sm:py-20">
      <Container>
        {/* Featured Notification */}
        {featured && (
          <motion.div
            {...fadeUp}
            className="glass glass-sheen sheen-run relative flex flex-col overflow-hidden rounded-2xl shadow-[var(--shadow-card)] sm:flex-row"
          >
            <span className="ribbon-bar absolute inset-y-0 left-0 w-[4px]" aria-hidden />
            <div
              className="flex aspect-video items-center justify-center border-b border-line sm:w-[45%] sm:border-b-0 sm:border-r"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.07) 0%, transparent 75%)",
              }}
            >
              <Bell size={32} className="text-accent-strong" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6">
              <span className="glass inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-accent-strong">
                <Flame size={11} /> Featured
              </span>
              <h3 className="font-display mt-3 text-[18px] font-semibold text-text">
                {featured.title}
              </h3>
              <p className="font-body mt-1 text-[13px] text-text-muted">
                {featured.subtitle}
              </p>
              <p className="font-body mt-3 text-[13px] leading-relaxed text-text-muted">
                {featured.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-text-muted">
                <Badge>{featured.category}</Badge>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {featured.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <User size={13} /> {featured.publishedBy}
                </span>
              </div>
              <div className="mt-5">
                <Button href="#" variant="primary" icon={ArrowRight}>
                  Read More
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search & Filter */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="glass flex flex-1 items-center gap-2 rounded-lg px-4 py-2.5">
            <Search size={16} className="shrink-0 text-text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notifications"
              className="w-full bg-transparent text-[14px] text-text outline-none placeholder:text-text-faint"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="glass rounded-lg px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>

          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="glass rounded-lg px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {TIME_FILTERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
              className="card-flat flex flex-col p-6"
            >
              <div
                className="flex aspect-[16/9] items-center justify-center rounded-lg border border-line"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 75%)",
                }}
              >
                <Bell size={24} className="text-text-faint" />
              </div>

              <div className="mt-4">
                <Badge>{item.category}</Badge>
              </div>

              <h3 className="font-display mt-3 text-[15px] font-semibold text-text">
                {item.title}
              </h3>
              <p className="font-body mt-1 text-[13px] text-text-muted">
                {item.subtitle}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {item.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <User size={13} /> {item.publishedBy}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button href="#" variant="primary" icon={ArrowRight}>
                  Read More
                </Button>
                {item.hasPdf && (
                  <Button href="#" variant="secondary" icon={Download}>
                    Download PDF
                  </Button>
                )}
                {item.hasVideo && (
                  <Button href="#" variant="ghost" icon={PlayCircle}>
                    Watch Video
                  </Button>
                )}
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="font-body col-span-full text-[14px] text-text-muted">
              No notifications match these filters right now.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

export default function NotificationUpdatesPage() {
  return (
    <>
      <UpdatesHero />
      <NotificationListings />
    </>
  );
}
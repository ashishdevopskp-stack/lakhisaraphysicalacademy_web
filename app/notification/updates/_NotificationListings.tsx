// app/notification/updates/_NotificationListings.tsx
"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Search,
  Calendar,
  User,
  Download,
  ArrowRight,
  PlayCircle,
  Flame,
  Filter,
  Megaphone,
  ClipboardList,
  GraduationCap,
  Shield,
  CalendarClock,
  Trophy,
  PartyPopper,
  Building2,
  AlertTriangle,
  FileText,
  Sparkles,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { ScrollFadeUp, StaggerList, StaggerItem } from "../_NotificationMotion";
import { NotificationsSubNav } from "../page";

interface NotificationItem {
  id: string;
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

const CATEGORIES_WITH_ICONS = [
  { label: "All", icon: Sparkles },
  { label: "Academy Announcements", icon: Megaphone },
  { label: "Admission Updates", icon: ClipboardList },
  { label: "New Batch Notifications", icon: GraduationCap },
  { label: "Government Job Alerts", icon: Shield },
  { label: "Exam & Admit Card Updates", icon: CalendarClock },
  { label: "Result Announcements", icon: Trophy },
  { label: "Events & Workshops", icon: PartyPopper },
  { label: "Hostel Updates", icon: Building2 },
  { label: "Holiday Notices", icon: AlertTriangle },
  { label: "Important Circulars", icon: FileText },
];

const TIME_FILTERS = ["All", "Latest", "This Week", "This Month"];

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "New Batch Starting from 15 July 2026",
    subtitle: "Morning and evening batches open for enrollment",
    category: "New Batch Notifications",
    publishDate: "08 Jul 2026, 10:30 AM",
    publishedBy: "Academy Admin",
    description:
      "Admissions are now open for the new batch starting 15 July 2026. Limited seats available across morning and evening slots at K.R.K Field, Lakhisarai ground.",
    featured: true,
  },
  {
    id: "n2",
    title: "Army Agniveer Rally Notification Released",
    subtitle: "Open rally dates announced for Bihar region",
    category: "Government Job Alerts",
    publishDate: "06 Jul 2026, 9:00 AM",
    publishedBy: "Academy Admin",
    description:
      "The Indian Army has released the Agniveer open rally schedule for the Bihar region. Eligible candidates should check physical measurement standards.",
    hasPdf: true,
  },
  {
    id: "n3",
    title: "Bihar Police Constable Admit Card Released",
    subtitle: "Download your admit card before the physical test date",
    category: "Exam & Admit Card Updates",
    publishDate: "03 Jul 2026, 4:15 PM",
    publishedBy: "Academy Admin",
    description:
      "Admit cards for the Bihar Police Constable physical test (1600m run, High Jump, Shot Put) are now available.",
    hasPdf: true,
  },
  {
    id: "n4",
    title: "SSC GD Result Declared",
    subtitle: "Check your result and next steps for physical verification",
    category: "Result Announcements",
    publishDate: "30 Jun 2026, 6:00 PM",
    publishedBy: "Academy Admin",
    description:
      "SSC GD physical test results have been declared. Selected candidates should proceed with document verification as scheduled.",
  },
  {
    id: "n5",
    title: "Academy Holiday Notice",
    subtitle: "Ground training holiday notice — resumes next day",
    category: "Holiday Notices",
    publishDate: "27 Jun 2026, 8:00 AM",
    publishedBy: "Academy Admin",
    description:
      "The physical ground training will remain closed for one day. Regular morning 5:00 AM sessions will resume the following day.",
  },
  {
    id: "n6",
    title: "Free Fitness & High Jump Workshop This Weekend",
    subtitle: "Special session on Scissor & Tiger Jump techniques",
    category: "Events & Workshops",
    publishDate: "22 Jun 2026, 11:00 AM",
    publishedBy: "Coach Ganesh Sir",
    description:
      "Join our free weekend workshop covering 1600m pacing strategy, high jump techniques, and stamina building.",
    hasVideo: true,
  },
  {
    id: "n7",
    title: "Hostel Rooms Now Available for New Batch",
    subtitle: "Clean rooms with 3 days veg / 3 days non-veg mess",
    category: "Hostel Updates",
    publishDate: "18 Jun 2026, 2:30 PM",
    publishedBy: "Academy Admin",
    description:
      "Hostel accommodation for outstation candidates is open. Food charges included in hostel fee package.",
  },
  {
    id: "n8",
    title: "Revised Summer Ground Timings Circular",
    subtitle: "Updated morning (5:00 AM) & evening (4:30 PM) slots",
    category: "Important Circulars",
    publishDate: "12 Jun 2026, 7:00 AM",
    publishedBy: "Academy Admin",
    description:
      "Training timings have been revised for summer schedule. Please check updated ground timing slots.",
    hasPdf: true,
  },
  {
    id: "n9",
    title: "Bihar Daroga SI Physical Date Announcement",
    subtitle: "Physical efficiency test dates announced by BPSSC",
    category: "Admission Updates",
    publishDate: "05 Jun 2026, 3:00 PM",
    publishedBy: "Academy Admin",
    description:
      "BPSSC Bihar Daroga SI physical test dates announced. Special 1600m & 1500m endurance training starting at ground.",
  },
  {
    id: "n10",
    title: "Academy Official Announcement: App Launched",
    subtitle: "Download official mobile app for direct admission & notes",
    category: "Academy Announcements",
    publishDate: "01 Jun 2026, 9:00 AM",
    publishedBy: "Academy Admin",
    description:
      "Lakhisarai Physical Academy mobile app is live on Google Play Store. Apply for admission and access batch updates directly.",
  },
];

export default function NotificationListings() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const [query, setQuery] = useState("");

  const featured = NOTIFICATIONS.find((n) => n.featured);
  const rest = NOTIFICATIONS.filter((n) => !n.featured);

  const filtered = NOTIFICATIONS.filter((n) => {
    const matchesCategory =
      selectedCategory === "All" || n.category === selectedCategory;
    const matchesQuery =
      query.trim() === "" ||
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="notifications" className="py-8 sm:py-16">
      <Container>
        {/* Top Navigation Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="mb-3">
              <NotificationsSubNav current="/notification/updates" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Notification <span className="text-[#ea580c]">Board</span>
            </h2>
          </div>

          {/* Quick Counter Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 font-extrabold text-xs shrink-0">
            <Bell size={15} />
            <span>Showing {filtered.length} Notifications</span>
          </div>
        </div>

        {/* Featured Announcement */}
        {featured && selectedCategory === "All" && query === "" && (
          <div className="mb-10 bento-card bento-card-saffron p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea580c] text-white text-xs font-black shadow-md">
                  <Flame size={13} />
                  <span>Featured Announcement</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">{featured.title}</h3>
                <p className="text-sm font-semibold text-slate-700 max-w-2xl">{featured.subtitle}</p>
                <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-3xl bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {featured.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 pt-1">
                  <span className="px-2.5 py-1 bg-emerald-50 text-[#138808] border border-emerald-300 rounded-full font-black">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-[#ea580c]" /> {featured.publishDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={13} className="text-slate-400" /> {featured.publishedBy}
                  </span>
                </div>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange shrink-0 py-3 px-6 text-sm"
              >
                <span>Check Details</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}

        {/* Category Selection Filter Pills Strip */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-3">
            <p className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter size={14} className="text-[#ea580c]" />
              <span>Select Notification Category</span>
            </p>
            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="text-xs font-black text-[#ea580c] hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES_WITH_ICONS.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.label;
              const count =
                cat.label === "All"
                  ? NOTIFICATIONS.length
                  : NOTIFICATIONS.filter((n) => n.category === cat.label).length;

              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#ea580c] text-white border-orange-600 shadow-md shadow-orange-500/25 scale-[1.02]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-orange-400 hover:bg-orange-50/50"
                  }`}
                >
                  <Icon size={14} className={isSelected ? "text-white" : "text-[#ea580c]"} />
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input & Time Filter Bar */}
        <div className="mb-8 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
          <div className="flex flex-1 items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200/80 w-full">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, exam, or keyword..."
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 outline-none cursor-pointer w-full sm:w-auto"
            >
              {TIME_FILTERS.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All Time" : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => {
            const borderClass =
              idx % 3 === 0
                ? "bento-card-saffron"
                : idx % 3 === 1
                ? "bento-card-green"
                : "bento-card-navy";

            return (
              <div
                key={item.id}
                className={`bento-card ${borderClass} p-5 flex flex-col justify-between shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-orange-50 text-[#ea580c] border border-orange-200 font-extrabold text-[11px] rounded-full">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      {item.publishDate.split(",")[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-xs font-bold text-slate-600 mt-1">{item.subtitle}</p>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <User size={12} className="text-[#ea580c]" /> {item.publishedBy}
                  </span>

                  <a
                    href="https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black text-[#ea580c] hover:underline flex items-center gap-1"
                  >
                    <span>View App</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <Bell size={32} className="mx-auto text-slate-400 mb-3" />
              <p className="text-base font-black text-slate-800">No notifications found</p>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Try selecting &apos;All&apos; or changing your search keywords.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setQuery("");
                }}
                className="mt-4 btn-orange py-2 px-5 text-xs inline-flex"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
"use client";

import { useMemo, useState } from "react";
import {
  Download,
  MessageCircle,
  Search,
  Calendar,
  PlayCircle,
  FileText,
  DownloadCloud,
  Bell,
  Sparkles,
  Flame,
  Award,
  Salad,
  Dumbbell,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { CATEGORIES, RESOURCE_CATEGORY_LABELS, type ResourceItem } from "../lib/resourses-data";
import { incrementDownloadCount } from "@/app/lib/action/resources";
import { PHONE_NUMBER } from "@/app/lib/constants";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "./_ResourcesMotion";

/* =========================================================
   Default Curated Official Academy Resources
   ========================================================= */
const DEFAULT_ACADEMY_RESOURCES: ResourceItem[] = [
  {
    id: "def-1",
    title: "1600m Running & Endurance Lap Pacing Chart (PDF)",
    description: "Daily lap timing chart, breathing techniques, and 4-week 1600m stamina schedule by Ganesh Sir.",
    category: "Running Chart",
    publishDate: "2026-08-01",
    downloads: 1420,
    fileUrl: "https://whatsapp.com/channel/0029VaAoQ1gDjiOa3By7bM3s",
    videoUrl: null,
    thumbnailUrl: null,
    hasVideo: false,
  },
  {
    id: "def-2",
    title: "Bihar Police & Daroga PET Physical Standards (Official PDF)",
    description: "Exact height, chest, shot-put weight (16lb/12lb), and high jump scoring charts as per CSBC/BPSSC.",
    category: "Physical Standards",
    publishDate: "2026-07-28",
    downloads: 2150,
    fileUrl: "https://whatsapp.com/channel/0029VaAoQ1gDjiOa3By7bM3s",
    videoUrl: null,
    thumbnailUrl: null,
    hasVideo: false,
  },
  {
    id: "def-3",
    title: "Defence Aspirants High-Protein Diet & Recovery Chart",
    description: "Pre-workout energy meals, post-running recovery diet, and natural stamina boosters for morning batches.",
    category: "Diet Plan",
    publishDate: "2026-07-20",
    downloads: 1890,
    fileUrl: "https://whatsapp.com/channel/0029VaAoQ1gDjiOa3By7bM3s",
    videoUrl: null,
    thumbnailUrl: null,
    hasVideo: false,
  },
  {
    id: "def-4",
    title: "Bihar Special GK & Samanya Vigyan Quick Revision Notes",
    description: "Top 500+ expected MCQs for Bihar Police Constable & SI written exams with answer key.",
    category: "Exam Notes",
    publishDate: "2026-07-15",
    downloads: 3100,
    fileUrl: "https://whatsapp.com/channel/0029VaAoQ1gDjiOa3By7bM3s",
    videoUrl: null,
    thumbnailUrl: null,
    hasVideo: false,
  },
];

/* =========================================================
   1. Hero
   ========================================================= */
function ResourcesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-14 sm:pb-20 sm:pt-20 bg-gradient-to-b from-orange-50/80 via-[#faf7f0] to-white border-b border-orange-200/60">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(234,88,12,0.14), transparent 70%)",
        }}
      />
      <Container>
        <FadeInUp className="max-w-[70ch]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-300 text-xs font-black text-orange-800 shadow-2xs mb-4">
            <Sparkles size={14} className="text-orange-600" />
            <span>🇮🇳 FREE ACADEMY STUDY &amp; PHYSICAL TRAINING MATERIAL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Free Downloads &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600">Training Resources</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
            Access free study notes, running lap charts, physical standards PDFs, high-protein diet guides, and written exam materials.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#resources" variant="primary" icon={Download}>
              Browse Free Downloads
            </Button>
            <Button
              href={`https://wa.me/${PHONE_NUMBER}`}
              variant="whatsapp"
              icon={MessageCircle}
            >
              WhatsApp Enquiry
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Resource Categories Bar
   ========================================================= */
function ResourceCategories() {
  const categoryHighlights = [
    { label: "Running Charts", icon: Flame, color: "from-orange-500 to-amber-600", desc: "1600m Pacing & Stamina" },
    { label: "Physical Standards", icon: Award, color: "from-[#ff9933] to-[#138808]", desc: "Height, Chest & PET" },
    { label: "Diet & Nutrition", icon: Salad, color: "from-green-600 to-emerald-600", desc: "Pre & Post Workout" },
    { label: "Workout Drills", icon: Dumbbell, color: "from-purple-600 to-pink-600", desc: "High Jump & Strength" },
    { label: "Exam Notes", icon: BookOpen, color: "from-blue-600 to-indigo-600", desc: "Bihar GK & Science PDF" },
  ];

  return (
    <section className="py-10 bg-white border-b border-slate-200/80">
      <Container>
        <ScrollFadeUp as="h2" className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <ShieldCheck size={20} className="text-orange-600" />
          <span>Popular Resource Categories</span>
        </ScrollFadeUp>

        <StaggerList className="grid grid-cols-2 gap-3.5 sm:grid-cols-5">
          {categoryHighlights.map((cat) => {
            const Icon = cat.icon;
            return (
              <StaggerItem
                key={cat.label}
                className="group relative flex flex-col items-center justify-between p-4 text-center rounded-3xl bg-slate-50 border-2 border-slate-200/80 hover:border-orange-400 hover:bg-white shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-md group-hover:scale-110 transition-transform mb-2`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                  {cat.label}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
                  {cat.desc}
                </span>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Resource Grid Section
   ========================================================= */
function ResourceGrid({ resources }: { resources: ResourceItem[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const initialItems = resources.length > 0 ? resources : DEFAULT_ACADEMY_RESOURCES;
  const [items, setItems] = useState(initialItems);

  const categoryOptions = useMemo(() => ["All", ...RESOURCE_CATEGORY_LABELS], []);

  const filtered = items.filter((r) => {
    const matchesCategory = category === "All" || r.category === category;
    const matchesQuery =
      query.trim() === "" ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  function handleDownload(resource: ResourceItem) {
    const targetUrl = resource.fileUrl || "https://whatsapp.com/channel/0029VaAoQ1gDjiOa3By7bM3s";
    window.open(targetUrl, "_blank", "noopener,noreferrer");

    setItems((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
    );

    incrementDownloadCount(resource.id).catch((err) => {
      console.error("Failed to record download:", err);
    });
  }

  return (
    <section id="resources" className="py-14 sm:py-20 bg-slate-50">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
              Free Downloads Library
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Latest Study Notes &amp; Physical Charts
            </h2>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes, PDFs, charts..."
                className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white border-2 border-slate-200 text-xs font-extrabold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 shadow-xs"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="py-2 px-3 rounded-2xl bg-white border-2 border-slate-200 text-xs font-extrabold text-slate-800 outline-none shadow-xs"
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resource Cards */}
        <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((resource) => (
            <StaggerItem
              key={resource.id}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-orange-400 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200">
                    {resource.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <DownloadCloud size={13} className="text-orange-600" />
                    <span>{resource.downloads.toLocaleString("en-IN")}</span>
                  </span>
                </div>

                {resource.thumbnailUrl ? (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 aspect-[16/10] mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resource.thumbnailUrl}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-emerald-50 border border-orange-200/80 mb-4">
                    <FileText size={32} className="text-orange-600" />
                  </div>
                )}

                <h3 className="text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {resource.title}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {resource.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                  <Calendar size={12} />
                  <span>{resource.publishDate}</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleDownload(resource)}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Stay Updated CTA
   ========================================================= */
function StayUpdatedCTA() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <Container>
        <ScrollFadeUp className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 sm:p-14 text-center shadow-2xl border-2 border-emerald-500/40 text-white">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto mb-4">
            <Bell size={28} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white max-w-xl mx-auto leading-tight">
            New Free PDFs &amp; Charts Uploaded Every Week
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-lg mx-auto font-medium">
            Join our official Lakhisarai Physical Academy WhatsApp channel to get instant alerts whenever new notes, PET standards, and diet charts are released.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://whatsapp.com/channel/0029VaAoQ1gDjiOa3By7bM3s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
            >
              <MessageCircle size={18} />
              <span>Join Official WhatsApp Channel</span>
            </a>
          </div>
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

/* =========================================================
   Export ResourcesClient
   ========================================================= */
export default function ResourcesClient({ resources }: { resources: ResourceItem[] }) {
  return (
    <>
      <ResourcesHero />
      <ResourceCategories />
      <ResourceGrid resources={resources} />
      <StayUpdatedCTA />
    </>
  );
}
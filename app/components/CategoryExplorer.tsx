"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Building2,
  ShoppingBag,
  BookOpen,
  Video,
  Trophy,
  Calendar,
  FileText,
  Briefcase,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Layers,
  Search,
} from "lucide-react";

export const ACADEMY_CATEGORIES = [
  {
    id: "courses",
    title: "Courses & Training Batches",
    subtitle: "Bihar Police, Army Agniveer, SSC GD & Daroga PET",
    href: "/courses",
    icon: Dumbbell,
    color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-600",
    badge: "Active Batches",
    badgeColor: "bg-orange-100 text-orange-700 border-orange-200",
    itemCount: "8 Programs",
    subcategories: [
      { name: "Overview", href: "/courses" },
      { name: "Training Programs", href: "/courses/programs" },
      { name: "Ground Schedule", href: "/courses/schedule" },
      { name: "Facilities", href: "/courses/facilities" },
      { name: "Fees & Admission", href: "/courses/fees-admission" },
      { name: "PET FAQ", href: "/courses/faq" },
    ],
  },
  {
    id: "hostel",
    title: "Hostel & Bhojanalaya",
    subtitle: "Lodging, Hygienic Mess Food & 24/7 Security",
    href: "/hostel",
    icon: Building2,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-600",
    badge: "In-Campus",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    itemCount: "4 Facilities",
    subcategories: [
      { name: "Hostel Rules", href: "/hostel/rules" },
      { name: "Daily Mess Menu", href: "/hostel/mess-menu" },
      { name: "Facilities & Security", href: "/hostel/facilities" },
      { name: "Fee Structure", href: "/hostel/fee-structure" },
    ],
  },
  {
    id: "store",
    title: "Academy Store",
    subtitle: "Official Uniforms, Running Shoes & Training Kits",
    href: "/store",
    icon: ShoppingBag,
    color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-600",
    badge: "Official Gear",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    itemCount: "15+ Products",
    subcategories: [
      { name: "Training Kits", href: "/store" },
      { name: "Running Shoes", href: "/store" },
      { name: "Academy Uniforms", href: "/store" },
      { name: "Tracksuits", href: "/store" },
    ],
  },
  {
    id: "results",
    title: "Placed Achievements",
    subtitle: "Hall of Fame — 1,200+ Verified Selections",
    href: "/result",
    icon: Trophy,
    color: "from-yellow-500/25 to-amber-500/15 border-yellow-500/40 text-amber-600",
    badge: "1,200+ Selected",
    badgeColor: "bg-yellow-100 text-amber-900 border-yellow-300 font-black",
    itemCount: "Hall of Fame",
    subcategories: [
      { name: "Bihar Police Selections", href: "/result" },
      { name: "Army Agnipath", href: "/result" },
      { name: "SSC GD Winners", href: "/result" },
      { name: "Female Candidates", href: "/result" },
    ],
  },
  {
    id: "blogs",
    title: "Blog & Fitness Guides",
    subtitle: "Physical Tips, Diet Charts & Written Exam Prep",
    href: "/blogs",
    icon: BookOpen,
    color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-600",
    badge: "Weekly Articles",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    itemCount: "25+ Articles",
    subcategories: [
      { name: "1600m Running Tips", href: "/blogs" },
      { name: "High Jump Technique", href: "/blogs" },
      { name: "Diet & Nutrition", href: "/blogs" },
      { name: "Exam Strategy", href: "/blogs" },
    ],
  },
  {
    id: "videos",
    title: "YouTube Ground Videos",
    subtitle: "Live Ground Workout, High Jump & Selection Videos",
    href: "/youtube-video",
    icon: Video,
    color: "from-red-500/20 to-rose-500/10 border-red-500/30 text-red-600",
    badge: "Official Channel",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    itemCount: "50+ Videos",
    subcategories: [
      { name: "Ground Workout", href: "/youtube-video" },
      { name: "High Jump Drills", href: "/youtube-video" },
      { name: "Candidate Interviews", href: "/youtube-video" },
    ],
  },
  {
    id: "jobs",
    title: "Government Jobs & Vacancies",
    subtitle: "Bihar Police, Army, SSC & Railway Bharti Updates",
    href: "/jobs",
    icon: Briefcase,
    color: "from-cyan-500/20 to-sky-500/10 border-cyan-500/30 text-cyan-700",
    badge: "Latest Alerts",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    itemCount: "Live Alerts",
    subcategories: [
      { name: "Bihar Police Constable", href: "/jobs" },
      { name: "SSC GD Vacancies", href: "/jobs" },
      { name: "Army Bharti Rally", href: "/jobs" },
    ],
  },
  {
    id: "events",
    title: "Events & Mock Trials",
    subtitle: "Weekly Sunday 1600m Time Trial & Sports Meets",
    href: "/events",
    icon: Calendar,
    color: "from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-700",
    badge: "Weekly Tests",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    itemCount: "Weekly Events",
    subcategories: [
      { name: "Sunday Time Trial", href: "/events" },
      { name: "Selection Trials", href: "/events" },
      { name: "Marathon Meet", href: "/events" },
    ],
  },
  {
    id: "resources",
    title: "Resources & Syllabi",
    subtitle: "PET Standards, Height/Chest Specs & Question Papers",
    href: "/resources",
    icon: FileText,
    color: "from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-700",
    badge: "Free Downloads",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    itemCount: "PDF Material",
    subcategories: [
      { name: "PET Standard Chart", href: "/resources" },
      { name: "Medical Test Guide", href: "/resources" },
      { name: "Physical Rulebook", href: "/resources" },
    ],
  },
  {
    id: "about",
    title: "About Academy & Coaches",
    subtitle: "Ganesh Sir, Mahesh Sir & Training Ground Map",
    href: "/about",
    icon: ShieldAlert,
    color: "from-emerald-900/15 to-slate-900/10 border-emerald-800/30 text-emerald-800",
    badge: "Since 2018",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    itemCount: "KRK Ground",
    subcategories: [
      { name: "Founder Ganesh Sir", href: "/about#coaches" },
      { name: "Coach Mahesh Sir", href: "/about#coaches" },
      { name: "KRK Field Location", href: "/about#location" },
    ],
  },
];

export default function CategoryExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCategories = ACADEMY_CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.subcategories.some((sub) => sub.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "training") return matchesSearch && (cat.id === "courses" || cat.id === "hostel" || cat.id === "events");
    if (activeFilter === "updates") return matchesSearch && (cat.id === "blogs" || cat.id === "videos" || cat.id === "jobs");
    if (activeFilter === "store-results") return matchesSearch && (cat.id === "store" || cat.id === "results" || cat.id === "resources");
    return matchesSearch;
  });

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 via-[#faf7f0]/60 to-white relative overflow-hidden">
      {/* Decorative Subtle Background Accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-amber-500/30 text-xs font-black text-amber-800 shadow-sm">
              <Layers size={14} className="text-[#ea580c]" />
              <span className="uppercase tracking-wider">Explore All Categories &amp; Subcategories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Academy <span className="text-[#ea580c]">Interactive User Hub</span>
            </h2>
            <p className="text-sm text-slate-600 font-medium max-w-2xl">
              Select any category or subcategory below to explore training programs, hostel facilities, store gear, candidate results, and daily updates.
            </p>
          </div>

          {/* Quick Search & Filter Chips */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input Box */}
            <div className="relative min-w-[240px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search categories or subcategories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-extrabold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200/80 pb-4">
          {[
            { id: "all", label: "All Categories (10)" },
            { id: "training", label: "Physical Training & Hostel" },
            { id: "updates", label: "Blogs, Videos & Jobs" },
            { id: "store-results", label: "Store, Results & Resources" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-amber-50 hover:text-amber-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categories Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-amber-500/40 overflow-hidden"
              >
                {/* Subtle Gradient Accent Header Strip */}
                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${cat.color}`} />

                <div>
                  {/* Top Card Bar: Icon, Title & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${cat.color} border shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${cat.badgeColor}`}>
                          {cat.badge}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight group-hover:text-[#ea580c] transition-colors mt-0.5">
                          {cat.title}
                        </h3>
                      </div>
                    </div>

                    <Link
                      href={cat.href}
                      className="p-2 rounded-xl bg-slate-100 group-hover:bg-[#ea580c] group-hover:text-white text-slate-600 transition-all shadow-sm shrink-0"
                      aria-label={`Visit ${cat.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs font-medium text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {cat.subtitle}
                  </p>

                  {/* Subcategories List Cards & Pills */}
                  <div className="space-y-2 mb-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Sparkles size={11} className="text-amber-500" />
                      <span>Subcategories &amp; Direct Links</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-amber-100/70 border border-slate-200/80 hover:border-amber-400/50 text-[11px] font-extrabold text-slate-700 hover:text-amber-900 transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <span>{sub.name}</span>
                          <ChevronRight size={12} className="text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-500">{cat.itemCount}</span>
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#ea580c] hover:underline"
                  >
                    <span>View All Content</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

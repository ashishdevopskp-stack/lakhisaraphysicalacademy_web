"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { brand } from "../lib/site-data";
import { PHONE_NUMBER, whatsappHref, telHref } from "../lib/constants";
import {
  Home,
  Building2,
  BookOpen,
  Video,
  ShoppingBag,
  ShieldAlert,
  Dumbbell,
  Trophy,
  Calendar,
  FileText,
  Bell,
  Briefcase,
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS_WITH_ICONS = [
  { label: "Home", href: "/", icon: Home, color: "bg-orange-500/10 text-[#ea580c] border-orange-500/20" },
  { label: "Hostel", href: "/hostel", icon: Building2, color: "bg-emerald-500/10 text-[#138808] border-emerald-500/20" },
  { label: "Blog", href: "/blogs", icon: BookOpen, color: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
  { label: "YouTube Videos", href: "/youtube-video", icon: Video, color: "bg-red-500/10 text-red-600 border-red-500/20" },
  { label: "Store", href: "/store", icon: ShoppingBag, color: "bg-amber-500/10 text-amber-700 border-amber-500/20" },
  { label: "About Us", href: "/about", icon: ShieldAlert, color: "bg-[#2b4c2b]/15 text-[#2b4c2b] border-[#2b4c2b]/20" },
  { label: "Courses", href: "/courses", icon: Dumbbell, color: "bg-purple-500/10 text-purple-700 border-purple-500/20" },
  { label: "Placed Achievements", href: "/result", icon: Trophy, color: "bg-yellow-500/10 text-amber-600 border-yellow-500/20" },
  { label: "Events", href: "/events", icon: Calendar, color: "bg-teal-500/10 text-teal-700 border-teal-500/20" },
  { label: "Resources", href: "/resources", icon: FileText, color: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20" },
  { label: "Notifications", href: "/notification", icon: Bell, color: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
  { label: "Jobs", href: "/jobs", icon: Briefcase, color: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20" },
];

const PRIMARY_NAV = NAV_ITEMS_WITH_ICONS.slice(0, 6);
const SECONDARY_NAV = NAV_ITEMS_WITH_ICONS.slice(6);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 pb-3 sm:px-6 sm:pt-4 sm:pb-4">
      <div className="mx-auto max-w-7xl">
        {/* Liquid Motion Translucent Pill Bar Container */}
        <div className="relative rounded-full border border-amber-500/20 bg-[#faf7f0]/85 px-4 py-2.5 shadow-[0_10px_35px_-5px_rgba(217,119,6,0.12)] backdrop-blur-xl sm:px-6 sm:py-3 z-50 transition-all duration-300">
          {/* Subtle Golden Saffron Liquid Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#ff9933] via-amber-400 to-[#138808] rounded-t-full opacity-90" />

          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative shrink-0">
                <Image
                  src="/logo.png"
                  alt={brand.shortName}
                  width={42}
                  height={42}
                  priority
                  className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-amber-500/40 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] sm:text-[17px] lg:text-[18px] font-black tracking-tight text-slate-900 leading-tight truncate max-w-[140px] sm:max-w-none">
                  {brand.shortName}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-amber-600 hidden md:inline-block tracking-wider uppercase">
                  Lakhisarai, Bihar (India)
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-[#f3efe6]/80 p-1.5 rounded-full border border-amber-500/15 shrink-0 shadow-inner">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-1.5 text-[14px] font-extrabold text-slate-800 rounded-full hover:text-amber-800 hover:bg-white/90 hover:shadow-sm transition-all whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}

              {/* More Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 px-4 py-1.5 text-[14px] font-extrabold text-slate-800 rounded-full hover:text-amber-800 hover:bg-white/90 transition-all cursor-pointer"
                >
                  <span>More</span>
                  <ChevronDown size={15} className={`transition-transform duration-200 ${moreOpen ? "rotate-180 text-amber-600" : ""}`} />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-amber-500/20 bg-[#faf7f0]/95 p-2.5 shadow-2xl backdrop-blur-xl border-t-4 border-t-amber-500 z-50 animate-[fadeIn_0.15s_ease-out]">
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-700/70 border-b border-amber-200/50 mb-1">
                      Explore Academy
                    </div>
                    {SECONDARY_NAV.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreOpen(false)}
                          className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-extrabold text-slate-700 hover:bg-amber-100/60 hover:text-amber-800 rounded-xl transition-colors"
                        >
                          <Icon size={15} className="text-[#ea580c]" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Action CTAs */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-extrabold text-[#138808] bg-emerald-50 rounded-full border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-sm"
              >
                <MessageCircle className="h-4 w-4 text-[#138808]" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>

              <a
                href={telHref(PHONE_NUMBER)}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-black text-white bg-[#ea580c] rounded-full shadow-lg shadow-orange-500/25 hover:bg-[#c2410c] transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded-full border border-amber-500/30 bg-amber-50 text-slate-800 hover:bg-amber-100 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileOpen ? <X size={20} className="text-[#ea580c]" /> : <Menu size={20} className="text-slate-800" />}
              </button>
            </div>
          </div>
        </div>

        {/* Super Modern User Panel Category Drawer */}
        {mobileOpen && (
          <div className="mt-2.5 max-h-[82vh] overflow-y-auto rounded-3xl border-2 border-amber-300 bg-gradient-to-b from-[#fffcf7] via-white to-slate-50 p-3.5 sm:p-5 shadow-2xl xl:hidden z-50 space-y-3.5 animate-[fadeIn_0.15s_ease-out]">
            {/* Header Tiranga Banner */}
            <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#ff9933] via-amber-500 to-[#138808] text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-200 animate-spin" />
                <div>
                  <h3 className="text-xs font-black tracking-wide uppercase">Academy User Panel &amp; Categories</h3>
                  <p className="text-[10px] font-bold text-amber-100">Select any category or subcategory</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-black backdrop-blur-md">
                12 Categories
              </span>
            </div>

            {/* Structured Category & Subcategory Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                {
                  label: "Home Page",
                  href: "/",
                  icon: Home,
                  color: "bg-orange-500/10 text-[#ea580c] border-orange-500/20",
                  badge: "Main Hub",
                  subs: [{ name: "Hero Section", href: "/#top" }, { name: "Coaches", href: "/about#coaches" }],
                },
                {
                  label: "Courses & Training",
                  href: "/courses",
                  icon: Dumbbell,
                  color: "bg-purple-500/10 text-purple-700 border-purple-500/20",
                  badge: "Active Batches",
                  subs: [{ name: "Programs", href: "/courses/programs" }, { name: "Schedule", href: "/courses/schedule" }, { name: "Fees", href: "/courses/fees-admission" }],
                },
                {
                  label: "Hostel & Mess",
                  href: "/hostel",
                  icon: Building2,
                  color: "bg-emerald-500/10 text-[#138808] border-emerald-500/20",
                  badge: "In-Campus",
                  subs: [{ name: "Rules", href: "/hostel/rules" }, { name: "Mess Menu", href: "/hostel/mess-menu" }, { name: "Facilities", href: "/hostel/facilities" }],
                },
                {
                  label: "Academy Store",
                  href: "/store",
                  icon: ShoppingBag,
                  color: "bg-amber-500/10 text-amber-700 border-amber-500/20",
                  badge: "Official Gear",
                  subs: [{ name: "Uniforms", href: "/store" }, { name: "Shoes", href: "/store" }, { name: "Kits", href: "/store" }],
                },
                {
                  label: "Placed Achievements",
                  href: "/result",
                  icon: Trophy,
                  color: "bg-yellow-500/10 text-amber-600 border-yellow-500/20",
                  badge: "1,200+ Selected",
                  subs: [{ name: "Bihar Police", href: "/result" }, { name: "Army Agniveer", href: "/result" }, { name: "SSC GD", href: "/result" }],
                },
                {
                  label: "Blogs & Tips",
                  href: "/blogs",
                  icon: BookOpen,
                  color: "bg-blue-500/10 text-blue-700 border-blue-500/20",
                  badge: "Fitness Guides",
                  subs: [{ name: "1600m Running", href: "/blogs" }, { name: "High Jump Drills", href: "/blogs" }, { name: "Diet Chart", href: "/blogs" }],
                },
                {
                  label: "YouTube Videos",
                  href: "/youtube-video",
                  icon: Video,
                  color: "bg-red-500/10 text-red-600 border-red-500/20",
                  badge: "Ground Videos",
                  subs: [{ name: "Live Workout", href: "/youtube-video" }, { name: "High Jump", href: "/youtube-video" }],
                },
                {
                  label: "Jobs & Vacancies",
                  href: "/jobs",
                  icon: Briefcase,
                  color: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20",
                  badge: "Govt Bharti",
                  subs: [{ name: "Bihar Police", href: "/jobs" }, { name: "Army Rally", href: "/jobs" }, { name: "SSC GD", href: "/jobs" }],
                },
                {
                  label: "Events & Mock PET",
                  href: "/events",
                  icon: Calendar,
                  color: "bg-teal-500/10 text-teal-700 border-teal-500/20",
                  badge: "Weekly Tests",
                  subs: [{ name: "Sunday 1600m", href: "/events" }, { name: "Sports Meet", href: "/events" }],
                },
                {
                  label: "Resources & Syllabi",
                  href: "/resources",
                  icon: FileText,
                  color: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
                  badge: "PDF Material",
                  subs: [{ name: "PET Standard", href: "/resources" }, { name: "Medical Check", href: "/resources" }],
                },
                {
                  label: "Notifications",
                  href: "/notification",
                  icon: Bell,
                  color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
                  badge: "Live Alerts",
                  subs: [{ name: "Exam Dates", href: "/notification" }, { name: "Notice Board", href: "/notification" }],
                },
                {
                  label: "About Us",
                  href: "/about",
                  icon: ShieldAlert,
                  color: "bg-[#2b4c2b]/15 text-[#2b4c2b] border-[#2b4c2b]/20",
                  badge: "Ganesh & Mahesh Sir",
                  subs: [{ name: "Coaches", href: "/about#coaches" }, { name: "Location", href: "/about#location" }],
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.href}
                    className="group rounded-2xl bg-white border border-slate-200 p-3 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Main Category Header Link */}
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between gap-2 mb-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-2 rounded-xl border ${item.color} group-hover:scale-105 transition-transform shrink-0`}>
                            <Icon size={17} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-black text-slate-900 group-hover:text-[#ea580c] transition-colors truncate block">
                              {item.label}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                              {item.badge}
                            </span>
                          </div>
                        </div>

                        <ChevronRight size={16} className="text-slate-400 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>

                      {/* Subcategory Pills */}
                      <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100">
                        {item.subs.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="px-2 py-0.5 rounded-md bg-slate-50 hover:bg-amber-100/60 border border-slate-200/70 hover:border-amber-300 text-[10px] font-extrabold text-slate-600 hover:text-amber-900 transition-all"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 text-xs font-black text-[#138808] bg-emerald-50 hover:bg-emerald-100 rounded-2xl border border-emerald-300 shadow-sm transition-all"
              >
                <MessageCircle size={16} className="text-[#138808]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={telHref(PHONE_NUMBER)}
                className="flex items-center justify-center gap-2 py-3 px-3 text-xs font-black text-white bg-[#ea580c] hover:bg-[#c2410c] rounded-2xl shadow-lg shadow-orange-500/20 transition-all"
              >
                <Phone size={16} />
                <span>Call +91 77397</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
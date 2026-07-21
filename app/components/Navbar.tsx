"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "./Container";
import Button from "./Button";
import { brand, nav, contact } from "../lib/site-data";
import type { LucideIcon } from "lucide-react";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Users,
  GraduationCap,
  Newspaper,
  Dumbbell,
  Building2,
  Bell,
  BookOpen,
  Trophy,
  CalendarClock,
  Wallet,
  HelpCircle,
  Sparkles,
  Ban,
  ListFilter,
  Flame,
  PlayCircle,
  Video as Youtube,
  MoreHorizontal,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

/* =========================================================
   SUBPAGES — dropdown content per main link. Only labels
   listed here get a chevron + dropdown.
   ========================================================= */
type SubLink = { href: string; icon: LucideIcon; title: string; desc: string };

const SUBMENU_MAP: Record<string, SubLink[]> = {
  about: [
    { href: "/about/founderanddirector", icon: Users, title: "Founder & Director", desc: "Meet Ganesh Sir and his mission for the academy." },
    { href: "/about/ourstory", icon: BookOpen, title: "Our Story", desc: "How the academy started, and its vision and mission." },
    { href: "/about/whatwetrain", icon: Dumbbell, title: "What We Train", desc: "Our training philosophy and daily focus areas." },
    { href: "/about/facilities", icon: Building2, title: "Facilities", desc: "What students get access to at the academy." },
    { href: "/about/achievements", icon: Trophy, title: "Achievements", desc: "Selected students and their success stories." },
  ],
  blogs: [
    { href: "/blogs/categories", icon: GraduationCap, title: "Categories", desc: "Browse articles by exam, fitness topic, or recruitment stream." },
    { href: "/blogs/articles", icon: Newspaper, title: "Latest Articles", desc: "Search and filter every post from the academy, newest first." },
    { href: "/blogs/topics", icon: Flame, title: "Popular Topics", desc: "Quick-jump tags readers come back to most." },
  ],
  courses: [
    { href: "/courses/programs", icon: Dumbbell, title: "Training Programs", desc: "Army, Police, Daroga, SSC GD, and every other program on offer." },
    { href: "/courses/schedule", icon: CalendarClock, title: "Schedule", desc: "Morning and evening batch timings, plus why students choose us." },
    { href: "/courses/facilities", icon: Building2, title: "Facilities", desc: "Hostel facility for students coming from nearby districts." },
    { href: "/courses/fees-admission", icon: Wallet, title: "Fees & Admission", desc: "How to apply, batch selection, and getting in touch." },
    { href: "/courses/faq", icon: HelpCircle, title: "FAQ", desc: "Common questions about courses, hostel, and guest tests." },
  ],
  hostel: [
    { href: "/hostel/facilities", icon: Sparkles, title: "Facilities", desc: "Furnished rooms, mess, RO water, power backup, and more." },
    { href: "/hostel/gallery", icon: Building2, title: "Gallery", desc: "A look at the rooms, mess area, and study spaces." },
    { href: "/hostel/fees", icon: Wallet, title: "Fees", desc: "Monthly hostel fee, security deposit, and food charges." },
    { href: "/hostel/rules", icon: Ban, title: "Rules", desc: "Discipline, timings, and conduct expected of residents." },
    { href: "/hostel/faq", icon: HelpCircle, title: "FAQ", desc: "Common questions about food, visitors, and distance." },
  ],
  notifications: [
    { href: "/notification/categories", icon: ListFilter, title: "Categories", desc: "Browse by admissions, job alerts, results, hostel, and more." },
    { href: "/notification/updates", icon: Bell, title: "All Notifications", desc: "The full feed — search and filter everything we've posted." },
  ],
  videos: [
    { href: "/youtube-video", icon: PlayCircle, title: "All Videos", desc: "Every video we've posted, newest first." },
    { href: "/youtube-video?category=Running%20Tips", icon: Dumbbell, title: "Running & Fitness", desc: "Pacing, stamina, and physical test prep clips." },
    { href: "/youtube-video?category=Motivation", icon: Flame, title: "Motivation", desc: "Short clips to keep you going on tough days." },
    { href: "/youtube-video?category=Student%20Success", icon: Trophy, title: "Student Success", desc: "Selected students share what worked for them." },
    { href: "/youtube-video?featured=true", icon: Youtube, title: "Featured", desc: "The videos we're pointing new students to right now." },
  ],
};
SUBMENU_MAP.notification = SUBMENU_MAP.notifications;
SUBMENU_MAP.video = SUBMENU_MAP.videos;

function getSubmenu(label: string): SubLink[] | undefined {
  return SUBMENU_MAP[label.trim().toLowerCase()];
}

/**
 * Where should this item's dropdown anchor, so it never runs off
 * the edge of the viewport? Items near the start hug the left,
 * items near the end hug the right, everything else stays centered.
 */
function getDropdownPosition(index: number, total: number): string {
  const third = total / 3;
  if (index < third) return "left-0";
  if (index >= total - third) return "right-0";
  return "left-1/2 -translate-x-1/2";
}

/**
 * Measures each top-level nav item off-screen, then figures out how
 * many fit in the available width before the "More" button needs to
 * show up. Re-measures on resize so it stays correct across breakpoints.
 */
function useOverflowNav(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemMeasureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const moreMeasureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(itemCount);

  const recalculate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const available = container.offsetWidth;
    const moreWidth = moreMeasureRef.current?.offsetWidth ?? 0;

    let used = 0;
    let count = 0;
    for (let i = 0; i < itemCount; i++) {
      const width = itemMeasureRefs.current[i]?.offsetWidth ?? 0;
      const itemsLeftAfterThis = itemCount - (i + 1);
      const reserve = itemsLeftAfterThis > 0 ? moreWidth : 0;
      if (used + width + reserve <= available) {
        used += width;
        count += 1;
      } else {
        break;
      }
    }
    setVisibleCount(count);
  }, [itemCount]);

  useLayoutEffect(() => {
    recalculate();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => recalculate());
    ro.observe(container);
    return () => ro.disconnect();
  }, [recalculate]);

  return { containerRef, itemMeasureRefs, moreMeasureRef, visibleCount };
}

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile panel
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // desktop item dropdown
  const [moreOpen, setMoreOpen] = useState(false); // desktop "more" dropdown
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { containerRef, itemMeasureRefs, moreMeasureRef, visibleCount } = useOverflowNav(nav.length);
  const visibleItems = nav.slice(0, visibleCount);
  const overflowItems = nav.slice(visibleCount);

  // Close desktop dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close everything on escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Subtle shrink + shadow once the page scrolls — gives the glass
  // shell a sense of depth without adding any extra chrome.
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function closeAll() {
    setOpen(false);
    setOpenDropdown(null);
    setMoreOpen(false);
    setMobileOpenDropdown(null);
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <Container>
        {/* Liquid glass shell — background/blur is a clipped layer behind the
            content; the content layer itself has NO overflow-hidden, so
            dropdown panels can render in full below the rounded shell
            instead of being cut off at its edge. */}
        <div
          className={`relative rounded-2xl border border-white/15 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.45)] transition-all duration-300 ${
            scrolled ? "shadow-[0_10px_34px_-14px_rgba(0,0,0,0.55)]" : ""
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl bg-bg/60 backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/30"
          />

          <div className="relative z-10">
          <div
            className={`flex items-center justify-between gap-3 px-3 transition-[height] duration-300 sm:px-4 lg:px-5 ${
              scrolled ? "h-14" : "h-16"
            }`}
          >
            <a
              href="#top"
              className="flex shrink-0 items-center gap-2 text-[16px] font-display font-bold tracking-tight text-text sm:text-[17px]"
              onClick={closeAll}
            >
              <Image
                src="/logo.png"
                alt={brand.shortName}
                width={36}
                height={36}
                priority
                className={`shrink-0 rounded-lg object-contain transition-all duration-300 ${
                  scrolled ? "h-8 w-8" : "h-9 w-9"
                }`}
              />
              <span className="max-w-[42vw] truncate sm:max-w-none">{brand.shortName}</span>
            </a>

            {/* Desktop nav — measures itself and collapses overflow into "More" */}
            <nav
              ref={navRef}
              className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
              aria-label="Primary"
            >
              <div ref={containerRef} className="flex min-w-0 max-w-full items-center justify-center gap-1">
                {visibleItems.map((item, index) => {
                  const subs = getSubmenu(item.label);

                  if (!subs) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="group relative whitespace-nowrap rounded-md px-3 py-2 text-[13.5px] font-medium text-text-muted transition-colors hover:text-text"
                      >
                        {item.label}
                        <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-text transition-transform duration-200 group-hover:scale-x-100" />
                      </a>
                    );
                  }

                  const isOpen = openDropdown === item.label;
                  return (
                    <div key={item.href} className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setMoreOpen(false);
                          setOpenDropdown(isOpen ? null : item.label);
                        }}
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        className={`group flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors ${
                          isOpen ? "text-text" : "text-text-muted hover:text-text"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                        <span
                          className={`absolute inset-x-3 bottom-1 h-px bg-text transition-transform duration-200 ${
                            isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </button>

                      <div
                        role="menu"
                        className={`absolute top-full ${getDropdownPosition(
                          index,
                          visibleItems.length
                        )} z-50 mt-2 w-[min(20rem,calc(100vw-1.5rem))] origin-top overflow-hidden rounded-xl border border-white/15 bg-navy-2/85 p-1.5 shadow-2xl backdrop-blur-2xl transition-all duration-150 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/20 ${
                          isOpen
                            ? "pointer-events-auto scale-100 opacity-100"
                            : "pointer-events-none scale-95 opacity-0"
                        }`}
                      >
                        {subs.map((sub) => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-start gap-3 rounded-md px-2.5 py-2.5 transition-colors hover:bg-bg-raised-2"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-raised-2 text-text-muted">
                              <sub.icon size={15} />
                            </span>
                            <span>
                              <span className="block text-[14px] font-medium text-text">{sub.title}</span>
                              <span className="block text-[12.5px] leading-snug text-text-faint">{sub.desc}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* "More" — holds whatever didn't fit, subcategories included */}
                {overflowItems.length > 0 && (
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setMoreOpen((v) => !v);
                      }}
                      aria-expanded={moreOpen}
                      aria-haspopup="menu"
                      className={`flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors ${
                        moreOpen ? "text-text" : "text-text-muted hover:text-text"
                      }`}
                    >
                      <MoreHorizontal size={16} />
                      More
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      role="menu"
                      className={`absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-1.5rem))] origin-top-right overflow-hidden rounded-xl border border-white/15 bg-navy-2/85 p-1.5 shadow-2xl backdrop-blur-2xl transition-all duration-150 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/20 ${
                        moreOpen
                          ? "pointer-events-auto scale-100 opacity-100"
                          : "pointer-events-none scale-95 opacity-0"
                      } max-h-[70vh] overflow-y-auto`}
                    >
                      {overflowItems.map((item) => {
                        const subs = getSubmenu(item.label);

                        if (!subs) {
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              onClick={() => setMoreOpen(false)}
                              className="block rounded-md px-2.5 py-2.5 text-[14px] font-medium text-text transition-colors hover:bg-bg-raised-2"
                            >
                              {item.label}
                            </a>
                          );
                        }

                        return (
                          <div key={item.href} className="py-1">
                            <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-faint">
                              {item.label}
                            </p>
                            {subs.map((sub) => (
                              <a
                                key={sub.href}
                                href={sub.href}
                                role="menuitem"
                                onClick={() => setMoreOpen(false)}
                                className="flex items-center gap-2.5 rounded-md px-2.5 py-2 transition-colors hover:bg-bg-raised-2"
                              >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg-raised-2 text-text-muted">
                                  <sub.icon size={14} />
                                </span>
                                <span className="text-[13.5px] font-medium text-text">{sub.title}</span>
                              </a>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Off-screen measurer: real markup, invisible, used only to read natural widths */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 flex -translate-y-full items-center gap-1 opacity-0"
              >
                {nav.map((item, index) => (
                  <div
                    key={item.href}
                    ref={(el) => {
                      itemMeasureRefs.current[index] = el;
                    }}
                    className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-[13.5px] font-medium"
                  >
                    {item.label}
                    {getSubmenu(item.label) && <ChevronDown size={13} />}
                  </div>
                ))}
                <div
                  ref={moreMeasureRef}
                  className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-[13.5px] font-medium"
                >
                  <MoreHorizontal size={16} />
                  More
                  <ChevronDown size={13} />
                </div>
              </div>
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <ThemeToggle />

              <div className="hidden sm:block">
                <Button href={contact.phoneHref} variant="secondary" icon={Phone}>
                  Call
                </Button>
              </div>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-text transition-colors hover:bg-bg-raised lg:hidden"
              >
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <Menu
                    size={18}
                    className={`absolute transition-all duration-200 ${
                      open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    size={18}
                    className={`absolute transition-all duration-200 ${
                      open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Service-ribbon accent strip */}
          <div className="ribbon-bar h-[3px] w-full" />

          {/* Mobile slide-down panel — lives inside the same glass shell */}
          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-200 lg:hidden ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0">
              <nav className="flex flex-col divide-y divide-white/10 px-3 py-2 sm:px-4" aria-label="Primary mobile">
                {nav.map((item) => {
                  const subs = getSubmenu(item.label);

                  if (!subs) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={closeAll}
                        className="flex items-center py-3 text-[15px] font-medium text-text-muted transition-colors hover:text-text"
                      >
                        {item.label}
                      </a>
                    );
                  }

                  const isOpen = mobileOpenDropdown === item.label;
                  return (
                    <div key={item.href} className="py-1">
                      <button
                        type="button"
                        onClick={() => setMobileOpenDropdown(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between py-3 text-[15px] font-medium text-text-muted transition-colors hover:text-text"
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <div
                        className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0">
                          <div className="flex flex-col gap-0.5 pb-2 pl-3">
                            {subs.map((sub) => (
                              <a
                                key={sub.href}
                                href={sub.href}
                                onClick={closeAll}
                                className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-[14px] font-medium text-text-muted transition-colors hover:bg-bg-raised-2 hover:text-text"
                              >
                                <sub.icon size={15} className="opacity-70" />
                                {sub.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3 border-t border-white/10 px-3 py-4 sm:px-4">
                <ThemeToggle />
                <Button href={contact.phoneHref} variant="secondary" icon={Phone}>
                  Call
                </Button>
                <Button href={contact.whatsappHref} variant="whatsapp" icon={MessageCircle}>
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
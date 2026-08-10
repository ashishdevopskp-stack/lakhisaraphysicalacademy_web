"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { brand } from "../lib/site-data";
import { PHONE_NUMBER, whatsappHref, telHref } from "../lib/constants";
import { Phone, MessageCircle, Menu, X, ChevronDown } from "lucide-react";

// Primary links requested in exact order by user
const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Hostel", href: "/hostel" },
  { label: "Blog", href: "/blogs" },
  { label: "YouTube Videos", href: "/youtube-video" },
  { label: "Store", href: "/store" },
  { label: "About Us", href: "/about" },
];

// Remaining links collapsed under "More" dropdown
const SECONDARY_NAV = [
  { label: "Courses", href: "/courses" },
  { label: "Results", href: "/result" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Notifications", href: "/notification" },
  { label: "Jobs", href: "/jobs" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
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
        {/* Navbar Container with 3-Stripe Indian Flag Accent Top Line */}
        <div className="relative overflow-hidden rounded-full border border-slate-200/90 bg-white/95 px-4 py-2.5 shadow-md backdrop-blur-md sm:px-6 sm:py-3">
          {/* Prominent Indian Flag Tiranga Line on Top */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#ff9933] via-slate-200 to-[#138808]" />

          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="relative shrink-0">
                <Image
                  src="/logo.png"
                  alt={brand.shortName}
                  width={42}
                  height={42}
                  priority
                  className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-orange-500/40"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] sm:text-[17px] lg:text-[18px] font-black tracking-tight text-slate-900 leading-tight truncate max-w-[140px] sm:max-w-none">
                  {brand.shortName}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-[#ea580c] hidden md:inline-block tracking-wider uppercase">
                  Lakhisarai, Bihar (India)
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links in Exact Requested Order */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/70 shrink-0">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-1.5 text-[14px] font-extrabold text-slate-700 rounded-full hover:text-[#ea580c] hover:bg-white transition-all whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}

              {/* More Dropdown Menu for remaining links */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 text-[14px] font-extrabold text-slate-700 rounded-full hover:text-[#ea580c] hover:bg-white transition-all"
                >
                  <span>More</span>
                  <ChevronDown size={15} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-2.5 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl border-t-4 border-t-[#ff9933] z-50">
                    {SECONDARY_NAV.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className="block px-3.5 py-2.5 text-xs font-extrabold text-slate-700 hover:bg-orange-50 hover:text-[#ea580c] rounded-xl transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Action CTAs: India Green WhatsApp & Indian Saffron Call CTA */}
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

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100"
                aria-label="Toggle Navigation"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel with All Links in Requested Order */}
        {mobileOpen && (
          <div className="mt-2.5 max-h-[80vh] overflow-y-auto rounded-3xl border-t-4 border-t-[#ff9933] border-b-4 border-b-[#138808] border-x border-slate-200 bg-white p-5 shadow-2xl xl:hidden">
            <div className="flex flex-col gap-1">
              {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm font-extrabold text-slate-800 hover:bg-orange-50 hover:text-[#ea580c] rounded-xl"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-black text-[#138808] bg-emerald-50 rounded-2xl border border-emerald-200"
              >
                <MessageCircle size={16} />
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
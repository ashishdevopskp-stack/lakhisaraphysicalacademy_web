"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ClipboardList,
  MessageCircle,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Heart,
  Flag,
  ShieldCheck,
  Info,
} from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_ALT,
  EMAIL,
  ADDRESS,
  whatsappHref,
  telHref,
} from "../lib/constants";

const FaFacebookF = ({ size = 16, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.06 5.66 21.18 10.44 21.95v-6.99H8.08v-2.89h2.36V9.41c0-2.34 1.4-3.63 3.54-3.63 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.53.73-1.53 1.48v1.78h2.6l-.42 2.89h-2.18v6.99C18.34 21.18 22 17.06 22 12.07z" />
  </svg>
);
const FaInstagram = ({ size = 16, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm5.5-3a1.1 1.1 0 1 0 1.1 1.1A1.1 1.1 0 0 0 17.5 5.5z" />
  </svg>
);
const FaYoutube = ({ size = 16, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M23 7s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C16.7 3 12 3 12 3s-4.7 0-7 .6c-.4.1-1.3.1-2.1 1C2.2 5.3 2 7 2 7S1.7 9.1 1.7 11.2V13c0 2.1.3 4.2.3 4.2s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1 1.8.3 7.1.6 7.8.6s5.9-.3 7.8-.6c.5-.1 1.6-.1 2.4-1 .6-.7.8-2.4.8-2.4s.3-2.1.3-4.2V11.2C23.3 9.1 23 7 23 7zM9.5 15.5v-7l6 3.5-6 3.5z" />
  </svg>
);
const FaWhatsapp = ({ size = 16, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M20.52 3.48A11.94 11.94 0 0 0 12 .04 11.9 11.9 0 0 0 .04 12c0 2.1.55 4.09 1.6 5.83L0 24l6.45-1.63A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-1.98-.5-3.84-1.48-5.52zM12 21.5c-1.72 0-3.41-.46-4.88-1.33l-.35-.21-3.83.97.97-3.73-.23-.38A8.44 8.44 0 0 1 3.5 12 8.5 8.5 0 0 1 12 3.5 8.44 8.44 0 0 1 20.5 12 8.5 8.5 0 0 1 12 21.5zM17 14.5c-.25-.12-1.48-.73-1.71-.82-.23-.09-.4-.12-.57.12-.18.25-.7.82-.86.99-.16.16-.31.18-.56.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.31.37-.46.12-.15.16-.25.25-.41.09-.16.04-.31-.02-.43-.06-.12-.57-1.38-.78-1.89-.21-.5-.43-.43-.57-.44l-.48-.01c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.72 4.1 3.71 2.41.99 2.41.66 2.84.62.43-.05 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.23-.16-.48-.28z" />
  </svg>
);
const FaGooglePlay = ({ size = 16, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M3.2 2.7L17.1 12 3.2 21.3A2 2 0 0 1 2 20V4c0-.8.5-1.5 1.2-1.3zM20.8 11.3L6 2.7l6.6 6.6L20.8 11.3zM6 21.3l14.8-9.3c.3-.2.3-.6 0-.8L6 2.7v18.6z" />
  </svg>
);

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Results", href: "/result" },
  { label: "Admission", href: "/admission-form" },
  { label: "Contact", href: "/contact" },
];

const EXPLORE_LINKS = [
  { label: "Events & Trial", href: "/events" },
  { label: "Job Alerts", href: "/jobs" },
  { label: "Academy Store", href: "/store" },
  { label: "Blog & Guides", href: "/blogs" },
  { label: "YouTube Videos", href: "/youtube-video" },
  { label: "Resources & Notes", href: "/resources" },
  { label: "Hostel Facility", href: "/hostel" },
  { label: "Circular Updates", href: "/notification" },
];

const PROGRAM_PILLS = [
  "Indian Army Agniveer",
  "Bihar Police Constable",
  "Bihar Daroga (SI)",
  "SSC GD (BSF, CISF, CRPF)",
  "RPF Railway Police",
  "1600m Running Test",
  "High Jump (Tiger/Scissor)",
];

const SOCIALS = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/trainer.ganesh.2025?rdid=VKCg5epDr9XWKwf5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1SsmvbtHrj%2F",
    color: "hover:bg-blue-600",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/lakhisarai_physical_academy?igsh=ZWh2Y3Zxa3J1cGxt",
    color: "hover:bg-pink-600",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com/@lakhisaraiphysicalacademy?si=S80l_B7Z0lWTtZSU",
    color: "hover:bg-red-600",
  },
  {
    label: "WhatsApp",
    icon: FaWhatsapp,
    href: whatsappHref(),
    color: "hover:bg-emerald-600",
  },
];

const PLAY_STORE_LINK =
  "https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[#ea580c] mb-4">
      {children}
    </p>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden pt-12 sm:pt-16">
      {/* Background Soft Glow Blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 -z-10 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(234,88,12,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(19,136,8,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Prominent 3-Stripe Indian Flag Tiranga Line on Top */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />

      {/* Floating CTA Pill Banner */}
      <section className="pb-12 sm:pb-16 border-b border-slate-800/80">
        <Container>
          <div className="group relative overflow-hidden rounded-3xl bg-slate-900 border-2 border-slate-800 p-6 sm:p-10 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40">
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#ea580c] via-amber-400 to-[#138808]" />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-[50ch]">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 text-[#ea580c] border border-orange-500/30 text-xs font-black mb-3">
                  <Flag className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>जय हिन्द! Start Your Desh Seva Journey</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  Ready to serve the nation in <span className="text-[#ea580c]">Defence &amp; Police?</span>
                </h2>

                <p className="mt-3 text-sm text-slate-400 font-medium leading-relaxed">
                  Join Lakhisarai Physical Academy and train under expert guidance of **Ganesh Sir &amp; Coach Mahesh Sir** for 1600m Running, High Jump, and Army/Police physical tests.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={telHref()}
                  className="btn-orange shadow-lg shadow-orange-500/25 hover:scale-105 transition-all"
                >
                  <ClipboardList className="h-4 w-4" />
                  <span>Apply for Admission</span>
                </a>

                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs sm:text-sm font-extrabold text-[#138808] bg-emerald-950/80 hover:bg-emerald-900/90 rounded-full border border-emerald-500/40 transition-all flex items-center gap-2 shadow-lg hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4 text-[#138808]" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Footer Links & Information Grid */}
      <section className="py-14 sm:py-20 border-b border-slate-800/80">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Brand Information & Social Badges (Col 1-4) */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative shrink-0 p-1 bg-slate-900 rounded-full border border-orange-500/40 group-hover:border-orange-500 transition-colors">
                  <Image
                    src="/logo.png"
                    alt="Lakhisarai Physical Academy"
                    width={44}
                    height={44}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-base font-black text-white tracking-tight block">
                    Lakhisarai Physical Academy
                  </span>
                  <span className="text-[10px] font-extrabold text-[#ea580c] uppercase tracking-wider block">
                    Lakhisarai, Bihar (India)
                  </span>
                </div>
              </Link>

              <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[34ch]">
                Dedicated physical training for Army, Bihar Police, Daroga, SSC GD, and RPF examinations guided by **Ganesh Sir &amp; Coach Mahesh Sir**.
              </p>

              <div className="pt-2">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2.5">
                  Follow &amp; Connect With Us
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {SOCIALS.map(({ label, icon: Icon, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition-all duration-300 hover:text-white hover:scale-110 shadow-md ${color}`}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* App Download Pill */}
              <div className="pt-3">
                <a
                  href={PLAY_STORE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:border-orange-500/50 hover:bg-slate-900 hover:scale-105 transition-all shadow-md"
                >
                  <FaGooglePlay size={20} className="text-emerald-400 shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 block">Download App</span>
                    <span className="text-xs font-black text-white block">Official Android App</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links Column (Col 5-6) */}
            <div className="lg:col-span-2">
              <FooterHeading>Quick Navigation</FooterHeading>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs font-bold text-slate-400 hover:text-[#ea580c] transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <ChevronRight size={12} className="text-slate-600 group-hover:text-[#ea580c] group-hover:translate-x-1 transition-all" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore Column (Col 7-8) */}
            <div className="lg:col-span-2">
              <FooterHeading>Explore Academy</FooterHeading>
              <ul className="space-y-2.5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs font-bold text-slate-400 hover:text-[#ea580c] transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <ChevronRight size={12} className="text-slate-600 group-hover:text-[#ea580c] group-hover:translate-x-1 transition-all" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Ground Address Cards (Col 9-12) */}
            <div className="lg:col-span-4 space-y-4">
              <FooterHeading>Ground &amp; Office Contact</FooterHeading>

              <div className="space-y-3">
                {/* Location Card */}
                <div className="bento-card p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-start gap-3 hover:border-orange-500/40 transition-colors">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-[#ea580c] shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase text-slate-400">Training Ground</p>
                    <p className="text-xs font-bold text-white mt-0.5 leading-snug">{ADDRESS}</p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bento-card p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center gap-3 hover:border-emerald-500/40 transition-colors">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-[#138808] shrink-0">
                    <Phone size={16} />
                  </div>
                  <div className="text-xs font-extrabold text-white">
                    <a href={telHref()} className="hover:text-[#ea580c] transition-colors">+{PHONE_NUMBER}</a>
                    <span className="text-slate-600 mx-2">•</span>
                    <a href={telHref(PHONE_NUMBER_ALT)} className="hover:text-[#ea580c] transition-colors">+{PHONE_NUMBER_ALT}</a>
                  </div>
                </div>

                {/* Email & Hours */}
                <div className="bento-card p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-start gap-3 hover:border-amber-500/40 transition-colors">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div className="text-xs font-bold text-slate-300">
                    <p className="text-white font-extrabold">Ground Timing:</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Morning 05:00 AM – 08:00 AM</p>
                    <p className="text-[11px] text-slate-400">Evening 04:00 PM – 07:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Pills Strip */}
          <div className="mt-12 pt-8 border-t border-slate-800/80">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3 text-center sm:text-left">
              Key Selection Programs
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {PROGRAM_PILLS.map((prog) => (
                <span
                  key={prog}
                  className="px-3.5 py-1.5 text-xs font-extrabold rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-orange-500 hover:text-white hover:bg-orange-500/10 transition-all cursor-pointer shadow-sm"
                >
                  {prog}
                </span>
              ))}
            </div>
          </div>

          {/* Legal Compliance Disclaimer Box */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-[11.5px] text-slate-400 font-medium leading-relaxed flex items-start gap-3">
            <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-slate-200">Legal &amp; Compliance Disclaimer:</p>
              <p className="mt-0.5 text-slate-400">
                Lakhisarai Physical Academy is a private physical coaching institute founded by Ganesh Sir. We specialize in physical fitness preparation, 1600m track running, and recruitment physical test coaching for competitive examinations (Indian Army Agniveer, Bihar Police, Bihar SI, SSC GD, etc.). Lakhisarai Physical Academy is a private coaching academy and is not affiliated with, authorized by, or an official recruitment body of the Indian Armed Forces, Ministry of Defence, or any government department.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom Copyright & Credit Bar */}
      <div className="py-6 bg-slate-950 text-slate-500 text-xs">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="font-semibold text-slate-400">
                © {year} Lakhisarai Physical Academy. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-3 text-slate-400 font-extrabold">
              <span>Coaches: **Ganesh Sir** &amp; **Mahesh Sir**</span>
              <span>•</span>
              <span className="text-[#ea580c]">Lakhisarai, Bihar</span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
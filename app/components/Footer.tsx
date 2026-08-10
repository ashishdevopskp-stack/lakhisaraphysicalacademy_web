import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ClipboardList,
} from "lucide-react";
// Fallback simple SVG icon components to avoid runtime/type errors when
// react-icons is not installed. These provide minimal visuals and accept
// size/className props like react-icons components.
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
const FaApple = ({ size = 16, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M16.365 1.43c0 1.02-.39 2.02-1.09 2.74-.79.8-1.9 1.25-3.06 1.12-.07-.6.12-1.25.45-1.78.5-.82 1.44-1.6 2.6-1.73.4-.04.98.04 1.1.65zM12 4.5c1.25 0 2.5.45 3.4 1.3.9.85 1.6 2.1 1.6 3.7 0 .55-.05 1.1-.2 1.6-.35 1.35-1.2 2.8-2.15 4.1-.85 1.15-1.9 2.4-3.35 2.4s-2.5-1.15-3.35-2.3C6.4 15.5 5.6 14 5.2 12.65 4.95 11.9 4.9 11.2 4.9 10.8c0-1.6.7-2.85 1.6-3.7C7.4 5 8.75 4.5 10 4.5c.9 0 1.6.4 2 .9.4-.55 1.1-.9 2-.9z" />
  </svg>
);
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

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Results", href: "/result" },
  { label: "Admission", href: "/admission" },
  { label: "Contact", href: "/contact" },
];

const EXPLORE_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Jobs", href: "/jobs" },
  { label: "Store", href: "/store" },
  { label: "Blog", href: "/blogs" },
  { label: "Videos", href: "/youtube-video" },
  { label: "Resources", href: "/resources" },
  { label: "Hostel", href: "/hostel" },
  { label: "Notifications", href: "/notification" },
];

const PROGRAMS = [
  "Army",
  "Bihar Police",
  "Daroga (SI)",
  "SSC GD",
  "CISF",
  "CRPF",
  "BSF",
];

const SOCIALS = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/trainer.ganesh.2025?rdid=VKCg5epDr9XWKwf5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1SsmvbtHrj%2F",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/lakhisarai_physical_academy?igsh=ZWh2Y3Zxa3J1cGxt",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com/@lakhisaraiphysicalacademy?si=S80l_B7Z0lWTtZSU",
  },
  { label: "WhatsApp", icon: FaWhatsapp, href: whatsappHref() },
];

// Update PLAY_STORE_LINK / APP_STORE_LINK if either changes.
const PLAY_STORE_LINK =
  "https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-text-muted">
      {children}
    </p>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200 bg-white">
      {/* 3-Stripe Indian Flag Tiranga Line on Top of Footer */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#ff9933] via-slate-200 to-[#138808]" />

      {/* Closing CTA */}
      <section className="border-b border-slate-200 py-12 sm:py-16 bg-slate-50">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border-t-4 border-t-[#ea580c] border-b-4 border-b-[#138808] border-x border-slate-200 bg-white p-6 sm:p-10 shadow-sm sm:flex-row sm:items-center">
            <div className="max-w-[46ch]">
              <p className="text-xs font-black uppercase tracking-widest text-[#ea580c]">
                Start Your Desh Seva Journey
              </p>
              <h2 className="mt-2 text-[24px] sm:text-[28px] font-black text-slate-900">
                Ready to serve the nation in Defence &amp; Police?
              </h2>
              <p className="mt-2 text-[14px] font-medium text-slate-600">
                Join Lakhisarai Physical Academy and train under expert
                guidance for Indian Army, Police, and government recruitment tests.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Button href="/admission" variant="primary" icon={ClipboardList}>
                Apply Now
              </Button>
              <Button href={telHref()} variant="secondary" icon={Phone}>
                Call Now
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* App download CTA */}
      <section className="border-b border-line py-12">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-line-strong bg-bg p-8 sm:flex-row sm:p-10">
            <div className="text-center sm:text-left">
              <p className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-signal">
                Get The App
              </p>
              <h3 className="mt-2 text-[20px] sm:text-[22px]">
                Download our app now
              </h3>
              <p className="mt-1 text-[13.5px] text-text-muted">
                Track your training, results, and updates on the go.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <a
                href={PLAY_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-line-strong bg-bg-raised px-4 py-2.5 transition-colors hover:border-signal"
              >
                <FaGooglePlay size={22} className="text-text" />
                <span className="flex flex-col leading-tight text-left">
                  <span className="text-[10px] text-text-muted">
                    GET IT ON
                  </span>
                  <span className="text-[13.5px] font-medium text-text">
                    Google Play
                  </span>
                </span>
              </a>

             
            </div>
          </div>
        </Container>
      </section>

      {/* Link columns */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Lakhisarai Physical Academy"
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-xl object-contain"
                />
                <span className="text-[14px] font-medium text-text">
                  Lakhisarai Physical Academy
                </span>
              </Link>
              <p className="mt-4 max-w-[32ch] text-[13px] text-text-muted">
                Disciplined physical training for Army, Bihar Police, Daroga,
                SSC GD, and other government recruitment tests, guided by
                Ganesh Sir.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-text-muted transition-colors hover:border-line-strong hover:text-signal"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <FooterHeading>Quick Links</FooterHeading>
              <ul className="mt-4 flex flex-col gap-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore + Programs */}
            <div>
              <FooterHeading>Explore</FooterHeading>
              <ul className="mt-4 flex flex-col gap-2.5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <FooterHeading>
                <span className="mt-7 block">Programs</span>
              </FooterHeading>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {PROGRAMS.map((program) => (
                  <span
                    key={program}
                    className="rounded-full border border-line bg-bg px-2.5 py-1 text-[11.5px] font-medium text-text-muted"
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <FooterHeading>Contact</FooterHeading>
              <ul className="mt-4 flex flex-col gap-3.5">
                <li className="flex items-start gap-2.5 text-[13.5px] text-text-muted">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-signal" />
                  {ADDRESS}
                </li>
                <li className="flex items-center gap-2.5 text-[13.5px] text-text-muted">
                  <Phone size={15} className="shrink-0 text-signal" />
                  <a href={telHref()} className="hover:text-text">
                    +{PHONE_NUMBER}
                  </a>
                  <span className="text-text-muted">/</span>
                  <a href={telHref(PHONE_NUMBER_ALT)} className="hover:text-text">
                    +{PHONE_NUMBER_ALT}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-[13.5px] text-text-muted">
                  <Mail size={15} className="shrink-0 text-signal" />
                  <a href={`mailto:${EMAIL}`} className="hover:text-text">
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-[13.5px] text-text-muted">
                  <Clock size={15} className="mt-0.5 shrink-0 text-signal" />
                  <span>
                    Morning 05:00 AM – 08:00 AM
                    <br />
                    Evening 04:00 PM – 07:00 PM
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-line py-6">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-[12.5px] text-text-muted">
              © {year} Lakhisarai Physical Academy. All rights reserved.
            </p>
            <p className="text-[12.5px] text-text-muted">
              Founder &amp; Director — Ganesh Sir
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ClipboardList,
  MessageCircle,
  Video as Youtube,
  FormIcon as Facebook,
  Camera as Instagram,
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
  { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "WhatsApp", icon: MessageCircle, href: whatsappHref() },
];

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
    <footer className="border-t border-line bg-bg-raised">
      {/* Closing CTA */}
      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-line-strong bg-bg p-8 sm:flex-row sm:items-center sm:p-10">
            <div className="max-w-[46ch]">
              <p className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-signal">
                Start Today
              </p>
              <h2 className="mt-3 text-[24px] sm:text-[28px]">
                Ready to start your success journey?
              </h2>
              <p className="mt-2 text-[14px] text-text-muted">
                Join Lakhisarai Physical Academy and train under expert
                guidance for Army, Police, and government recruitment tests.
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
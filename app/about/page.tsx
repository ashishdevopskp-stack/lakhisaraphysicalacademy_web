"use client";

import Image from "next/image";
import { Phone, ClipboardList, MessageCircle } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const PHONE_NUMBER = "917739776471";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'd like to know more about admission at Lakhisarai Physical Academy."
);

const ABOUT_NAV = [
  { href: "/about", label: "Overview" },
  { href: "/about/founderanddirector", label: "Founder & Director" },
  { href: "/about/ourstory", label: "Our Story" },
  { href: "/about/whatwetrain", label: "What We Train" },
  { href: "/about/facilities", label: "Facilities" },
  { href: "/about/achievements", label: "Achievements" },
];

function AboutSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="About section pages" className="flex flex-wrap gap-2">
      {ABOUT_NAV.map((item) => {
        const active = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active
                ? "rounded-md bg-signal px-3 py-1.5 text-[13px] font-semibold text-white"
                : "rounded-md border border-line px-3 py-1.5 text-[13px] text-text-muted transition-colors hover:border-line-strong hover:text-text"
            }
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

function AboutHero() {
  return (
    <section id="about" className="pb-16 pt-16 sm:pb-24 sm:pt-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: founder photo */}
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
              <Image
                src="/ganeshsir.png"
                alt="Founder and Director of Lakhisarai Physical Academy"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-xl bg-navy px-5 py-3.5 text-center shadow-lg">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-signal-strong">
                Founder &amp; Director
              </p>
              <p className="mt-0.5 text-[15px] font-bold text-white">
                Lakhisarai Physical Academy
              </p>
            </div>
          </div>

          {/* Right: copy + CTAs */}
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-widest text-signal">
              About Us
            </p>

            <h1 className="mt-4 max-w-[18ch] text-[32px] sm:text-[42px] lg:text-[48px] py-2 leading-snug">
              About{" "}
              <span className="text-signal">Lakhisarai Physical Academy</span>
            </h1>

            <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
              From the founder&rsquo;s mission to our training philosophy,
              facilities, and the students who&rsquo;ve made it through —
              here&rsquo;s everything to know about Lakhisarai Physical
              Academy.
            </p>

            <div className="mt-8">
              <AboutSubNav current="/about" />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={`tel:+${PHONE_NUMBER}`} variant="primary" icon={Phone}>
                Contact Now
              </Button>
              <Button href="#admission" variant="secondary" icon={ClipboardList}>
                Apply for Admission
              </Button>
              <Button
                href={`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                variant="whatsapp"
                icon={MessageCircle}
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function About() {
  return <AboutHero />;
}
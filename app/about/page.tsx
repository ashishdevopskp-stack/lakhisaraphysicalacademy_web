"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Phone,
  MessageCircle,
  Users,
  BookOpen,
  Dumbbell,
  Building2,
  Trophy,
  ArrowRight,
  Mail,
  MapPin,
  Video,
  Camera,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const images = {
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(20,184,166,0.10), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.12), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(59,130,246,0.10), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(245,166,35,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(59,130,246,0.10), transparent 55%)",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: images[variant] }}
    />
  );
}

/* =========================================================
   Shared sub-navigation across all /about pages
   ========================================================= */
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
                ? "pill pill-color-1 font-semibold"
                : "font-body rounded-full border border-line px-3.5 py-1.5 text-[13px] text-text-muted transition-colors hover:border-line-strong hover:text-text"
            }
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

/* =========================================================
   1. Hub Hero
   ========================================================= */
function AboutHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            About Us
          </p>

          <h1 className="font-display mt-5 max-w-[18ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
            About{" "}
            <span className="text-gradient-brand">Lakhisarai Physical Academy</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            From the founder&rsquo;s mission to our training philosophy,
            facilities, and the students who&rsquo;ve made it through —
            here&rsquo;s everything to know about Lakhisarai Physical
            Academy.
          </p>

          <div className="mt-8">
            <AboutSubNav current="/about" />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="tel:8863081082" variant="primary" icon={Phone}>
              Contact Now
            </Button>
            <Button href="#admission" variant="secondary" icon={ClipboardList}>
              Apply for Admission
            </Button>
            <Button
              href="https://wa.me/918863081082"
              variant="whatsapp"
              icon={MessageCircle}
            >
              WhatsApp
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Explore Grid — links out to the five subpages
   ========================================================= */
const EXPLORE_CARDS = [
  {
    href: "/about/founderanddirector",
    icon: Users,
    title: "Founder & Director",
    desc: "Meet Ganesh Sir and his mission for the academy.",
  },
  {
    href: "/about/ourstory",
    icon: BookOpen,
    title: "Our Story",
    desc: "How the academy started, and its vision and mission.",
  },
  {
    href: "/about/whatwetrain",
    icon: Dumbbell,
    title: "What We Train",
    desc: "Our training philosophy and daily focus areas.",
  },
  {
    href: "/about/facilities",
    icon: Building2,
    title: "Facilities",
    desc: "What students get access to at the academy.",
  },
  {
    href: "/about/achievements",
    icon: Trophy,
    title: "Achievements",
    desc: "Selected students and their success stories.",
  },
];

const ICON_TINTS = [
  "text-signal-strong",
  "text-accent-strong",
  "text-teal",
  "text-pink",
  "text-signal-strong",
];

function ExploreGrid() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          Explore
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]"
        >
          Get to know the academy
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_CARDS.map(({ href, icon: Icon, title, desc }, i) => (
            <motion.a
              key={href}
              href={href}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="card-flat group flex flex-col p-6"
            >
              <Icon size={22} className={ICON_TINTS[i % ICON_TINTS.length]} />
              <h3 className="font-display mt-4 text-[16px] font-semibold text-text">
                {title}
              </h3>
              <p className="font-body mt-2 text-[13.5px] leading-relaxed text-text-muted">
                {desc}
              </p>
              <span className="font-body mt-5 flex items-center gap-1.5 text-[13px] font-medium text-signal-strong">
                Explore
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Gallery Preview
   ========================================================= */
const GALLERY_CATEGORIES = [
  "Training Sessions",
  "Running Practice",
  "Physical Activities",
  "Events",
  "Academy Life",
];

function GalleryPreview() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
            Gallery Preview
          </motion.h2>
          <motion.div {...fadeUp}>
            <Button href="/gallery" variant="ghost" icon={Camera}>
              View Gallery
            </Button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {GALLERY_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className={`card-flat flex aspect-square flex-col items-center justify-center gap-2 px-3 text-center ${PILL_COLORS[i % PILL_COLORS.length]}`}
            >
              <Camera size={20} />
              <span className="font-body text-[12px] font-medium">{cat}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. YouTube Videos
   ========================================================= */
const VIDEO_TOPICS = [
  "Running Tips",
  "Physical Test Guidance",
  "Student Motivation",
];

function YouTubeVideos() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
            YouTube Videos
          </motion.h2>
          <motion.div {...fadeUp}>
            <Button href="https://youtube.com" variant="ghost" icon={Video}>
              Watch More Videos
            </Button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VIDEO_TOPICS.map((topic, i) => (
            <motion.div
              key={topic}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat flex aspect-video flex-col items-center justify-center gap-2"
            >
              <Video size={26} className="text-signal-strong" />
              <span className="font-body text-[13px] font-medium text-text-muted">{topic}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Contact
   ========================================================= */
function ContactSection() {
  const cards = [
    { icon: Phone, label: "Mobile", lines: ["8863081082", "7739776471"] },
    { icon: MessageCircle, label: "WhatsApp", lines: ["8863081082", "7739776471"] },
    { icon: Mail, label: "Email", lines: ["ganeshkumar90067@gmail.com"], breakAll: true },
    {
      icon: MapPin,
      label: "Academy Address",
      lines: [
        "K.R.K. Ground, Near Lakhisarai Railway Station, Nawada Sikandara Road, Lakhisarai, Bihar – 811311",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={3} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          Get In Touch
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Contact the Academy
        </motion.h2>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map(({ icon: Icon, label, lines, breakAll }) => (
            <div key={label} className="card-flat p-5">
              <Icon size={18} className="text-signal-strong" />
              <p className="font-display mt-3 text-[14px] font-semibold text-text">
                {label}
              </p>
              {lines.map((line) => (
                <p
                  key={line}
                  className={`font-body text-[14px] text-text-muted ${breakAll ? "break-all" : ""}`}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function About() {
  return (
    <>
      <AboutHero />
      <ExploreGrid />
      {/* <GalleryPreview />
      <YouTubeVideos />
      <ContactSection /> */}
    </>
  );
}
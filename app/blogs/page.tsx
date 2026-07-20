"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  PlayCircle,
  MessageCircle,
  ArrowRight,
  GraduationCap,
  Flame,
  Bell,
  Video,
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

const WHATSAPP_NUMBER = "918863081082";

function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const images = {
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(34,197,94,0.08), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.10), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(37,99,235,0.08), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(34,197,94,0.09), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(37,99,235,0.08), transparent 55%)",
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
   Shared sub-navigation across all /blog pages
   ========================================================= */
export const BLOG_NAV = [
  { href: "/blogs", label: "Overview" },
  { href: "/blogs/categories", label: "Categories" },
  { href: "/blogs/articles", label: "Latest Articles" },
  { href: "/blogs/topics", label: "Popular Topics" },
];

export function BlogSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Blog section pages" className="flex flex-wrap gap-2">
      {BLOG_NAV.map((item) => {
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
function BlogHero() {
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
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Academy Blog
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
            Academy Blog &amp;{" "}
            <span className="text-gradient-brand">Knowledge Hub</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            Stay informed with the latest blogs on government job
            preparation, physical fitness, running techniques, nutrition,
            motivation, recruitment updates, and academy news.
          </p>

          <div className="mt-8">
            <BlogSubNav current="/blog" />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/blog/articles" variant="primary" icon={Newspaper}>
              Read Latest Blogs
            </Button>
            
            <Button
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="secondary"
              icon={MessageCircle}
            >
              WhatsApp Enquiry
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Explore Grid — links out to the four subpages
   ========================================================= */
const EXPLORE_CARDS = [
  {
    href: "/blogs/categories",
    icon: GraduationCap,
    title: "Categories",
    desc: "Browse articles by exam, fitness topic, or recruitment stream.",
  },
  {
    href: "/blogs/articles",
    icon: Newspaper,
    title: "Latest Articles",
    desc: "Search and filter every post from the academy, newest first.",
  },
  {
    href: "/blogs/topics",
    icon: Flame,
    title: "Popular Topics",
    desc: "Quick-jump tags readers come back to most.",
  },
 
];

const ICON_TINTS = [
  "text-signal-strong",
  "text-accent-strong",
  "text-teal",
  "text-pink",
];

function ExploreGrid() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Explore
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]"
        >
          Find what you're looking for
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
   3. Stay Updated CTA — hub-only, mirrors Courses' ContactInfo
   ========================================================= */
function StayUpdatedCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-14"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 800px 400px at 15% 0%, rgba(37,99,235,0.35), transparent 60%), radial-gradient(ellipse 700px 400px at 90% 100%, rgba(34,197,94,0.28), transparent 55%)",
            }}
          />
          <div className="relative">
            <Bell size={26} className="mx-auto text-white" />
            <h2 className="font-display mx-auto mt-4 max-w-[28ch] text-[28px] font-bold text-white sm:text-[38px]">
              Never Miss a New Blog or Recruitment Update!
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                variant="primary"
                icon={MessageCircle}
              >
                Join WhatsApp Channel
              </Button>
              <Button href="https://youtube.com" variant="primary" icon={Video}>
                Subscribe on YouTube
              </Button>
            
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Blog() {
  return (
    <>
      <BlogHero />
      <ExploreGrid />
      <StayUpdatedCTA />
    </>
  );
}
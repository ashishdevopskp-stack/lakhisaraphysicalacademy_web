// app/blogs/page.tsx

import { MessageCircle, Newspaper, ArrowRight, GraduationCap, Flame, Bell, Video } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { whatsappHref } from "../lib/constants";
import { SectionGlow, BlogSubNav } from "./_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "./_BlogMotion";

export const metadata = {
  title: "Academy Blog & Knowledge Hub | Lakhisarai Physical Academy",
  description:
    "Blogs on government job preparation, physical fitness, running technique, nutrition, motivation, recruitment updates and academy news.",
};

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

const ICON_TINTS = ["text-signal-strong", "text-accent-strong", "text-teal", "text-pink"];

function BlogHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Academy Blog
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
            Academy Blog &amp; <span className="text-gradient-brand">Knowledge Hub</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            Stay informed with the latest blogs on government job
            preparation, physical fitness, running techniques, nutrition,
            motivation, recruitment updates, and academy news.
          </p>

          <div className="mt-8">
            {/* was current="/blog" (singular) — corrected to match BLOG_NAV's "/blogs" href */}
            <BlogSubNav current="/blogs" />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {/* was href="/blog/articles" (singular) — dead link, corrected to "/blogs/articles" */}
            <Button href="/blogs/articles" variant="primary" icon={Newspaper}>
              Read Latest Blogs
            </Button>
            <Button href={whatsappHref()} variant="secondary" icon={MessageCircle}>
              WhatsApp Enquiry
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

function ExploreGrid() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <ScrollFadeUp>
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Explore
          </p>
        </ScrollFadeUp>
        <ScrollFadeUp delay={0.05}>
          <h2 className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]">
            Find what you're looking for
          </h2>
        </ScrollFadeUp>

        <StaggerList
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.05}
        >
          {EXPLORE_CARDS.map(({ href, icon: Icon, title, desc }, i) => (
            <StaggerItem key={href} hover>
              <a href={href} className="card-flat group flex h-full flex-col p-6">
                <Icon size={22} className={ICON_TINTS[i % ICON_TINTS.length]} />
                <h3 className="font-display mt-4 text-[16px] font-semibold text-text">
                  {title}
                </h3>
                <p className="font-body mt-2 text-[13.5px] leading-relaxed text-text-muted">
                  {desc}
                </p>
                <span className="font-body mt-5 flex items-center gap-1.5 text-[13px] font-medium text-signal-strong">
                  Explore
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

function StayUpdatedCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp
          className="relative overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-14"
        >
          <div
            className="absolute inset-0 -z-10"
            style={{ backgroundColor: "var(--color-navy)" }}
          />
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
              <Button href={whatsappHref()} variant="primary" icon={MessageCircle}>
                Join WhatsApp Channel
              </Button>
              {/* TODO: replace with your actual YouTube channel/video URL */}
              <Button href="https://youtube.com" variant="primary" icon={Video}>
                Subscribe on YouTube
              </Button>
            </div>
          </div>
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

export default function Blog() {
  return (
    <>
      <BlogHero />
      <ExploreGrid />
      <StayUpdatedCTA />
    </>
  );
}
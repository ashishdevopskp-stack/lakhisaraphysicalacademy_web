// app/blogs/page.tsx

import { MessageCircle, Newspaper, ArrowRight, GraduationCap, Flame, Bell, Video, Dumbbell, Sparkles } from "lucide-react";
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
    title: "Categories & Exam Streams",
    tag: "16+ Categories",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    iconGradient: "from-amber-500 to-orange-600 shadow-orange-500/25",
    cardBorder: "hover:border-orange-400 hover:shadow-orange-500/10",
    desc: "Browse articles by exam (Army, Bihar Police, SSC GD, Railway), physical fitness & recruitment streams.",
    actionText: "Explore Categories",
  },
  {
    href: "/blogs/articles",
    icon: Newspaper,
    title: "Latest Articles & Guides",
    tag: "Updated Daily",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    iconGradient: "from-emerald-500 to-teal-600 shadow-teal-500/25",
    cardBorder: "hover:border-emerald-400 hover:shadow-emerald-500/10",
    desc: "Search and filter every post from academy experts, newest first with running, workout & written exam tips.",
    actionText: "Browse Articles",
  },
  {
    href: "/blogs/topics",
    icon: Flame,
    title: "Popular Topics & Tags",
    tag: "Trending Now",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    iconGradient: "from-rose-500 to-red-600 shadow-red-500/25",
    cardBorder: "hover:border-rose-400 hover:shadow-red-500/10",
    desc: "Quick-jump tags & high-demand guides that defence & police aspirants come back to most.",
    actionText: "View Popular Topics",
  },
  {
    href: "/blogs/categories?category=Physical%20Training",
    icon: Dumbbell,
    title: "Physical & Fitness Drills",
    tag: "1600m & High Jump",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    iconGradient: "from-blue-500 to-indigo-600 shadow-indigo-500/25",
    cardBorder: "hover:border-blue-400 hover:shadow-indigo-500/10",
    desc: "Proven drills for 1600m running timing, High Jump technique, chest growth & medical fitness.",
    actionText: "Read Fitness Drills",
  },
];

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
            <BlogSubNav current="/blogs" />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
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
    <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-50/70 border-y border-slate-200/80">
      <SectionGlow variant={2} />
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <ScrollFadeUp>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-[#ea580c] font-black text-xs uppercase tracking-wider">
              <Sparkles size={14} />
              Explore Directory
            </span>
            <h2 className="font-display mt-3 text-2xl sm:text-4xl font-black text-slate-900">
              Find What You&apos;re Looking For
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 max-w-xl">
              Categorized articles, recruitment notifications, running tips, and physical training strategies tailored for army &amp; police exams.
            </p>
          </ScrollFadeUp>
        </div>

        <StaggerList
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.06}
        >
          {EXPLORE_CARDS.map(({ href, icon: Icon, title, tag, badgeColor, iconGradient, cardBorder, desc, actionText }) => (
            <StaggerItem key={href} hover>
              <a
                href={href}
                className={`group relative flex flex-col justify-between h-full p-6 bg-white rounded-3xl border-2 border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 ${cardBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconGradient} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={24} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${badgeColor}`}>
                      {tag}
                    </span>
                  </div>

                  <h3 className="font-display mt-5 text-lg font-black text-slate-900 group-hover:text-[#ea580c] transition-colors leading-snug">
                    {title}
                  </h3>

                  <p className="font-body mt-2 text-xs font-semibold text-slate-600 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-[#ea580c] group-hover:underline">
                    {actionText}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-orange-50 group-hover:bg-[#ea580c] text-[#ea580c] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
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
              <a
                href="https://whatsapp.com/channel/0029VaAoQ1gDjiOa3By7bM3s"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105"
              >
                <MessageCircle size={18} />
                <span>Join WhatsApp Channel</span>
              </a>

              {/* TODO: replace with your actual YouTube channel/video URL */}
              <Button href="https://www.youtube.com/@lakhisaraiphysicalacademy?si=S80l_B7Z0lWTtZSU" variant="primary" icon={Video}>
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
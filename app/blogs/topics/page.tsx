// app/blogs/topics/page.tsx

import {
  Flame,
  Award,
  Bell,
  Salad,
  Dumbbell,
  Sparkles,
  Zap,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, BlogSubNav } from "../_shared";
import { FadeInUp, StaggerList, StaggerItem } from "../_BlogMotion";

export const metadata = {
  title: "Popular Topics | Academy Blog",
  description:
    "Quick-jump into the academy blog's most-read topics — running tips, physical test prep, diet plans, motivation and more.",
};

const POPULAR_TOPICS = [
  {
    title: "Running Tips",
    desc: "Sprint mechanics, 1600m pacing, stamina building & breathing techniques.",
    icon: Flame,
    color: "from-orange-500 to-amber-600",
    badge: "Most Popular",
  },
  {
    title: "Physical Test Preparation",
    desc: "High jump, long jump, shot put & PET exam standards.",
    icon: Award,
    color: "from-blue-600 to-indigo-600",
    badge: "PET Exam",
  },
  {
    title: "Government Job Updates",
    desc: "Bihar Police, Army, SSC GD & Railway recruitment news.",
    icon: Bell,
    color: "from-emerald-600 to-teal-600",
    badge: "Recruitment",
  },
  {
    title: "Diet Plans",
    desc: "High-protein nutrition, hydration & recovery pre/post workout.",
    icon: Salad,
    color: "from-green-600 to-emerald-600",
    badge: "Nutrition",
  },
  {
    title: "Workout Routines",
    desc: "Leg strength, core workouts, flexibility & warm-up drills.",
    icon: Dumbbell,
    color: "from-purple-600 to-pink-600",
    badge: "Fitness",
  },
  {
    title: "Success Stories",
    desc: "Inspirational selection journeys of LPA students in Bihar Police & Army.",
    icon: Sparkles,
    color: "from-[#ff9933] to-[#138808]",
    badge: "Selections",
  },
  {
    title: "Motivation",
    desc: "Mental toughness, discipline & daily drive for defence aspirants.",
    icon: Zap,
    color: "from-rose-500 to-orange-500",
    badge: "Mindset",
  },
  {
    title: "Exam Preparation",
    desc: "Written exam tips, GK, current affairs & daily study strategy.",
    icon: BookOpen,
    color: "from-cyan-600 to-blue-600",
    badge: "Written Test",
  },
];

function TopicsHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-10 pt-16 sm:pt-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white">
      <SectionGlow variant={1} />
      <Container>
        <FadeInUp>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <TrendingUp size={14} className="text-orange-400" />
            <span>Curated Topics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Explore Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">Blog Topics</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl font-medium">
            Jump directly into physical training techniques, exam guides, nutrition, and student stories.
          </p>

          <div className="mt-8">
            <BlogSubNav current="/blogs/topics" />
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

function TopicsGrid() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50">
      <Container>
        <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.04}>
          {POPULAR_TOPICS.map((t) => {
            const Icon = t.icon;
            return (
              <StaggerItem key={t.title} hover>
                <a
                  href={`/blogs/articles?category=${encodeURIComponent(t.title)}`}
                  className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-orange-400 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${t.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                        {t.badge}
                      </span>
                    </div>

                    <h2 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                      {t.title}
                    </h2>
                    <p className="mt-2 text-xs font-semibold text-slate-600 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-orange-600 group-hover:text-orange-700">
                    <span>Explore Articles</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Container>
    </section>
  );
}

export default function BlogTopics() {
  return (
    <>
      <TopicsHero />
      <TopicsGrid />
    </>
  );
}
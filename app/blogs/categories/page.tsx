// app/blogs/categories/page.tsx

import {
  Shield, ShieldAlert, Star, ShieldCheck, TrainFront, Siren, Activity,
  Dumbbell, Salad, Flame, Target, Megaphone, Trophy, Clapperboard,
  GraduationCap, Sparkles,
} from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, BlogSubNav } from "../_shared";
import { FadeInUp, StaggerList, StaggerItem } from "../_BlogMotion";
import { ServiceLogo } from "../../components/ServiceLogos";

export const metadata = {
  title: "Browse By Category | Academy Blog",
  description:
    "Browse academy blog posts by category — Army, Bihar Police, SSC GD, Railway, fitness, nutrition, exam prep and more.",
};

const CATEGORIES = [
  { label: "Army Preparation" },
  { label: "Bihar Police" },
  { label: "Daroga (SI)" },
  { label: "SSC GD" },
  { label: "Railway" },
  { label: "Defence & Paramilitary" },
  { label: "Physical Training" },
  { label: "Fitness & Workout" },
  { label: "Diet & Nutrition" },
  { label: "Running Tips" },
  { label: "Exam Preparation" },
  { label: "Recruitment News" },
  { label: "Student Success Stories" },
  { label: "Academy Updates" },
  { label: "General Knowledge" },
  { label: "Motivation" },
] as const;

function CategoriesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-16 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <FadeInUp>
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Academy Blog
          </p>
          <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
            Browse By <span className="text-gradient-brand">Category</span>
          </h1>
          <div className="mt-8">
            <BlogSubNav current="/blogs/categories" />
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <StaggerList
          className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8"
          staggerDelay={0.03}
        >
          {CATEGORIES.map(({ label }) => (
            <StaggerItem key={label} hover>
              <a
                href={`/blogs/articles?category=${encodeURIComponent(label)}`}
                className="group relative flex flex-col items-center justify-between p-4 text-center cursor-pointer rounded-3xl bg-white hover:bg-gradient-to-b hover:from-white hover:to-orange-50/50 border-2 border-slate-200/90 hover:border-orange-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="my-2 transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
                  <ServiceLogo label={label} size={68} />
                </div>
                <span className="font-body text-[12.5px] font-black text-slate-900 group-hover:text-orange-600 leading-tight mt-2">
                  {label}
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

export default function BlogCategories() {
  return (
    <>
      <CategoriesHero />
      <CategoryGrid />
    </>
  );
}
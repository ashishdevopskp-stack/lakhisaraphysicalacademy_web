// app/blogs/categories/page.tsx

import {
  Shield, ShieldAlert, Star, ShieldCheck, TrainFront, Siren, Activity,
  Dumbbell, Salad, Flame, Target, Megaphone, Trophy, Clapperboard,
  GraduationCap, Sparkles,
} from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, BlogSubNav } from "../_shared";
import { FadeInUp, StaggerList, StaggerItem } from "../_BlogMotion";

export const metadata = {
  title: "Browse By Category | Academy Blog",
  description:
    "Browse academy blog posts by category — Army, Bihar Police, SSC GD, Railway, fitness, nutrition, exam prep and more.",
};

const CATEGORIES = [
  { label: "Army Preparation", icon: Shield },
  { label: "Bihar Police", icon: ShieldAlert },
  { label: "Daroga (SI)", icon: Star },
  { label: "SSC GD", icon: ShieldCheck },
  { label: "Railway", icon: TrainFront },
  { label: "Defence & Paramilitary", icon: Siren },
  { label: "Physical Training", icon: Activity },
  { label: "Fitness & Workout", icon: Dumbbell },
  { label: "Diet & Nutrition", icon: Salad },
  { label: "Running Tips", icon: Flame },
  { label: "Exam Preparation", icon: Target },
  { label: "Recruitment News", icon: Megaphone },
  { label: "Student Success Stories", icon: Trophy },
  { label: "Academy Updates", icon: Clapperboard },
  { label: "General Knowledge", icon: GraduationCap },
  { label: "Motivation", icon: Sparkles },
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
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
          staggerDelay={0.03}
        >
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <StaggerItem key={label} hover>
              <a
                href={`/blogs/articles?category=${encodeURIComponent(label)}`}
                className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center transition-transform hover:scale-[1.03]"
              >
                <Icon size={20} className="text-signal" />
                <span className="font-body text-[12px] text-text-muted">{label}</span>
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
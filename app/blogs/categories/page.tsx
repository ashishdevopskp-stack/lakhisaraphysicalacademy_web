"use client";

import { motion } from "framer-motion";
import {
  Shield, ShieldAlert, Star, ShieldCheck, TrainFront, Siren, Activity,
  Dumbbell, Salad, Flame, Target, Megaphone, Trophy, Clapperboard,
  GraduationCap, Sparkles,
} from "lucide-react";
import Container from "../../components/Container";
import { BlogSubNav } from "../page";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

function SectionGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(34,197,94,0.08), transparent 55%)",
      }}
    />
  );
}

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
      <SectionGlow />
      <Container>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Academy Blog
          </p>
          <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
            Browse By <span className="text-gradient-brand">Category</span>
          </h1>
          <div className="mt-8">
            <BlogSubNav current="/blogs/categories" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map(({ label, icon: Icon }, i) => (
            <motion.a
              key={label}
              href={`/blogs/articles?category=${encodeURIComponent(label)}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 8) * 0.03 }}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center transition-transform hover:scale-[1.03]"
            >
              <Icon size={20} className="text-signal" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
            </motion.a>
          ))}
        </div>
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
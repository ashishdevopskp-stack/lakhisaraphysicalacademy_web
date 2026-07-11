"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  Camera,
  Star,
  Video,
  ClipboardList,
  MessageCircle,
  Phone,
  Dumbbell,
  Target,
  TrendingUp,
  BarChart3,
  Users,
  Flame,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import { fadeUp, PILL_COLORS, SectionGlow, Eyebrow } from "../_shared";

const GALLERY_CATEGORIES = [
  "Training Sessions",
  "Running Practice",
  "Physical Activities",
  "Events",
  "Academy Life",
];

const REVIEWS = [
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
];

const VIDEO_TOPICS = ["Running Tips", "Physical Test Guidance", "Student Motivation"];

const WHY_CHOOSE = [
  { icon: Dumbbell, label: "Professional Physical Guidance", tint: "text-signal" },
  { icon: Target, label: "Exam-Oriented Training", tint: "text-accent-strong" },
  { icon: TrendingUp, label: "Strength & Endurance Development", tint: "text-[#0f766e]" },
  { icon: BarChart3, label: "Regular Performance Evaluation", tint: "text-[#be185d]" },
  { icon: Users, label: "Personal Attention", tint: "text-signal" },
  { icon: Flame, label: "Motivational Coaching", tint: "text-accent-strong" },
  { icon: ShieldCheck, label: "Disciplined Training Environment", tint: "text-[#0f766e]" },
  { icon: ArrowRight, label: "Continuous Improvement", tint: "text-[#be185d]" },
];

function VisionHero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <Link
          href="/about"
          className="font-body inline-flex items-center gap-1.5 text-[14px] font-medium text-text-muted transition-colors hover:text-signal"
        >
          <ArrowLeft size={16} />
          Back to About
        </Link>

        <motion.div {...fadeUp} className="mt-6">
          <Eyebrow>Our Vision</Eyebrow>
          <h1 className="font-display mt-4 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[46px]">
            Trusted{" "}
            <span className="text-gradient-brand">Across Bihar</span>
          </h1>
          <p className="font-body mt-5 max-w-[56ch] text-[16px] leading-relaxed text-text-muted">
            To become one of the most trusted physical training academies in
            Bihar by empowering students with discipline, fitness, and
            confidence, helping them achieve success in defence, police, and
            other government services.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function VisionStatement() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <motion.div {...fadeUp} className="card-flat max-w-[62ch] p-7">
          <div className="flex items-center gap-2 text-signal">
            <Compass size={20} />
            <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em]">
              Looking Ahead
            </span>
          </div>
          <p className="font-body mt-4 text-[15.5px] leading-relaxed text-text-muted">
            Every batch, every session, and every student is part of a
            larger goal — building a name that students and families across
            Bihar trust when preparing for defence, police, and government
            recruitment physical tests.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <SectionGlow variant={2} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display max-w-[24ch] text-[28px] font-bold sm:text-[34px]">
          Why Students Choose{" "}
          <span className="text-gradient-brand">Ganesh Sir</span>
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map(({ icon: Icon, label, tint }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="card-flat p-6"
            >
              <Icon size={22} className={tint} />
              <p className="font-body mt-4 text-[14px] font-semibold text-text">{label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function GalleryPreview() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
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

function Reviews() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <SectionGlow variant={3} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Student Reviews
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-6"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-body mt-3 text-[14px] leading-relaxed text-text-muted">
                &ldquo;{r.review}&rdquo;
              </p>
              <p className="font-display mt-4 text-[14px] font-semibold text-text">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function YouTubeVideos() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
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
              <Video size={26} className="text-signal" />
              <span className="font-body text-[13px] font-medium text-text-muted">{topic}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="admission" className="py-14 sm:py-20">
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
            <h2 className="font-display mx-auto max-w-[24ch] text-[28px] font-bold text-white sm:text-[38px]">
              Start Your Physical Training Journey Today
            </h2>
            <p className="font-body mx-auto mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-text-on-dark-muted">
              Join Lakhisarai Physical Academy under the guidance of Founder
              &amp; Director Ganesh Sir and prepare yourself with discipline,
              dedication, and determination for your dream career.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/about#admission" variant="primary" icon={ClipboardList}>
                Apply Online
              </Button>
              <Button href="https://wa.me/918863081082" variant="accent" icon={MessageCircle}>
                WhatsApp Now
              </Button>
              <Button
                href="tel:8863081082"
                variant="secondary"
                icon={Phone}
                className="border-white/20 bg-white/10 text-white hover:border-white/40 hover:text-white"
              >
                Call Now
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default function VisionPage() {
  return (
    <>
      <VisionHero />
      <VisionStatement />
      <WhyChoose />
      <GalleryPreview />
      <Reviews />
      <YouTubeVideos />
      <FinalCTA />
    </>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Phone,
  MessageCircle,
  Target,
  Compass,
  CheckCircle2,
  Dumbbell,
  BarChart3,
  Users,
  Flame,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  MapPin,
  Mail,
  Star,
  Video,
  Camera,
  Trophy,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

/* Reusable soft gradient wash for section backgrounds — sits on top of the
   body's own drifting liquid gradient, so keep these subtle */
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
   1. Founder Hero
   ========================================================= */
function FounderHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              Founder &amp; Director
            </p>

            <h1 className="font-display mt-5 max-w-[16ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
              About{" "}
              <span className="text-gradient-brand">Trainer Ganesh</span>
            </h1>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Roles">
              {["Dedicated Mentor", "Professional Physical Trainer", "Founder & Director"].map(
                (role, i) => (
                  <span key={role} className={`pill ${PILL_COLORS[i % PILL_COLORS.length]}`}>
                    {role}
                  </span>
                )
              )}
            </div>

            <p className="font-body mt-6 max-w-[52ch] text-[15.5px] leading-relaxed text-text-muted">
              Ganesh Sir is the Founder &amp; Director of Lakhisarai Physical
              Academy. With a passion for physical fitness and disciplined
              training, he has been guiding aspiring candidates preparing for
              Army, Bihar Police, Daroga, SSC GD, and other government
              recruitment physical examinations. His goal is to help every
              student improve their physical performance, confidence, and
              overall readiness for selection.
            </p>

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

          {/* Founder portrait frame — liquid glass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative order-first mx-auto aspect-[4/5] w-full max-w-[320px] lg:order-last"
          >
            <div
              aria-hidden
              className="absolute -inset-5 -z-10 rounded-[28px] opacity-70 blur-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(59,130,246,0.34), rgba(20,184,166,0.26), rgba(245,166,35,0.24))",
              }}
            />
            <div className="glass glass-sheen absolute inset-4 flex flex-col items-center justify-center overflow-hidden rounded-[16px] shadow-[var(--shadow-card)]">
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
                Founder Photo
              </span>
              <span className="mt-4 flex h-24 w-24 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-[28px] font-bold text-signal-strong">
                GS
              </span>
              <span className="font-display mt-4 text-[13px] font-medium text-text-muted">
                Ganesh Sir
              </span>
            </div>
            {/* Corner trophy mark */}
            <div className="absolute -bottom-3 -right-3 flex h-14 w-14 items-center justify-center rounded-full border border-signal-strong bg-signal text-on-signal shadow-[0_4px_14px_rgba(37,99,235,0.4)]">
              <Trophy size={22} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Meet Our Founder & Director
   ========================================================= */
function MeetFounder() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div {...fadeUp} className="max-w-[62ch]">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Our Story
          </p>
          <h2 className="font-display mt-4 text-[28px] font-bold sm:text-[36px]">
            Meet Our Founder &amp; Director
          </h2>
          <p className="font-body mt-5 text-[15.5px] leading-relaxed text-text-muted">
            Ganesh Sir established Lakhisarai Physical Academy with the
            vision of providing quality physical training to students who
            aspire to serve the nation. Through structured workouts,
            discipline, and personalized guidance, he has created a
            motivating environment where students can prepare confidently
            for competitive physical tests.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Vision & Mission
   ========================================================= */
const MISSION = [
  "Provide professional physical training.",
  "Build strength, stamina, and endurance.",
  "Prepare students for government recruitment physical tests.",
  "Encourage discipline, dedication, and consistency.",
  "Support every student in reaching their career goals.",
];

function VisionMission() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div {...fadeUp} className="card-flat p-7">
            <div className="flex items-center gap-2 text-signal-strong">
              <Compass size={20} />
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em]">
                Our Vision
              </p>
            </div>
            <p className="font-body mt-4 text-[15.5px] leading-relaxed text-text-muted">
              To become one of the most trusted physical training academies
              in Bihar by empowering students with discipline, fitness, and
              confidence, helping them achieve success in defence, police,
              and other government services.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="card-flat p-7"
          >
            <div className="flex items-center gap-2 text-accent-strong">
              <Target size={20} />
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em]">
                Our Mission
              </p>
            </div>
            <ul className="mt-4 space-y-3">
              {MISSION.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-accent-strong"
                  />
                  <span className="font-body text-[15px] text-text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Training Philosophy — laid out like track lanes
   ========================================================= */
const TRAINING_FOCUS = [
  "Running Practice",
  "Endurance Training",
  "Speed Development",
  "Strength & Conditioning",
  "Physical Test Preparation",
  "Daily Performance Monitoring",
  "Motivation & Discipline",
];

function TrainingPhilosophy() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          How We Train
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[30ch] text-[28px] font-bold sm:text-[36px]"
        >
          Training focuses on overall physical development
        </motion.h2>

        <div className="card-flat mt-10 divide-y divide-line overflow-hidden">
          {TRAINING_FOCUS.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="flex items-center gap-5 px-6 py-4"
            >
              <span
                className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} font-mono text-[12px]`}
              >
                Lane {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body text-[15px] font-medium text-text">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Why Students Choose Ganesh Sir
   ========================================================= */
const WHY_CHOOSE = [
  { icon: Dumbbell, label: "Professional Physical Guidance" },
  { icon: Target, label: "Exam-Oriented Training" },
  { icon: TrendingUp, label: "Strength & Endurance Development" },
  { icon: BarChart3, label: "Regular Performance Evaluation" },
  { icon: Users, label: "Personal Attention" },
  { icon: Flame, label: "Motivational Coaching" },
  { icon: ShieldCheck, label: "Disciplined Training Environment" },
  { icon: RefreshCw, label: "Continuous Improvement" },
];

const ICON_TINTS = [
  "text-signal-strong",
  "text-accent-strong",
  "text-teal",
  "text-pink",
  "text-signal-strong",
  "text-accent-strong",
  "text-teal",
  "text-pink",
];

function WhyChoose() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={3} />
      <Container>
        <motion.h2
          {...fadeUp}
          className="font-display max-w-[24ch] text-[28px] font-bold sm:text-[36px]"
        >
          Why Students Choose{" "}
          <span className="text-gradient-brand">Ganesh Sir</span>
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="card-flat p-6"
            >
              <Icon size={22} className={ICON_TINTS[i]} />
              <p className="font-body mt-4 text-[14px] font-semibold text-text">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   6. Academy Facilities
   ========================================================= */
const FACILITIES = [
  "Running Track Practice",
  "Daily Physical Training",
  "Strength Exercises",
  "Group Practice Sessions",
  "Performance Assessment",
  "Guest Physical Test Sessions",
  "Hostel Facility (Subject to Availability)",
];

function Facilities() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal"
        >
          Academy Facilities
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]"
        >
          What students get access to
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FACILITIES.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.03 }}
              className="card-flat flex items-center gap-3 px-5 py-4"
            >
              <CheckCircle2 size={18} className="shrink-0 text-accent-strong" />
              <span className="font-body text-[15px] text-text">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   7. Student Success
   ========================================================= */
const ACHIEVERS = [
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
];

function StudentSuccess() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={1} />
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.div {...fadeUp}>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              Proud Achievements
            </p>
            <h2 className="font-display mt-4 text-[28px] font-bold sm:text-[36px]">
              Student Success
            </h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <Button href="/students" variant="ghost" icon={Trophy}>
              View All Selected Students
            </Button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {ACHIEVERS.map((a, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-6"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line-strong bg-bg-raised-2 font-mono text-[12px] text-text-muted">
                Photo
              </div>
              <p className="font-body mt-4 text-center text-[15px] font-semibold text-text">
                {a.name}
              </p>
              <p className="font-body text-center text-[13px] text-text-muted">
                {a.post} &middot; {a.exam} &middot; {a.year}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   8. Gallery Preview
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
    <section className="py-16 sm:py-24">
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
   9. Student Reviews
   ========================================================= */
const REVIEWS = [
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
];

function Reviews() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
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
              <p className="font-display mt-4 text-[14px] font-semibold text-text">
                {r.name}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   10. YouTube Videos
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
   11. Contact
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
          Founder &amp; Director
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Contact Ganesh Sir
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
   12. Final CTA
   ========================================================= */
function FinalCTA() {
  return (
    <section id="admission" className="py-16 sm:py-24">
      <Container>
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-2xl border border-line px-6 py-14 text-center sm:px-14"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <span className="ribbon-bar absolute inset-x-0 top-0 h-[4px]" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 800px 400px at 15% 0%, rgba(59,130,246,0.38), transparent 60%), radial-gradient(ellipse 700px 400px at 90% 100%, rgba(245,166,35,0.24), transparent 55%)",
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
              <Button href="#admission" variant="primary" icon={ClipboardList}>
                Apply Online
              </Button>
              <Button
                href="https://wa.me/918863081082"
                variant="whatsapp"
                icon={MessageCircle}
              >
                WhatsApp Now
              </Button>
              <Button href="tel:8863081082" variant="secondary" icon={Phone}>
                Call Now
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
export default function About() {
  return (
    <>
      <FounderHero />
      <MeetFounder />
      <VisionMission />
      <TrainingPhilosophy />
      <WhyChoose />
      <Facilities />
      <StudentSuccess />
      <GalleryPreview />
      <Reviews />
      <YouTubeVideos />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
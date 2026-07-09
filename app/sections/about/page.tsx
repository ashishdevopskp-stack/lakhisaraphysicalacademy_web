"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Phone,
  MessageCircle,
  ArrowRight,
  Target,
  Compass,
  CheckCircle2,
  Dumbbell,
  BarChart3,
  Users,
  Flame,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Mail,
  Star,
  Video,
  Camera,
  Trophy,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

/* =========================================================
   1. Founder Hero
   ========================================================= */
function FounderHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line pb-16 pt-14 sm:pb-24 sm:pt-20"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal">
              Founder &amp; Director
            </p>

            <h1 className="mt-5 max-w-[16ch] text-[34px] sm:text-[44px] lg:text-[52px]">
              About Trainer Ganesh
            </h1>

            <div className="mt-5 flex flex-wrap gap-2" aria-label="Roles">
              {["Dedicated Mentor", "Professional Physical Trainer", "Founder & Director"].map(
                (role) => (
                  <Badge key={role}>{role}</Badge>
                )
              )}
            </div>

            <p className="mt-6 max-w-[52ch] text-[15px] text-text-muted">
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
                variant="ghost"
                icon={MessageCircle}
              >
                WhatsApp
              </Button>
            </div>
          </motion.div>

          {/* Founder portrait frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative order-first mx-auto aspect-[4/5] w-full max-w-[320px] lg:order-last"
          >
            <div
              className="absolute inset-0 rounded-2xl border border-line"
              style={{
                background:
                  "radial-gradient(circle at 50% 20%, var(--color-bg-raised) 0%, var(--color-bg) 75%)",
              }}
            />
            <div className="absolute inset-4 flex flex-col items-center justify-center rounded-xl border border-line-strong bg-bg-raised">
              <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-text-muted">
                Founder Photo
              </span>
              <span className="mt-4 flex h-24 w-24 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-[28px] text-signal">
                GS
              </span>
              <span className="mt-4 text-[13px] text-text-muted">
                Ganesh Sir
              </span>
            </div>
            {/* Lane-style corner mark, echoing the homepage stopwatch motif */}
            <div className="absolute -bottom-3 -right-3 flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-signal text-on-signal">
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
    <section className="border-b border-line py-16 sm:py-24">
      <Container>
        <motion.div {...fadeUp} className="max-w-[62ch]">
          <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal">
            Our Story
          </p>
          <h2 className="mt-4 text-[28px] sm:text-[34px]">
            Meet Our Founder &amp; Director
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-text-muted">
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
    <section className="border-b border-line bg-bg-raised py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div {...fadeUp} className="rounded-xl border border-line bg-bg p-7">
            <div className="flex items-center gap-2 text-signal">
              <Compass size={20} />
              <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em]">
                Our Vision
              </p>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
              To become one of the most trusted physical training academies
              in Bihar by empowering students with discipline, fitness, and
              confidence, helping them achieve success in defence, police,
              and other government services.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="rounded-xl border border-line bg-bg p-7"
          >
            <div className="flex items-center gap-2 text-signal">
              <Target size={20} />
              <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em]">
                Our Mission
              </p>
            </div>
            <ul className="mt-4 space-y-3">
              {MISSION.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-signal"
                  />
                  <span className="text-[15px] text-text-muted">{item}</span>
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
    <section className="border-b border-line py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal"
        >
          How We Train
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-4 max-w-[30ch] text-[28px] sm:text-[34px]"
        >
          Training focuses on overall physical development
        </motion.h2>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {TRAINING_FOCUS.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="flex items-center gap-5 py-4"
            >
              <span className="font-mono text-[13px] text-text-muted">
                Lane {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-medium text-text">
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
  { icon: ArrowRight, label: "Continuous Improvement" },
];

function WhyChoose() {
  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="max-w-[24ch] text-[28px] sm:text-[34px]">
          Why Students Choose Ganesh Sir
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="rounded-xl border border-line bg-bg p-6"
            >
              <Icon size={22} className="text-signal" />
              <p className="mt-4 text-[14px] font-medium text-text">
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
    <section className="border-b border-line py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal"
        >
          Academy Facilities
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-4 max-w-[28ch] text-[28px] sm:text-[34px]"
        >
          What students get access to
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FACILITIES.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.03 }}
              className="flex items-center gap-3 rounded-lg border border-line bg-bg-raised px-5 py-4"
            >
              <CheckCircle2 size={18} className="shrink-0 text-signal" />
              <span className="text-[15px] text-text">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   7. Student Success — replace placeholders with real students
   ========================================================= */
const ACHIEVERS = [
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
];

function StudentSuccess() {
  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.div {...fadeUp}>
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal">
              Proud Achievements
            </p>
            <h2 className="mt-4 text-[28px] sm:text-[34px]">
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
              className="rounded-xl border border-line bg-bg p-6"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line-strong bg-bg-raised font-mono text-[13px] text-text-muted">
                Photo
              </div>
              <p className="mt-4 text-center text-[15px] font-medium text-text">
                {a.name}
              </p>
              <p className="text-center text-[13px] text-text-muted">
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
    <section className="border-b border-line py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...fadeUp} className="text-[28px] sm:text-[34px]">
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
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-line bg-bg-raised px-3 text-center"
            >
              <Camera size={20} className="text-text-muted" />
              <span className="text-[12px] text-text-muted">{cat}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   9. Student Reviews — replace placeholders with real reviews
   ========================================================= */
const REVIEWS = [
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
  { name: "Student Name", review: "Add a real student testimonial here.", rating: 5 },
];

function Reviews() {
  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="text-[28px] sm:text-[34px]">
          Student Reviews
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="rounded-xl border border-line bg-bg p-6"
            >
              <div className="flex gap-1 text-signal">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 text-[14px] text-text-muted">
                &ldquo;{r.review}&rdquo;
              </p>
              <p className="mt-4 text-[14px] font-medium text-text">
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
  "Recruitment Updates",
  "Academy Activities",
];

function YouTubeVideos() {
  return (
    <section className="border-b border-line py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...fadeUp} className="text-[28px] sm:text-[34px]">
            YouTube Videos
          </motion.h2>
          <motion.div {...fadeUp}>
            <Button
              href="https://youtube.com"
              variant="ghost"
              icon={Video}
            >
              Watch More Videos
            </Button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VIDEO_TOPICS.slice(0, 3).map((topic, i) => (
            <motion.div
              key={topic}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-line bg-bg-raised"
            >
              <Video size={26} className="text-signal" />
              <span className="text-[13px] text-text-muted">{topic}</span>
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
  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal"
        >
          Founder &amp; Director
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-4 text-[28px] sm:text-[34px]"
        >
          Contact Ganesh Sir
        </motion.h2>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-xl border border-line bg-bg p-5">
            <Phone size={18} className="text-signal" />
            <p className="mt-3 text-[14px] font-medium text-text">Mobile</p>
            <p className="text-[14px] text-text-muted">8863081082</p>
            <p className="text-[14px] text-text-muted">7739776471</p>
          </div>
          <div className="rounded-xl border border-line bg-bg p-5">
            <MessageCircle size={18} className="text-signal" />
            <p className="mt-3 text-[14px] font-medium text-text">WhatsApp</p>
            <p className="text-[14px] text-text-muted">8863081082</p>
            <p className="text-[14px] text-text-muted">7739776471</p>
          </div>
          <div className="rounded-xl border border-line bg-bg p-5">
            <Mail size={18} className="text-signal" />
            <p className="mt-3 text-[14px] font-medium text-text">Email</p>
            <p className="break-all text-[14px] text-text-muted">
              ganeshkumar90067@gmail.com
            </p>
          </div>
          <div className="rounded-xl border border-line bg-bg p-5">
            <MapPin size={18} className="text-signal" />
            <p className="mt-3 text-[14px] font-medium text-text">
              Academy Address
            </p>
            <p className="text-[14px] text-text-muted">
              K.R.K. Ground, Near Lakhisarai Railway Station, Nawada Sikandara
              Road, Lakhisarai, Bihar &ndash; 811311
            </p>
          </div>
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
          className="rounded-2xl border border-line bg-bg-raised px-6 py-14 text-center sm:px-14"
        >
          <h2 className="mx-auto max-w-[24ch] text-[28px] sm:text-[36px]">
            Start Your Physical Training Journey Today
          </h2>
          <p className="mx-auto mt-4 max-w-[54ch] text-[15px] text-text-muted">
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
              variant="secondary"
              icon={MessageCircle}
            >
              WhatsApp Now
            </Button>
            <Button href="tel:8863081082" variant="ghost" icon={Phone}>
              Call Now
            </Button>
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
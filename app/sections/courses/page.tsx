"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Phone,
  MessageCircle,
  ArrowRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Star,
  Flame,
  Dumbbell,
  ClipboardCheck,
  TrainFront,
  Timer,
  CheckCircle2,
  Sunrise,
  Sunset,
  Bed,
  Wallet,
  ChevronDown,
  Mail,
  BarChart3,
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

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

/* Reusable soft gradient wash for section backgrounds — matches About page */
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
   1. Hero
   ========================================================= */
function CoursesHero() {
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
            Courses &amp; Training Programs
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
            Professional Physical Training for{" "}
            <span className="text-gradient-brand">Defence, Police &amp; Government Recruitment</span>
          </h1>

          <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            Lakhisarai Physical Academy offers structured physical training
            programs designed to help candidates prepare for various
            government recruitment physical examinations. Our training
            focuses on improving stamina, speed, endurance, strength,
            agility, and overall physical performance.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#admission" variant="primary" icon={ClipboardList}>
              Apply for Admission
            </Button>
            <Button
              href="https://wa.me/918863081082"
              variant="secondary"
              icon={MessageCircle}
            >
              WhatsApp Enquiry
            </Button>
            <Button href="tel:8863081082" variant="secondary" icon={Phone}>
              Call Now
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Training Programs
   ========================================================= */
const PROGRAMS = [
  {
    icon: Shield,
    title: "Army Physical Training",
    overview:
      "Complete physical preparation for candidates appearing in Indian Army recruitment.",
    includes: [
      "Running Practice",
      "Push-ups & Strength Training",
      "Endurance Development",
      "Physical Efficiency Test (PET)",
      "Speed Improvement",
      "Stamina Building",
      "Performance Monitoring",
    ],
    suitableFor: "Army Aspirants",
  },
  {
    icon: ShieldAlert,
    title: "Bihar Police Constable Physical Training",
    includes: [
      "Long Distance Running",
      "Sprint Practice",
      "Height & Physical Standards Guidance",
      "PET Preparation",
      "Daily Fitness Assessment",
      "Mock Physical Test",
    ],
    suitableFor: "Bihar Police Constable Aspirants",
  },
  {
    icon: Star,
    title: "Bihar Daroga (SI) Physical Training",
    includes: [
      "Running Practice",
      "Endurance & Stamina Training",
      "Physical Test Preparation",
      "Mock PET",
      "Fitness Evaluation",
      "Performance Improvement",
    ],
    suitableFor: "Sub-Inspector (Daroga) Aspirants",
  },
  {
    icon: ShieldCheck,
    title: "SSC GD Physical Training",
    includes: [
      "Running Sessions",
      "Endurance Training",
      "Speed Development",
      "Physical Test Practice",
      "Agility Exercises",
      "Mock PET",
    ],
    suitableFor: "SSC GD Candidates",
  },
  {
    icon: Shield,
    title: "CISF Physical Training",
    includes: [
      "Running",
      "Physical Fitness",
      "Strength Building",
      "PET Preparation",
      "Endurance Exercises",
    ],
    suitableFor: "CISF Aspirants",
  },
  {
    icon: ShieldCheck,
    title: "CRPF Physical Training",
    includes: [
      "Running Practice",
      "Physical Endurance",
      "Strength Exercises",
      "Mock Physical Tests",
      "Performance Tracking",
    ],
    suitableFor: "CRPF Aspirants",
  },
  {
    icon: ShieldAlert,
    title: "BSF Physical Training",
    includes: [
      "Running",
      "Endurance",
      "Stamina",
      "Speed Development",
      "PET Practice",
    ],
    suitableFor: "BSF Aspirants",
  },
  {
    icon: Flame,
    title: "Fireman Physical Training",
    includes: [
      "Running",
      "Rope Climbing Practice",
      "Endurance Building",
      "Physical Fitness",
      "Mock Physical Test",
    ],
    suitableFor: "Fireman Recruitment Candidates",
  },
  {
    icon: TrainFront,
    title: "Railway Physical Training",
    includes: [
      "Running",
      "Endurance",
      "Strength Exercises",
      "Physical Test Guidance",
    ],
    suitableFor: "Railway Recruitment Aspirants",
  },
  {
    icon: Timer,
    title: "Running & Endurance Special Batch",
    includes: [
      "Long Distance Running",
      "Sprint Sessions",
      "Speed Improvement",
      "Breathing Techniques",
      "Recovery Guidance",
      "Stamina Development",
    ],
    suitableFor: "All Students",
  },
  {
    icon: Dumbbell,
    title: "Physical Fitness Program",
    includes: [
      "Full Body Workout",
      "Strength Training",
      "Core Exercises",
      "Functional Fitness",
      "Flexibility",
      "Weight Management",
    ],
    suitableFor: "Anyone interested in improving physical fitness",
  },
  {
    icon: ClipboardCheck,
    title: "Guest Physical Test Program",
    includes: [
      "Trial Physical Test",
      "Running Assessment",
      "Performance Report",
      "Expert Feedback",
      "Improvement Suggestions",
    ],
    suitableFor: "Students from any district",
    ctaLabel: "Register Now",
  },
];

function TrainingPrograms() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Our Training Programs
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]"
        >
          A program for every recruitment goal
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
              className="card-flat flex flex-col p-6"
            >
              <p.icon size={22} className="text-signal" />
              <h3 className="font-display mt-4 text-[16px] font-semibold text-text">
                {p.title}
              </h3>

              {p.overview && (
                <p className="font-body mt-2 text-[13px] text-text-muted">
                  {p.overview}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.includes.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>

              <p className="font-body mt-4 text-[13px] text-text-muted">
                Suitable for: <span className="text-text">{p.suitableFor}</span>
              </p>

              <div className="mt-5">
                <Button href="#admission" variant="ghost" icon={ArrowRight}>
                  {p.ctaLabel ?? "Join Now"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Performance Evaluation
   ========================================================= */
const EVALUATION_CRITERIA = [
  "Running Speed",
  "Stamina",
  "Endurance",
  "Strength",
  "Physical Fitness",
  "PET Readiness",
  "Overall Progress",
];

function PerformanceEvaluation() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Performance Evaluation
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[36ch] text-[28px] font-bold sm:text-[36px]"
        >
          Every student is regularly assessed on
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {EVALUATION_CRITERIA.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} flex items-center justify-center gap-2 py-3.5 text-center`}
            >
              <BarChart3 size={16} className="shrink-0" />
              <span className="font-body text-[14px] font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Training Schedule
   ========================================================= */
function TrainingSchedule() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={3} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Training Schedule
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <motion.div {...fadeUp} className="card-flat p-7">
            <Sunrise size={22} className="text-signal" />
            <p className="font-display mt-4 text-[16px] font-semibold text-text">
              Morning Batch
            </p>
            <p className="font-mono mt-1 text-[15px] text-text-muted">
              05:00 AM &ndash; 08:00 AM
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
            className="card-flat p-7"
          >
            <Sunset size={22} className="text-accent-strong" />
            <p className="font-display mt-4 text-[16px] font-semibold text-text">
              Evening Batch
            </p>
            <p className="font-mono mt-1 text-[15px] text-text-muted">
              04:00 PM &ndash; 07:00 PM
            </p>
          </motion.div>
        </div>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="font-body mt-6 text-[13px] italic text-text-muted"
        >
          Batch timings may change according to season or special training
          sessions.
        </motion.p>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Why Choose Our Training
   ========================================================= */
const WHY_CHOOSE = [
  "Professional Physical Coaching",
  "Daily Running Practice",
  "Exam-Oriented Training",
  "Regular Mock Physical Tests",
  "Performance Monitoring",
  "Motivational Environment",
  "Discipline & Consistency",
  "Personalized Guidance",
];

function WhyChoose() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display max-w-[24ch] text-[28px] font-bold sm:text-[36px]">
          Why Choose Our Training?
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((label, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="card-flat p-6"
            >
              <CheckCircle2 size={20} className="text-accent-strong" />
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
   6. Hostel Facility
   ========================================================= */
function HostelFacility() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={1} />
      <Container>
        <motion.div
          {...fadeUp}
          className="card-flat flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <Bed size={24} className="mt-1 shrink-0 text-signal" />
            <div>
              <h2 className="font-display text-[20px] font-semibold text-text">
                Hostel Facility
              </h2>
              <p className="font-body mt-2 max-w-[54ch] text-[14px] text-text-muted">
                Hostel facilities are available for students coming from
                nearby districts, subject to availability.
              </p>
            </div>
          </div>
          <Button href="tel:8863081082" variant="secondary" icon={ArrowRight}>
            Know More
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   7. Fees & Admission (gradient rounded CTA — matches About FinalCTA)
   ========================================================= */
function FeesAdmission() {
  return (
    <section id="admission" className="py-16 sm:py-24">
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
            <Wallet size={26} className="mx-auto text-white" />
            <h2 className="font-display mx-auto mt-4 max-w-[26ch] text-[28px] font-bold text-white sm:text-[38px]">
              Fees &amp; Admission
            </h2>
            <p className="font-body mx-auto mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-text-on-dark-muted">
              Interested candidates can apply online or visit the academy for
              admission and batch selection.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="#admission" variant="primary" icon={ClipboardList}>
                Apply Online
              </Button>
              <Button
                href="https://wa.me/918863081082"
                variant="primary"
                icon={MessageCircle}
              >
                WhatsApp Enquiry
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
   8. FAQ
   ========================================================= */
const FAQS = [
  {
    q: "Which courses are available?",
    a: "Army, Bihar Police, Daroga, SSC GD, CISF, CRPF, BSF, Railway, Fireman, and Running & Fitness Programs.",
  },
  {
    q: "Is hostel facility available?",
    a: "Yes, subject to availability.",
  },
  {
    q: "Can beginners join?",
    a: "Yes, beginners are welcome.",
  },
  {
    q: "Are guest physical tests available?",
    a: "Yes, students can register for guest physical test sessions.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="font-body text-[15px] font-medium text-text">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="font-body pt-3 text-[14px] text-text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="card-flat mt-8 divide-y divide-line overflow-hidden px-6"
        >
          {FAQS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   9. Contact Information
   ========================================================= */
function ContactInfo() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
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
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="card-flat p-5">
            <Phone size={18} className="text-signal" />
            <p className="font-display mt-3 text-[14px] font-semibold text-text">Mobile</p>
            <p className="font-body text-[14px] text-text-muted">8863081082</p>
            <p className="font-body text-[14px] text-text-muted">7739776471</p>
          </div>
          <div className="card-flat p-5">
            <MessageCircle size={18} className="text-signal" />
            <p className="font-display mt-3 text-[14px] font-semibold text-text">WhatsApp</p>
            <p className="font-body text-[14px] text-text-muted">8863081082</p>
            <p className="font-body text-[14px] text-text-muted">7739776471</p>
          </div>
          <div className="card-flat p-5">
            <Mail size={18} className="text-signal" />
            <p className="font-display mt-3 text-[14px] font-semibold text-text">Email</p>
            <p className="font-body break-all text-[14px] text-text-muted">
              ganeshkumar90067@gmail.com
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Courses() {
  return (
    <>
      <CoursesHero />
      <TrainingPrograms />
      <PerformanceEvaluation />
      <TrainingSchedule />
      <WhyChoose />
      <HostelFacility />
      <FeesAdmission />
      <FAQ />
      <ContactInfo />
    </>
  );
}
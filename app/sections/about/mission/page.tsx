"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Target,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import { fadeUp, PILL_COLORS, SectionGlow, Eyebrow } from "../_shared";

const MISSION = [
  "Provide professional physical training.",
  "Build strength, stamina, and endurance.",
  "Prepare students for government recruitment physical tests.",
  "Encourage discipline, dedication, and consistency.",
  "Support every student in reaching their career goals.",
];

const TRAINING_FOCUS = [
  "Running Practice",
  "Endurance Training",
  "Speed Development",
  "Strength & Conditioning",
  "Physical Test Preparation",
  "Daily Performance Monitoring",
  "Motivation & Discipline",
];

const FACILITIES = [
  "Running Track Practice",
  "Daily Physical Training",
  "Strength Exercises",
  "Group Practice Sessions",
  "Performance Assessment",
  "Guest Physical Test Sessions",
  "Hostel Facility (Subject to Availability)",
];

const ACHIEVERS = [
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
  { name: "Student Name", post: "Selected Post", exam: "Exam Name", year: "20XX" },
];

function MissionHero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-24">
      <SectionGlow variant={2} />
      <Container>
        <Link
          href="/about"
          className="font-body inline-flex items-center gap-1.5 text-[14px] font-medium text-text-muted transition-colors hover:text-signal"
        >
          <ArrowLeft size={16} />
          Back to About
        </Link>

        <motion.div {...fadeUp} className="mt-6">
          <Eyebrow>Our Mission</Eyebrow>
          <h1 className="font-display mt-4 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[46px]">
            Structured Training,{" "}
            <span className="text-gradient-brand">Built for Results</span>
          </h1>
          <p className="font-body mt-5 max-w-[56ch] text-[16px] leading-relaxed text-text-muted">
            Every session at Lakhisarai Physical Academy is designed around
            one goal — getting you selection-ready through disciplined,
            exam-focused physical training.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function MissionList() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <motion.div {...fadeUp} className="card-flat max-w-[62ch] p-7">
          <div className="flex items-center gap-2 text-accent-strong">
            <Target size={20} />
            <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em]">
              What We Commit To
            </span>
          </div>
          <ul className="mt-5 space-y-3">
            {MISSION.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-strong" />
                <span className="font-body text-[15px] text-text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}

function TrainingPhilosophy() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <SectionGlow variant={1} />
      <Container>
        <Eyebrow>How We Train</Eyebrow>
        <motion.h2
          {...fadeUp}
          className="font-display mt-4 max-w-[30ch] text-[28px] font-bold sm:text-[34px]"
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
              <span className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} font-mono text-[12px]`}>
                Lane {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body text-[15px] font-medium text-text">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Facilities() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <Eyebrow>Academy Facilities</Eyebrow>
        <motion.h2
          {...fadeUp}
          className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[34px]"
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

function StudentSuccess() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <SectionGlow variant={3} />
      <Container>
        <Eyebrow>Proud Achievements</Eyebrow>
        <motion.h2 {...fadeUp} className="font-display mt-4 text-[28px] font-bold sm:text-[34px]">
          Student Success
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {ACHIEVERS.map((a, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-6"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line-strong bg-bg-raised-2 font-mono text-[13px] text-text-muted">
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
    <section className="py-14 sm:py-20">
      <Container>
        <Eyebrow>Founder &amp; Director</Eyebrow>
        <motion.h2 {...fadeUp} className="font-display mt-4 text-[28px] font-bold sm:text-[34px]">
          Contact Ganesh Sir
        </motion.h2>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map(({ icon: Icon, label, lines, breakAll }) => (
            <div key={label} className="card-flat p-5">
              <Icon size={18} className="text-signal" />
              <p className="font-display mt-3 text-[14px] font-semibold text-text">{label}</p>
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

        <motion.div {...fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/about#admission" variant="primary" icon={ClipboardList}>
            Apply for Admission
          </Button>
          <Button href="https://wa.me/918863081082" variant="accent" icon={MessageCircle}>
            WhatsApp Now
          </Button>
          <Button href="tel:8863081082" variant="ghost" icon={Phone}>
            Call Now
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

export default function MissionPage() {
  return (
    <>
      <MissionHero />
      <MissionList />
      <TrainingPhilosophy />
      <Facilities />
      <StudentSuccess />
      <ContactSection />
    </>
  );
}
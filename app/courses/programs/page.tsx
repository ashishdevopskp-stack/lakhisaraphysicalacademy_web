import {
  ArrowRight, Shield, ShieldCheck, ShieldAlert, Star, Flame, Dumbbell,
  ClipboardCheck, TrainFront, Timer, BarChart3,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { SectionGlow, CoursesSubNav, PILL_COLORS } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_CoursesMotion";

export const metadata = {
  title: "Training Programs | Lakhisarai Physical Academy",
  description:
    "Army, Bihar Police, Daroga, SSC GD, CISF, CRPF, BSF, Railway, and Fireman physical training programs, each built around that exam's standards.",
};

const PROGRAMS = [
  { icon: Shield, title: "Army Physical Training", overview: "Complete physical preparation for candidates appearing in Indian Army recruitment.", includes: ["Running Practice", "Push-ups & Strength Training", "Endurance Development", "Physical Efficiency Test (PET)", "Speed Improvement", "Stamina Building", "Performance Monitoring"], suitableFor: "Army Aspirants" },
  { icon: ShieldAlert, title: "Bihar Police Constable Physical Training", includes: ["Long Distance Running", "Sprint Practice", "Height & Physical Standards Guidance", "PET Preparation", "Daily Fitness Assessment", "Mock Physical Test"], suitableFor: "Bihar Police Constable Aspirants" },
  { icon: Star, title: "Bihar Daroga (SI) Physical Training", includes: ["Running Practice", "Endurance & Stamina Training", "Physical Test Preparation", "Mock PET", "Fitness Evaluation", "Performance Improvement"], suitableFor: "Sub-Inspector (Daroga) Aspirants" },
  { icon: ShieldCheck, title: "SSC GD Physical Training", includes: ["Running Sessions", "Endurance Training", "Speed Development", "Physical Test Practice", "Agility Exercises", "Mock PET"], suitableFor: "SSC GD Candidates" },
  { icon: Shield, title: "CISF Physical Training", includes: ["Running", "Physical Fitness", "Strength Building", "PET Preparation", "Endurance Exercises"], suitableFor: "CISF Aspirants" },
  { icon: ShieldCheck, title: "CRPF Physical Training", includes: ["Running Practice", "Physical Endurance", "Strength Exercises", "Mock Physical Tests", "Performance Tracking"], suitableFor: "CRPF Aspirants" },
  { icon: ShieldAlert, title: "BSF Physical Training", includes: ["Running", "Endurance", "Stamina", "Speed Development", "PET Practice"], suitableFor: "BSF Aspirants" },
  { icon: Flame, title: "Fireman Physical Training", includes: ["Running", "Rope Climbing Practice", "Endurance Building", "Physical Fitness", "Mock Physical Test"], suitableFor: "Fireman Recruitment Candidates" },
  { icon: TrainFront, title: "Railway Physical Training", includes: ["Running", "Endurance", "Strength Exercises", "Physical Test Guidance"], suitableFor: "Railway Recruitment Aspirants" },
  { icon: Timer, title: "Running & Endurance Special Batch", includes: ["Long Distance Running", "Sprint Sessions", "Speed Improvement", "Breathing Techniques", "Recovery Guidance", "Stamina Development"], suitableFor: "All Students" },
  { icon: Dumbbell, title: "Physical Fitness Program", includes: ["Full Body Workout", "Strength Training", "Core Exercises", "Functional Fitness", "Flexibility", "Weight Management"], suitableFor: "Anyone interested in improving physical fitness" },
  { icon: ClipboardCheck, title: "Guest Physical Test Program", includes: ["Trial Physical Test", "Running Assessment", "Performance Report", "Expert Feedback", "Improvement Suggestions"], suitableFor: "Students from any district", ctaLabel: "Register Now" },
];

const EVALUATION_CRITERIA = [
  "Running Speed", "Stamina", "Endurance", "Strength",
  "Physical Fitness", "PET Readiness", "Overall Progress",
];

export default function Programs() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <CoursesSubNav current="/courses/programs" />
          </div>

          <FadeInUp className="max-w-[62ch]">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              Training Programs
            </p>
            <h1 className="font-display mt-5 max-w-[22ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
              A Program for <span className="text-gradient-brand">Every Recruitment Goal</span>
            </h1>
            <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              From Army and Bihar Police to SSC GD, CISF, CRPF, BSF, Railway,
              and Fireman recruitment — each program is built around the
              physical standards of that exam.
            </p>
          </FadeInUp>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <ScrollFadeUp>
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              Our Training Programs
            </p>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.05}>
            <h2 className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]">
              All programs at a glance
            </h2>
          </ScrollFadeUp>

          <StaggerList className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <StaggerItem key={p.title} hover className="card-flat flex flex-col p-6">
                <p.icon size={22} className="text-signal" />
                <h3 className="font-display mt-4 text-[16px] font-semibold text-text">{p.title}</h3>
                {p.overview && (
                  <p className="font-body mt-2 text-[13px] text-text-muted">{p.overview}</p>
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
                  <Button href="/courses/fees-admission#admission" variant="ghost" icon={ArrowRight}>
                    {p.ctaLabel ?? "Join Now"}
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-24">
        <SectionGlow variant={2} />
        <Container>
          <ScrollFadeUp>
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              Performance Evaluation
            </p>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.05}>
            <h2 className="font-display mt-4 max-w-[36ch] text-[28px] font-bold sm:text-[36px]">
              Every student is regularly assessed on
            </h2>
          </ScrollFadeUp>

          <StaggerList className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {EVALUATION_CRITERIA.map((item, i) => (
              <StaggerItem
                key={item}
                className={`pill ${PILL_COLORS[i % PILL_COLORS.length]} flex items-center justify-center gap-2 py-3.5 text-center`}
              >
                <BarChart3 size={16} className="shrink-0" />
                <span className="font-body text-[14px] font-medium">{item}</span>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>
    </>
  );
}
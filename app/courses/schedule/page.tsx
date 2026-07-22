import { Sunrise, Sunset, CheckCircle2 } from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, CoursesSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_CoursesMotion";

export const metadata = {
  title: "Schedule | Lakhisarai Physical Academy",
  description: "Morning and evening training batches built around consistent daily practice.",
};

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

export default function Schedule() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <CoursesSubNav current="/courses/schedule" />
          </div>

          <FadeInUp className="max-w-[62ch]">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              Schedule
            </p>
            <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
              Training Batches <span className="text-gradient-brand">That Fit Your Day</span>
            </h1>
            <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              Morning and evening batches, built around consistent daily
              practice — because exam-day performance comes from routine, not
              one big push.
            </p>
          </FadeInUp>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <ScrollFadeUp>
            <h2 className="font-display text-[28px] font-bold sm:text-[36px]">Training Schedule</h2>
          </ScrollFadeUp>

          <StaggerList className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <StaggerItem className="card-flat p-7">
              <Sunrise size={22} className="text-signal" />
              <p className="font-display mt-4 text-[16px] font-semibold text-text">Morning Batch</p>
              <p className="font-mono mt-1 text-[15px] text-text-muted">05:00 AM &ndash; 08:00 AM</p>
            </StaggerItem>
            <StaggerItem className="card-flat p-7">
              <Sunset size={22} className="text-accent-strong" />
              <p className="font-display mt-4 text-[16px] font-semibold text-text">Evening Batch</p>
              <p className="font-mono mt-1 text-[15px] text-text-muted">04:00 PM &ndash; 07:00 PM</p>
            </StaggerItem>
          </StaggerList>

          <ScrollFadeUp delay={0.15}>
            <p className="font-body mt-6 text-[13px] italic text-text-muted">
              Batch timings may change according to season or special training sessions.
            </p>
          </ScrollFadeUp>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-24">
        <SectionGlow variant={2} />
        <Container>
          <ScrollFadeUp>
            <h2 className="font-display max-w-[24ch] text-[28px] font-bold sm:text-[36px]">
              Why Choose Our Training?
            </h2>
          </ScrollFadeUp>

          <StaggerList className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((label) => (
              <StaggerItem key={label} variant="scale" hover className="card-flat p-6">
                <CheckCircle2 size={20} className="text-accent-strong" />
                <p className="font-body mt-4 text-[14px] font-semibold text-text">{label}</p>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>
    </>
  );
}
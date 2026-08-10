import { Sunrise, Sunset, CheckCircle2 } from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, CoursesSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_CoursesMotion";
import BatchTimetable from "@/app/components/BatchTimetable";
import { getBatches } from "@/app/lib/action/batches";

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

export default async function Schedule() {
  const batches = await getBatches();

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

      {/* Live Batches Component */}
      <BatchTimetable liveBatches={batches} />

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
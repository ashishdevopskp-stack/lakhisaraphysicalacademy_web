import { CheckCircle2 } from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, AboutSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_AboutMotion";

export const metadata = {
  title: "Facilities | Lakhisarai Physical Academy",
  description:
    "From the running track to performance assessments, here's what's available to every student enrolled at the academy.",
};

const FACILITIES = [
  "Running Track Practice",
  "Daily Physical Training",
  "Strength Exercises",
  "Group Practice Sessions",
  "Performance Assessment",
  "Guest Physical Test Sessions",
  "Hostel Facility (Subject to Availability)",
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <AboutSubNav current="/about/facilities" />
          </div>

          <FadeInUp className="max-w-[62ch]">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              Facilities
            </p>

            <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
              What Students{" "}
              <span className="text-gradient-brand">Get Access To</span>
            </h1>

            <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              From the running track to performance assessments, here&rsquo;s
              what&rsquo;s available to every student enrolled at the academy.
            </p>
          </FadeInUp>
        </Container>
      </section>

      {/* Facility list */}
      <section className="py-16 sm:py-24">
        <Container>
          <ScrollFadeUp>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              On Campus
            </p>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.05}>
            <h2 className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]">
              Academy Facilities
            </h2>
          </ScrollFadeUp>

          <StaggerList className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FACILITIES.map((item) => (
              <StaggerItem key={item} hover className="card-flat flex items-center gap-3 px-5 py-4">
                <CheckCircle2 size={18} className="shrink-0 text-accent-strong" />
                <span className="font-body text-[15px] text-text">{item}</span>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>
    </>
  );
}
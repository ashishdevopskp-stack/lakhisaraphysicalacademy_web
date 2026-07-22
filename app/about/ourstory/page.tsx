import { Compass, Target, CheckCircle2 } from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, AboutSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp } from "../_AboutMotion";

export const metadata = {
  title: "Our Story | Lakhisarai Physical Academy",
  description:
    "Ganesh Sir established Lakhisarai Physical Academy with the vision of providing quality physical training to students who aspire to serve the nation.",
};

const MISSION = [
  "Provide professional physical training.",
  "Build strength, stamina, and endurance.",
  "Prepare students for government recruitment physical tests.",
  "Encourage discipline, dedication, and consistency.",
  "Support every student in reaching their career goals.",
];

export default function OurStory() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <AboutSubNav current="/about/ourstory" />
          </div>

          <FadeInUp className="max-w-[62ch]">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              Our Story
            </p>

            <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
              The Story Behind{" "}
              <span className="text-gradient-brand">Lakhisarai Physical Academy</span>
            </h1>

            <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              Ganesh Sir established Lakhisarai Physical Academy with the
              vision of providing quality physical training to students who
              aspire to serve the nation. Through structured workouts,
              discipline, and personalized guidance, he has created a
              motivating environment where students can prepare confidently
              for competitive physical tests.
            </p>
          </FadeInUp>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <SectionGlow variant={2} />
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <ScrollFadeUp className="card-flat p-7">
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
            </ScrollFadeUp>

            <ScrollFadeUp delay={0.1} className="card-flat p-7">
              <div className="flex items-center gap-2 text-accent-strong">
                <Target size={20} />
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em]">
                  Our Mission
                </p>
              </div>
              <ul className="mt-4 space-y-3">
                {MISSION.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-strong" />
                    <span className="font-body text-[15px] text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollFadeUp>
          </div>
        </Container>
      </section>
    </>
  );
}
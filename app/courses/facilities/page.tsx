import { Bed, ArrowRight } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { SectionGlow, CoursesSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp } from "../_CoursesMotion";
import { PHONE_NUMBER, telHref } from "../../lib/constants";

export const metadata = {
  title: "Facilities | Lakhisarai Physical Academy",
  description: "Support beyond the training ground, including hostel facilities for outstation students.",
};

export default function Facilities() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <CoursesSubNav current="/courses/facilities" />
          </div>

          <FadeInUp className="max-w-[62ch]">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              Facilities
            </p>
            <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
              Support Beyond <span className="text-gradient-brand">the Training Ground</span>
            </h1>
            <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              For students coming from outside Lakhisarai, we help with more
              than just training.
            </p>
          </FadeInUp>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <ScrollFadeUp className="card-flat flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <Bed size={24} className="mt-1 shrink-0 text-signal" />
              <div>
                <h2 className="font-display text-[20px] font-semibold text-text">Hostel Facility</h2>
                <p className="font-body mt-2 max-w-[54ch] text-[14px] text-text-muted">
                  Hostel facilities are available for students coming from
                  nearby districts, subject to availability.
                </p>
              </div>
            </div>
            <Button href={telHref(PHONE_NUMBER)} variant="secondary" icon={ArrowRight}>
              Know More
            </Button>
          </ScrollFadeUp>
        </Container>
      </section>
    </>
  );
}
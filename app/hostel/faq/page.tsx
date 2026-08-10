// app/hostel/faq/page.tsx

import Container from "../../components/Container";
import { SectionGlow, HostelSubNav } from "../_shared";
import { ScrollFadeUp } from "../_HostelMotion";
import FaqAccordion from "./_FaqAccordion";

export const metadata = {
  title: "Hostel FAQ | Lakhisarai Physical Academy",
  description:
    "Answers to common questions about hostel accommodation at Lakhisarai Physical Academy — food, safety, visiting hours and facilities.",
};

const FAQS = [
  {
    q: "Is hostel available for boys/girls?",
    a: "We offer separate hostel accommodation for boys and girls, each with independent supervision and facilities.",
  },
  {
    q: "Is food included?",
    a: "Yes, mess facility with healthy and hygienic food is available. Food charges are billed separately from the room fee.",
  },
  {
    q: "How far is the hostel from the academy?",
    a: "The hostel is within walking distance of the training ground, so students can reach sessions on time without commuting.",
  },
  {
    q: "Are visitors allowed?",
    a: "Visitors are allowed during designated hours only, in line with hostel discipline and safety rules.",
  },
  {
    q: "What facilities are available?",
    a: "Furnished rooms, mess facility, clean bathrooms, RO drinking water, power backup, self-study area, and regular cleaning.",
  },
];

function FaqHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-16 sm:pt-24">
      <SectionGlow />
      <Container>
        <div className="mb-4">
          <HostelSubNav current="/hostel/faq" />
        </div>
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
          Hostel
        </p>
        <h1 className="font-display mt-2 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px] text-slate-900">
          Frequently Asked <span className="text-[#ea580c]">Questions</span>
        </h1>
      </Container>
    </section>
  );
}


function FaqList() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <ScrollFadeUp className="card-flat max-w-[70ch] divide-y divide-line overflow-hidden px-6">
          <FaqAccordion items={FAQS} />
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

export default function HostelFaqPage() {
  return (
    <>
      <FaqHero />
      <FaqList />
    </>
  );
}
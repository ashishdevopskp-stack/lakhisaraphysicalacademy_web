import Container from "../../components/Container";
import { SectionGlow, CoursesSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp } from "../_CoursesMotion";
import { FAQItem } from "./_FAQItem";

export const metadata = {
  title: "FAQ | Lakhisarai Physical Academy",
  description: "Answers to what most students ask before joining.",
};

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

export default function Faq() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <CoursesSubNav current="/courses/faq" />
          </div>

          <FadeInUp className="max-w-[62ch]">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              FAQ
            </p>
            <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
              Frequently Asked <span className="text-gradient-brand">Questions</span>
            </h1>
            <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              Answers to what most students ask before joining.
            </p>
          </FadeInUp>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <ScrollFadeUp className="card-flat divide-y divide-line overflow-hidden px-6">
            {FAQS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </ScrollFadeUp>
        </Container>
      </section>
    </>
  );
}
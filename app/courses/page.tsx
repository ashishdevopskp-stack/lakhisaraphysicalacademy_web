import Image from "next/image";
import { ClipboardList, Phone, MessageCircle } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { CoursesSubNav } from "./_shared";
import { PHONE_NUMBER, whatsappHref, telHref } from "../lib/constants";

export const metadata = {
  title: "Courses & Training Programs | Lakhisarai Physical Academy",
  description:
    "Structured physical training programs for Army, Bihar Police, Daroga, SSC GD, CISF, CRPF, BSF and other government recruitment physical examinations.",
};

export default function Courses() {
  return (
    <section id="courses" className="pb-16 pt-16 sm:pb-24 sm:pt-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-widest text-signal">
              Courses &amp; Training Programs
            </p>

            <h1 className="mt-4 max-w-[22ch] text-[32px] sm:text-[42px] lg:text-[48px] py-2 leading-snug">
              Professional Physical Training for{" "}
              <span className="text-signal">Defence, Police &amp; Government Recruitment</span>
            </h1>

            <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-text-muted">
              Lakhisarai Physical Academy offers structured physical training
              programs designed to help candidates prepare for various
              government recruitment physical examinations. Our training
              focuses on improving stamina, speed, endurance, strength,
              agility, and overall physical performance.
            </p>

            <div className="mt-8">
              <CoursesSubNav current="/courses" />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#admission" variant="primary" icon={ClipboardList}>
                Apply for Admission
              </Button>
              <Button href={whatsappHref()} variant="secondary" icon={MessageCircle}>
                WhatsApp Enquiry
              </Button>
              <Button href={telHref(PHONE_NUMBER)} variant="secondary" icon={Phone}>
                Call Now
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
                alt="Candidates training together at Lakhisarai Physical Academy"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 80vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-xl bg-navy px-5 py-3.5 text-center shadow-lg">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-signal-strong">
                Structured Programs
              </p>
              <p className="mt-0.5 text-[15px] font-bold text-white">
                Built around each exam&rsquo;s standards
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
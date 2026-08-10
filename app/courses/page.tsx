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
    <section id="courses" className="pb-16 pt-16 sm:pb-24 sm:pt-24 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-[13px] font-black uppercase tracking-widest text-[#ea580c]">
              Courses &amp; Training Programs
            </p>

            <h1 className="mt-4 max-w-[22ch] text-[32px] sm:text-[42px] lg:text-[48px] py-2 leading-snug font-black text-slate-900">
              Professional Physical Training for{" "}
              <span className="text-[#ea580c]">Defence, Police &amp; Government Recruitment</span>
            </h1>

            <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-slate-600 font-medium">
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
              <Button href={telHref()} variant="primary" icon={ClipboardList}>
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

          {/* Official Academy Poster Banner */}
          <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
            <div className="group relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-orange-500/15">
              <Image
                src="/academy_poster.jpg"
                alt="Lakhisarai Physical Academy Official Admission Poster"
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-5 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl bg-slate-950/95 border border-amber-500/40 px-5 py-3.5 text-center shadow-2xl backdrop-blur-xl z-10">
              <p className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                Official Admission Poster
              </p>
              <p className="mt-0.5 text-[14px] font-extrabold text-white">
                Ganesh Sir &amp; Mahesh Sir — 700+ Selections
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
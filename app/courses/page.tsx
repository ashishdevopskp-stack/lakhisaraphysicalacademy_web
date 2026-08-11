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

import { Dumbbell, Calendar, Building2, HelpCircle } from "lucide-react";

function CoursesSubcategoryGrid() {
  const subcategories = [
    {
      title: "All Training Programs",
      subtitle: "12 recruitment batches (Army, Bihar Police, SSC GD, CISF, BSF)",
      href: "/courses/programs",
      icon: Dumbbell,
      color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-600",
      badge: "Batches",
    },
    {
      title: "Ground Schedule & Timings",
      subtitle: "Daily morning 5:00 AM & evening physical session timing",
      href: "/courses/schedule",
      icon: Calendar,
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-600",
      badge: "Timings",
    },
    {
      title: "Ground Facilities & Gear",
      subtitle: "Stopwatch timing, high jump pit, shot put & medical check",
      href: "/courses/facilities",
      icon: Building2,
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-600",
      badge: "Facilities",
    },
    {
      title: "Fees & Online Admission",
      subtitle: "Physical training fee structure & mobile app admission process",
      href: "/courses/fees-admission",
      icon: ClipboardList,
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-600",
      badge: "Fees",
    },
    {
      title: "PET Exam FAQ",
      subtitle: "Frequently asked questions regarding PET physical standards",
      href: "/courses/faq",
      icon: HelpCircle,
      color: "from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-600",
      badge: "FAQ",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
      <Container>
        <div className="mb-8">
          <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-orange-100 text-[#ea580c] border border-orange-200 rounded-full">
            🏋️ Courses &amp; Training Subcategories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Explore Training Sections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subcategories.map((sub) => {
            const Icon = sub.icon;
            return (
              <a
                key={sub.href}
                href={sub.href}
                className="group rounded-3xl bg-slate-50 border-2 border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-amber-400 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${sub.color} border shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon size={20} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-orange-50 text-[#ea580c] border border-orange-200">
                      {sub.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#ea580c] transition-colors leading-tight">
                    {sub.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-1.5 leading-relaxed">
                    {sub.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-black text-[#ea580c]">
                  <span>Explore Course</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default function Courses() {
  return (
    <>
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
                <Button href="https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy" variant="primary" icon={ClipboardList}>
                  Apply for Admission (App)
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

      <CoursesSubcategoryGrid />
    </>
  );
}
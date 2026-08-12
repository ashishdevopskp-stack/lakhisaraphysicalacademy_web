import { CheckCircle2, Dumbbell, Trophy, Home, HeartPulse, Clock, Sparkles, Building2 } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { SectionGlow, AboutSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_AboutMotion";
import { whatsappHref } from "@/app/lib/constants";

export const metadata = {
  title: "Facilities | Lakhisarai Physical Academy",
  description:
    "From running tracks to high jump pits and hostel mess, explore top physical training facilities at Lakhisarai Physical Academy.",
};

const DETAILED_FACILITIES = [
  {
    title: "K.R.K Running Track",
    desc: "400m standardized mud running track for daily 1600m & 1000m endurance lap practice.",
    icon: Clock,
    badge: "Track Practice",
    color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-600",
  },
  {
    title: "High Jump Pit & Tiger Mattress",
    desc: "Dedicated high jump pit supporting both Scissor & Tiger jump styles with safety cushioning.",
    icon: Dumbbell,
    badge: "High Jump",
    color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-600",
  },
  {
    title: "Shot Put Throw Arena",
    desc: "16lb (Male) & 12lb (Female) official iron shot put balls with marked measurement sector.",
    icon: Trophy,
    badge: "Shot Put",
    color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-600",
  },
  {
    title: "Digital Stopwatch & OMR Mock Tests",
    desc: "Exact digital timer evaluation during weekly Sunday time trials and written mock exams.",
    icon: Sparkles,
    badge: "Digital Timer",
    color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-600",
  },
  {
    title: "In-Campus Hostel & Mess",
    desc: "Clean rooms, 24/7 security, purified drinking water, and high-protein hygienic meals.",
    icon: Home,
    badge: "Hostel Facility",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-600",
  },
  {
    title: "Initial Medical Screening",
    desc: "Height & chest measurement, knock knee, flat foot, and eyesight initial checkups.",
    icon: HeartPulse,
    badge: "Medical Check",
    color: "from-red-500/20 to-rose-500/10 border-red-500/30 text-red-600",
  },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-20 bg-gradient-to-b from-orange-50/70 via-[#faf7f0] to-white border-b border-orange-200/60">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <AboutSubNav current="/about/facilities" />
          </div>

          <FadeInUp className="max-w-[70ch]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-300 text-xs font-black text-orange-800 shadow-2xs mb-4">
              <Building2 size={14} className="text-orange-600" />
              <span>GROUND &amp; ACADEMY INFRASTRUCTURE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              What Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600">Get Access To</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
              From standard running tracks and high jump pits to full-fledged hostel &amp; mess facilities, explore everything available at Lakhisarai Physical Academy.
            </p>
          </FadeInUp>
        </Container>
      </section>

      {/* Facility list */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <Container>
          <ScrollFadeUp className="mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200">
              Ground &amp; Campus Facilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Academy Facilities &amp; Equipment
            </h2>
          </ScrollFadeUp>

          <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DETAILED_FACILITIES.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div className="group flex flex-col justify-between p-6 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-orange-500 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} border shadow-2xs group-hover:scale-110 transition-transform`}>
                          <Icon size={22} />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-800 border border-orange-200">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={15} className="text-emerald-600" />
                        <span>Included in Admission</span>
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerList>

          <div className="mt-12 text-center">
            <Button href={whatsappHref("Hello Lakhisarai Physical Academy, I want details about ground facilities and admission.")} variant="primary">
              Enquire About Facilities on WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
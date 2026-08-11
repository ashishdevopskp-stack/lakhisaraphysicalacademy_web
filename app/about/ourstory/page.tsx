import { Compass, Target, CheckCircle2, ShieldCheck, Flame, Sparkles, Award } from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, AboutSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp } from "../_AboutMotion";

export const metadata = {
  title: "Our Story | Lakhisarai Physical Academy",
  description:
    "Ganesh Sir established Lakhisarai Physical Academy with the vision of providing quality physical training to students who aspire to serve the nation.",
};

const MISSION = [
  "Provide professional & scientific physical training.",
  "Build endurance, speed, stamina & muscular strength.",
  "Prepare students for Bihar Police, Army Agniveer & SSC GD tests.",
  "Instill discipline, dedication, sportsmanship & consistency.",
  "Support every student until final selection & joining.",
];

export default function OurStory() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-20 bg-gradient-to-b from-slate-50 via-[#faf7f0]/80 to-white">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-8">
            <AboutSubNav current="/about/ourstory" />
          </div>

          <FadeInUp className="max-w-[70ch]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-300 text-xs font-black text-orange-800 shadow-xs mb-4">
              <Sparkles size={14} className="text-[#ea580c]" />
              <span>Academy Legacy &amp; Vision</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              The Story Behind <span className="text-[#ea580c]">Lakhisarai Physical Academy</span>
            </h1>

            <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-white border-2 border-orange-200/80 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />
              <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                Ganesh Sir established Lakhisarai Physical Academy with the noble vision of providing world-class physical fitness training to students who aspire to serve the nation in Defence &amp; Police forces.
              </p>
              <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed">
                Through structured morning and evening workouts at K.R.K Field Lakhisarai, strict discipline, and individual attention, he has created a highly motivating environment where aspirants transform into physical powerhouses.
              </p>
            </div>
          </FadeInUp>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-white">
        <SectionGlow variant={2} />
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Vision Card */}
            <ScrollFadeUp className="group rounded-3xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-white border-2 border-orange-300/80 p-7 sm:p-8 shadow-xl hover:shadow-2xl hover:border-orange-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3.5 rounded-2xl bg-[#ea580c] text-white shadow-md group-hover:scale-110 transition-transform">
                  <Compass size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200">
                    Guiding Pillar
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    OUR VISION
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed bg-white/80 p-5 rounded-2xl border border-orange-200/80 shadow-xs">
                To become Bihar&rsquo;s most trusted physical training academy by empowering thousands of youth with physical fitness, unwavering endurance, mental strength, and confidence to succeed in competitive recruitment tests.
              </p>

              <div className="mt-6 pt-4 border-t border-orange-200/60 flex items-center gap-2 text-xs font-black text-orange-800">
                <Award size={16} className="text-amber-500" />
                <span>1,200+ Aspirants Selected in Army &amp; Bihar Police</span>
              </div>
            </ScrollFadeUp>

            {/* Mission Card */}
            <ScrollFadeUp delay={0.1} className="group rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white border-2 border-emerald-300/80 p-7 sm:p-8 shadow-xl hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3.5 rounded-2xl bg-[#138808] text-white shadow-md group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Action Plan
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    OUR MISSION
                  </h2>
                </div>
              </div>

              <div className="space-y-2.5">
                {MISSION.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollFadeUp>
          </div>
        </Container>
      </section>
    </>
  );
}
import Image from "next/image";
import { ClipboardList, Phone, MessageCircle, Trophy, Mail, MapPin } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { SectionGlow, AboutSubNav, PILL_COLORS } from "../_shared";
import { FadeInUp, ScaleIn, ScrollFadeUp, StaggerList, StaggerItem } from "../_AboutMotion";
import { telHref, whatsappHref, PHONE_NUMBER, PHONE_NUMBER_ALT, EMAIL, ADDRESS } from "../../lib/constants";

export const metadata = {
  title: "Founder & Director | Lakhisarai Physical Academy",
  description:
    "Ganesh Sir is the Founder & Director of Lakhisarai Physical Academy, guiding aspiring candidates preparing for Army, Bihar Police, Daroga, SSC GD, and other government recruitment physical examinations.",
};

const ROLES = ["Dedicated Mentor", "Professional Physical Trainer", "Founder & Director"];

export default function FounderAndDirector() {
  const cards = [
    { icon: Phone, label: "Direct Mobile", lines: [PHONE_NUMBER.slice(2), PHONE_NUMBER_ALT.slice(2)], href: telHref(PHONE_NUMBER) },
    { icon: MessageCircle, label: "WhatsApp Helpline", lines: ["Click to Chat on WhatsApp"], href: whatsappHref("Hello Ganesh Sir, I want guidance regarding academy physical admission.") },
    { icon: Mail, label: "Official Email", lines: [EMAIL], breakAll: true, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: "Training Ground", lines: [ADDRESS], href: "https://maps.google.com/?q=KRK+Field+Lakhisarai" },
  ];

  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24 bg-gradient-to-b from-orange-50/70 via-[#faf7f0] to-white border-b border-orange-200/60">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <AboutSubNav current="/about/founderanddirector" />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-300 text-xs font-black text-orange-800 shadow-2xs mb-4">
                <span>🇮🇳 HEAD PHYSICAL COACH &amp; FOUNDER</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600">Coach Ganesh Sir</span>
              </h1>

              <div className="mt-4 flex flex-wrap gap-2" aria-label="Roles">
                {ROLES.map((role, i) => (
                  <span key={role} className="px-3 py-1 rounded-full text-xs font-black bg-white border border-slate-200 text-slate-800 shadow-2xs">
                    {role}
                  </span>
                ))}
              </div>

              <div className="mt-6 p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-md space-y-3">
                <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                  Ganesh Sir is the Founder &amp; Director of Lakhisarai Physical Academy. With an unwavering passion for physical fitness and disciplined training, he has personally guided over 1,200+ candidates in Bihar Police, Army Agniveer, Daroga SI, and SSC GD physical tests.
                </p>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                  <div className="p-2 rounded-xl bg-orange-50 border border-orange-200">
                    <p className="text-lg font-black text-orange-600">8+ Yrs</p>
                    <p className="text-[10px] font-bold text-slate-600">Coaching Exp</p>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                    <p className="text-lg font-black text-amber-600">1,200+</p>
                    <p className="text-[10px] font-bold text-slate-600">Selections</p>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <p className="text-lg font-black text-emerald-600">1600m</p>
                    <p className="text-[10px] font-bold text-slate-600">Lap Specialist</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={telHref(PHONE_NUMBER)} variant="primary" icon={Phone}>
                  Call Coach Now
                </Button>
                <Button href="https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy" variant="secondary" icon={ClipboardList}>
                  Apply for Admission (App)
                </Button>
                <Button href={whatsappHref("Hello Ganesh Sir, I want to join academy physical batch.")} variant="whatsapp" icon={MessageCircle}>
                  WhatsApp Chat
                </Button>
              </div>
            </FadeInUp>

            <ScaleIn delay={0.15} className="relative mx-auto aspect-[4/5] w-full max-w-[340px] lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-3xl opacity-70 blur-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(234,88,12,0.35), rgba(19,136,8,0.25), rgba(212,175,55,0.3))",
                }}
              />
              <div className="relative overflow-hidden rounded-3xl border-4 border-amber-400/80 bg-slate-950 shadow-2xl h-full">
                <Image
                  src="/ganeshsir.png"
                  alt="Ganesh Sir - Founder & Head Coach"
                  fill
                  sizes="(min-width: 1024px) 380px, 80vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-amber-400/40 text-white">
                  <p className="text-xs font-black uppercase text-amber-300">Ganesh Sir</p>
                  <p className="text-[11px] font-semibold text-slate-300">Founder &amp; Head Physical Director</p>
                </div>
              </div>
            </ScaleIn>
          </div>
        </Container>
      </section>

      {/* In His Own Words */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <ScrollFadeUp className="max-w-[75ch] mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-orange-50/60 via-[#faf7f0] to-amber-50/40 border-2 border-orange-200 shadow-xl relative overflow-hidden">
              <span className="text-6xl text-orange-300 font-serif absolute top-4 left-6 pointer-events-none opacity-50">“</span>

              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider">
                  <Trophy size={14} className="text-orange-600" />
                  <span>Director's Vision &amp; Philosophy</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Meet Our Founder &amp; Director
                </h2>

                <p className="text-slate-800 text-base leading-relaxed font-semibold">
                  Ganesh Sir established Lakhisarai Physical Academy with the vision of providing quality physical training to students who aspire to serve the nation. Through structured workouts, discipline, and personalized guidance, he has created a motivating environment where students can prepare confidently for competitive physical tests.
                </p>

                <div className="pt-4 border-t border-orange-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-extrabold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">✓</span> 1600m Lap Pacing &amp; Breathing Control
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">✓</span> Tiger Jump &amp; Scissor High Jump Technique
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">✓</span> Shot Put Distance Throw Drills
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">✓</span> Weekly Digital Stop-watch Evaluation
                  </div>
                </div>
              </div>
            </div>
          </ScrollFadeUp>
        </Container>
      </section>

      {/* Contact Cards */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <SectionGlow variant={3} />
        <Container>
          <ScrollFadeUp className="text-center mb-10">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200">
              Get in Touch
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">
              Contact Ganesh Sir Directly
            </h2>
          </ScrollFadeUp>

          <StaggerList className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, label, lines, breakAll, href }) => (
              <StaggerItem key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex flex-col justify-between p-6 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-orange-500 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div>
                    <div className="p-3 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 w-fit group-hover:scale-110 transition-transform mb-4">
                      <Icon size={22} />
                    </div>
                    <p className="text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors">{label}</p>
                    {lines.map((line) => (
                      <p key={line} className={`text-xs font-bold text-slate-600 mt-1 ${breakAll ? "break-all" : ""}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-orange-600 group-hover:underline">
                    <span>Connect Now</span> →
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>
    </>
  );
}
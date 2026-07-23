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
    { icon: Phone, label: "Mobile", lines: [PHONE_NUMBER.slice(2), PHONE_NUMBER_ALT.slice(2)] },
    { icon: MessageCircle, label: "WhatsApp", lines: [PHONE_NUMBER.slice(2), PHONE_NUMBER_ALT.slice(2)] },
    { icon: Mail, label: "Email", lines: [EMAIL], breakAll: true },
    { icon: MapPin, label: "Academy Address", lines: [ADDRESS] },
  ];

  return (
    <>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <AboutSubNav current="/about/founderanddirector" />
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeInUp>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
                Founder &amp; Director
              </p>

              <h1 className="font-display mt-5 max-w-[16ch] text-[34px] font-bold leading-[1.14] sm:text-[44px] lg:text-[52px]">
                About <span className="text-gradient-brand">Trainer Ganesh</span>
              </h1>

              <div className="mt-6 flex flex-wrap gap-2" aria-label="Roles">
                {ROLES.map((role, i) => (
                  <span key={role} className={`pill ${PILL_COLORS[i % PILL_COLORS.length]}`}>
                    {role}
                  </span>
                ))}
              </div>

              <p className="font-body mt-6 max-w-[52ch] text-[15.5px] leading-relaxed text-text-muted">
                Ganesh Sir is the Founder &amp; Director of Lakhisarai Physical
                Academy. With a passion for physical fitness and disciplined
                training, he has been guiding aspiring candidates preparing for
                Army, Bihar Police, Daroga, SSC GD, and other government
                recruitment physical examinations. His goal is to help every
                student improve their physical performance, confidence, and
                overall readiness for selection.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={telHref(PHONE_NUMBER)} variant="primary" icon={Phone}>
                  Contact Now
                </Button>
                <Button href="#admission" variant="secondary" icon={ClipboardList}>
                  Apply for Admission
                </Button>
                <Button href={whatsappHref()} variant="whatsapp" icon={MessageCircle}>
                  WhatsApp
                </Button>
              </div>
            </FadeInUp>

<ScaleIn delay={0.15} className="relative order-first mx-auto aspect-[4/5] w-full max-w-[320px] lg:order-last">
  <div
    aria-hidden
    className="absolute -inset-5 -z-10 rounded-[28px] opacity-70 blur-2xl"
    style={{
      backgroundImage:
        "linear-gradient(135deg, rgba(59,130,246,0.34), rgba(20,184,166,0.26), rgba(245,166,35,0.24))",
    }}
  />
  <div className="glass glass-sheen absolute inset-4 overflow-hidden rounded-[16px] shadow-[var(--shadow-card)]">
    <Image
      src="/ganeshsir.png"
      alt="Ganesh Sir"
      fill
      sizes="(min-width: 1024px) 320px, 80vw"
      className="object-cover"
      priority
    />
  </div>
  <div className="absolute -bottom-3 -right-3 flex h-14 w-14 items-center justify-center rounded-full border border-signal-strong bg-signal text-on-signal shadow-[0_4px_14px_rgba(37,99,235,0.4)]">
    <Trophy size={22} />
  </div>
</ScaleIn>
          </div>
        </Container>
      </section>

      {/* In His Own Words */}
      <section className="py-16 sm:py-24">
        <Container>
          <ScrollFadeUp className="max-w-[62ch]">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              In His Own Words
            </p>
            <h2 className="font-display mt-4 text-[28px] font-bold sm:text-[36px]">
              Meet Our Founder &amp; Director
            </h2>
            <p className="font-body mt-5 text-[15.5px] leading-relaxed text-text-muted">
              Ganesh Sir established Lakhisarai Physical Academy with the
              vision of providing quality physical training to students who
              aspire to serve the nation. Through structured workouts,
              discipline, and personalized guidance, he has created a
              motivating environment where students can prepare confidently
              for competitive physical tests.
            </p>
          </ScrollFadeUp>
        </Container>
      </section>

      {/* Contact */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <SectionGlow variant={3} />
        <Container>
          <ScrollFadeUp>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
              Founder &amp; Director
            </p>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.05}>
            <h2 className="font-display mt-4 text-[28px] font-bold sm:text-[36px]">
              Contact Ganesh Sir
            </h2>
          </ScrollFadeUp>

          <StaggerList className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, label, lines, breakAll }) => (
              <StaggerItem key={label} hover className="card-flat p-5">
                <Icon size={18} className="text-signal-strong" />
                <p className="font-display mt-3 text-[14px] font-semibold text-text">{label}</p>
                {lines.map((line) => (
                  <p key={line} className={`font-body text-[14px] text-text-muted ${breakAll ? "break-all" : ""}`}>
                    {line}
                  </p>
                ))}
              </StaggerItem>
            ))}
          </StaggerList>
        </Container>
      </section>
    </>
  );
}
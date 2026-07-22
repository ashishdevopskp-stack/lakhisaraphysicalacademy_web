import { ClipboardList, Phone, MessageCircle, Wallet, Mail } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { SectionGlow, CoursesSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_CoursesMotion";
import { PHONE_NUMBER, PHONE_NUMBER_ALT, EMAIL, whatsappHref, telHref } from "../../lib/constants";

export const metadata = {
  title: "Fees & Admission | Lakhisarai Physical Academy",
  description: "Apply online or visit the academy for admission and batch selection.",
};

export default function FeesAdmissionPage() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <SectionGlow variant={1} />
        <Container>
          <div className="mb-10">
            <CoursesSubNav current="/courses/fees-admission" />
          </div>

          <FadeInUp className="max-w-[62ch]">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              Fees &amp; Admission
            </p>
            <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
              Ready to <span className="text-gradient-brand">Start Training?</span>
            </h1>
            <p className="font-body mt-6 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
              Interested candidates can apply online or visit the academy for
              admission and batch selection.
            </p>
          </FadeInUp>
        </Container>
      </section>

      <section id="admission" className="py-16 sm:py-24">
        <Container>
          <ScrollFadeUp
            className="relative overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-14"
          >
            <div
              className="absolute inset-0 -z-10"
              style={{ backgroundColor: "var(--color-navy)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 800px 400px at 15% 0%, rgba(37,99,235,0.35), transparent 60%), radial-gradient(ellipse 700px 400px at 90% 100%, rgba(34,197,94,0.28), transparent 55%)",
              }}
            />
            <div className="relative">
              <Wallet size={26} className="mx-auto text-white" />
              <h2 className="font-display mx-auto mt-4 max-w-[26ch] text-[28px] font-bold text-white sm:text-[38px]">
                Fees &amp; Admission
              </h2>
              <p className="font-body mx-auto mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-text-on-dark-muted">
                Interested candidates can apply online or visit the academy for
                admission and batch selection.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href={telHref(PHONE_NUMBER)} variant="primary" icon={ClipboardList}>
                  Apply Online
                </Button>
                <Button href={whatsappHref()} variant="primary" icon={MessageCircle}>
                  WhatsApp Enquiry
                </Button>
                <Button href={telHref(PHONE_NUMBER)} variant="secondary" icon={Phone}>
                  Call Now
                </Button>
              </div>
            </div>
          </ScrollFadeUp>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-24">
        <SectionGlow variant={2} />
        <Container>
          <ScrollFadeUp>
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
              Founder &amp; Director
            </p>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.05}>
            <h2 className="font-display mt-4 text-[28px] font-bold sm:text-[36px]">
              Contact Ganesh Sir
            </h2>
          </ScrollFadeUp>

          <StaggerList className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerItem className="card-flat p-5">
              <Phone size={18} className="text-signal" />
              <p className="font-display mt-3 text-[14px] font-semibold text-text">Mobile</p>
              <p className="font-body text-[14px] text-text-muted">{PHONE_NUMBER.slice(2)}</p>
              <p className="font-body text-[14px] text-text-muted">{PHONE_NUMBER_ALT.slice(2)}</p>
            </StaggerItem>
            <StaggerItem className="card-flat p-5">
              <MessageCircle size={18} className="text-signal" />
              <p className="font-display mt-3 text-[14px] font-semibold text-text">WhatsApp</p>
              <p className="font-body text-[14px] text-text-muted">{PHONE_NUMBER.slice(2)}</p>
              <p className="font-body text-[14px] text-text-muted">{PHONE_NUMBER_ALT.slice(2)}</p>
            </StaggerItem>
            <StaggerItem className="card-flat p-5">
              <Mail size={18} className="text-signal" />
              <p className="font-display mt-3 text-[14px] font-semibold text-text">Email</p>
              <p className="font-body break-all text-[14px] text-text-muted">{EMAIL}</p>
            </StaggerItem>
          </StaggerList>
        </Container>
      </section>
    </>
  );
}
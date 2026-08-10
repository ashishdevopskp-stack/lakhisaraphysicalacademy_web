import type { Metadata } from "next";
import {
  Phone,
  MessageCircle,
  ClipboardList,
  User,
  Mail,
  MapPin,
  Clock,
  Navigation,
} from "lucide-react";
import { FaYoutube, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Container from "../components/Container";
import Button from "../components/Button";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "./_ContactMotion";
import QuickEnquiryForm from "./_QuickEnquiryForm";
import FAQ from "./_FAQ";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_ALT,
  EMAIL,
  ADDRESS,
  whatsappHref,
  telHref,
} from "../lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Lakhisarai Physical Academy",
  description:
    "Get in touch with Lakhisarai Physical Academy for admissions, courses, hostel facilities, and fees — call, WhatsApp, email, or visit us.",
};

/* =========================================================
   1. Hero
   ========================================================= */
function ContactHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line pb-16 pt-14 sm:pb-24 sm:pt-20"
    >
      <Container>
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-signal">
            Get in Touch
          </p>

          <h1 className="mt-5 max-w-[20ch] text-[34px] sm:text-[44px] lg:text-[52px]">
            Contact Us
          </h1>

          <p className="mt-5 text-[15px] font-medium text-text">
            We&rsquo;re here to help you start your success journey.
          </p>

          <p className="mt-4 text-[15px] text-text-muted">
            Have questions about admissions, courses, hostel facilities,
            fees, or physical training? Get in touch with Lakhisarai
            Physical Academy through call, WhatsApp, email, or visit our
            academy.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={telHref()} variant="primary" icon={Phone}>
              Call Now
            </Button>
            <Button href={whatsappHref()} variant="secondary" icon={MessageCircle}>
              WhatsApp
            </Button>
            <Button href="#enquiry" variant="ghost" icon={ClipboardList}>
              Enquire Now
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Contact Information
   ========================================================= */
function ContactInformation() {
  const rows = [
    { icon: User, label: "Founder & Director", value: "Ganesh Sir" },
    { icon: Phone, label: "Mobile Numbers", value: `+${PHONE_NUMBER}, +${PHONE_NUMBER_ALT}` },
    { icon: MessageCircle, label: "WhatsApp", value: `+${PHONE_NUMBER}, +${PHONE_NUMBER_ALT}` },
    { icon: Mail, label: "Email", value: EMAIL },
    { icon: MapPin, label: "Address", value: ADDRESS },
  ];

  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-20">
      <Container>
        <ScrollFadeUp>
          <h2 className="text-[26px] sm:text-[32px]">Contact Information</h2>
        </ScrollFadeUp>
        <ScrollFadeUp delay={0.05}>
          <p className="mt-2 text-[14px] text-text-muted">
            Lakhisarai Physical Academy
          </p>
        </ScrollFadeUp>

        <StaggerList className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rows.map(({ icon: Icon, label, value }) => (
            <StaggerItem
              key={label}
              className="flex items-start gap-3 rounded-xl border border-line bg-bg p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-bg-raised">
                <Icon size={16} className="text-signal" />
              </span>
              <div>
                <p className="text-[13px] font-medium text-text">{label}</p>
                <p className="mt-1 text-[13px] text-text-muted">{value}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Quick Enquiry Form
   ========================================================= */
function QuickEnquirySection() {
  return (
    <section id="enquiry" className="border-b border-line py-16 sm:py-24">
      <Container>
        <ScrollFadeUp>
          <h2 className="text-[28px] sm:text-[34px]">Quick Enquiry Form</h2>
        </ScrollFadeUp>
        <ScrollFadeUp delay={0.05}>
          <p className="mt-3 max-w-[60ch] text-[15px] text-text-muted">
            Send us your questions about admissions, courses, hostel, or fees
            and our team will get back to you shortly.
          </p>
        </ScrollFadeUp>
        <ScrollFadeUp delay={0.1}>
          <QuickEnquiryForm />
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Find Us
   ========================================================= */
function FindUs() {
  const mapsQuery = encodeURIComponent(ADDRESS);
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const embedHref = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-24">
      <Container>
        <ScrollFadeUp>
          <h2 className="text-[28px] sm:text-[34px]">Find Us</h2>
        </ScrollFadeUp>

        <ScrollFadeUp delay={0.06} className="mt-8 overflow-hidden rounded-xl border border-line">
          <iframe
            title="Lakhisarai Physical Academy location"
            src={embedHref}
            className="h-[360px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </ScrollFadeUp>

        <ScrollFadeUp delay={0.1} className="mt-6">
          <Button href={directionsHref} variant="secondary" icon={Navigation}>
            Get Directions
          </Button>
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Academy Timings
   ========================================================= */
function AcademyTimings() {
  const rows = [
    { label: "Morning Batch", value: "05:00 AM – 08:00 AM" },
    { label: "Evening Batch", value: "04:00 PM – 07:00 PM" },
    { label: "Open Days", value: "Monday – Sunday" },
  ];

  return (
    <section className="border-b border-line py-16 sm:py-20">
      <Container>
        <ScrollFadeUp>
          <h2 className="text-[26px] sm:text-[32px]">Academy Timings</h2>
        </ScrollFadeUp>

        <StaggerList className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rows.map(({ label, value }) => (
            <StaggerItem
              key={label}
              className="flex items-start gap-3 rounded-xl border border-line bg-bg-raised p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-bg">
                <Clock size={16} className="text-signal" />
              </span>
              <div>
                <p className="text-[14px] font-medium text-text">{label}</p>
                <p className="mt-1 text-[13px] text-text-muted">{value}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   6. Connect With Us
   ========================================================= */
function ConnectWithUs() {
  const links = [
    {
      label: "YouTube",
      icon: FaYoutube,
      href: "https://www.youtube.com/@lakhisaraiphysicalacademy?si=S80l_B7Z0lWTtZSU",
      color: "#FF0000",
      bg: "rgba(255,0,0,0.08)",
    },
    {
      label: "Facebook",
      icon: FaFacebookF,
      href: "https://www.facebook.com/trainer.ganesh.2025?rdid=VKCg5epDr9XWKwf5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1SsmvbtHrj%2F",
      color: "#1877F2",
      bg: "rgba(24,119,242,0.08)",
    },
    {
      label: "Instagram",
      icon: FaInstagram,
      href: "https://www.instagram.com/lakhisarai_physical_academy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      color: "#E1306C",
      bg: "rgba(225,48,108,0.08)",
    },
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      href: whatsappHref(),
      color: "#25D366",
      bg: "rgba(37,211,102,0.08)",
    },
  ];

  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-20">
      <Container>
        <ScrollFadeUp>
          <h2 className="text-[26px] sm:text-[32px]">Connect With Us</h2>
        </ScrollFadeUp>

        <StaggerList className="mt-8 flex flex-wrap gap-3">
          {links.map(({ label, icon: Icon, href, color, bg }) => (
            <StaggerItem
              key={label}
              as="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              hover
              className="flex items-center gap-2.5 rounded-lg border border-line bg-bg px-4 py-2.5 text-[13px] font-medium text-text transition-all hover:border-line-strong hover:scale-105"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full shrink-0"
                style={{ backgroundColor: bg }}
              >
                <Icon size={15} style={{ color }} />
              </span>
              {label}
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

/* =========================================================
   7. FAQ section wrapper
   ========================================================= */
function FAQSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp>
          <h2 className="text-[28px] sm:text-[34px]">
            Frequently Asked Questions
          </h2>
        </ScrollFadeUp>
        <FAQ />
      </Container>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInformation />
      <QuickEnquirySection />
      <FindUs />
      <AcademyTimings />
      <ConnectWithUs />
      <FAQSection />
    </>
  );
}
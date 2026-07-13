"use client";

import { motion } from "framer-motion";
import {
  Building2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Wallet,
  Ban,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { useState } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WHATSAPP_NUMBER = "918863081082";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const images = {
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(34,197,94,0.08), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.10), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(37,99,235,0.08), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(34,197,94,0.09), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(37,99,235,0.08), transparent 55%)",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: images[variant] }}
    />
  );
}

/* =========================================================
   Shared sub-navigation across all /hostel pages
   ========================================================= */
export const HOSTEL_NAV = [
  { href: "/hostel", label: "Overview" },
  { href: "/hostel/facilities", label: "Facilities" },
  { href: "/hostel/gallery", label: "Gallery" },
  { href: "/hostel/fees", label: "Fees" },
  { href: "/hostel/rules", label: "Rules" },
  { href: "/hostel/faq", label: "FAQ" },
];

export function HostelSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Hostel section pages" className="flex flex-wrap gap-2">
      {HOSTEL_NAV.map((item) => {
        const active = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active
                ? "pill pill-color-1 font-semibold"
                : "font-body rounded-full border border-line px-3.5 py-1.5 text-[13px] text-text-muted transition-colors hover:border-line-strong hover:text-text"
            }
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

/* =========================================================
   1. Hub Hero
   ========================================================= */
function HostelHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow variant={1} />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Hostel
          </p>

          <h1 className="font-display mt-5 max-w-[20ch] text-[34px] font-extrabold leading-[1.1] sm:text-[44px] lg:text-[52px]">
            <span className="text-gradient-brand">Hostel Facility</span>
          </h1>

          <p className="font-body mt-5 text-[15.5px] font-medium text-text">
            Safe, comfortable &amp; disciplined accommodation for students.
          </p>

          <p className="font-body mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-text-muted">
            Lakhisarai Physical Academy provides a secure and
            student-friendly hostel environment with comfortable
            accommodation, nutritious meals, and easy access to the
            training ground, helping students stay focused on their
            preparation.
          </p>

          <div className="mt-8">
            <HostelSubNav current="/hostel" />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#enquiry" variant="primary" icon={Building2}>
              Apply for Hostel
            </Button>
            <Button
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="secondary"
              icon={MessageCircle}
            >
              WhatsApp Enquiry
            </Button>
            <Button href="tel:8863081082" variant="secondary" icon={Phone}>
              Contact Now
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Explore Grid — links out to the five subpages
   ========================================================= */
const EXPLORE_CARDS = [
  {
    href: "/hostel/facilities",
    icon: Sparkles,
    title: "Facilities",
    desc: "Furnished rooms, mess, RO water, power backup, and more.",
  },
  {
    href: "/hostel/gallery",
    icon: Building2,
    title: "Gallery",
    desc: "A look at the rooms, mess area, and study spaces.",
  },
  {
    href: "/hostel/fees",
    icon: Wallet,
    title: "Fees",
    desc: "Monthly hostel fee, security deposit, and food charges.",
  },
  {
    href: "/hostel/rules",
    icon: Ban,
    title: "Rules",
    desc: "Discipline, timings, and conduct expected of residents.",
  },
  {
    href: "/hostel/faq",
    icon: HelpCircle,
    title: "FAQ",
    desc: "Common questions about food, visitors, and distance.",
  },
];

const ICON_TINTS = [
  "text-signal-strong",
  "text-accent-strong",
  "text-teal",
  "text-pink",
  "text-signal-strong",
];

function ExploreGrid() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          At a Glance
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]"
        >
          Everything about hostel life
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_CARDS.map(({ href, icon: Icon, title, desc }, i) => (
            <motion.a
              key={href}
              href={href}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="card-flat group flex flex-col p-6"
            >
              <Icon size={22} className={ICON_TINTS[i % ICON_TINTS.length]} />
              <h3 className="font-display mt-4 text-[16px] font-semibold text-text">
                {title}
              </h3>
              <p className="font-body mt-2 text-[13.5px] leading-relaxed text-text-muted">
                {desc}
              </p>
              <span className="font-body mt-5 flex items-center gap-1.5 text-[13px] font-medium text-signal-strong">
                Explore
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Hostel Enquiry Form — hub-only
   ========================================================= */
function HostelEnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    district: "",
    course: "",
    hostelRequired: "Yes",
    joiningDate: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const message = `Hello Lakhisarai Physical Academy, I would like to apply for hostel accommodation:\nFull Name: ${form.name}\nMobile Number: ${form.mobile}\nWhatsApp Number: ${form.whatsapp}\nDistrict: ${form.district}\nCourse: ${form.course}\nHostel Required: ${form.hostelRequired}\nPreferred Joining Date: ${form.joiningDate}\nMessage: ${form.message}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const inputClasses =
    "w-full rounded-lg border border-line-strong bg-bg px-4 py-2.5 text-[14px] text-text outline-none placeholder:text-text-muted";

  return (
    <section id="enquiry" className="py-16 sm:py-24">
      <Container>
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-2xl px-6 py-14 sm:px-14"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 800px 400px at 15% 0%, rgba(37,99,235,0.35), transparent 60%), radial-gradient(ellipse 700px 400px at 90% 100%, rgba(34,197,94,0.28), transparent 55%)",
            }}
          />
          <div className="relative">
            <h2 className="font-display text-[28px] font-bold text-white sm:text-[36px]">
              Hostel Enquiry Form
            </h2>
            <p className="font-body mt-3 max-w-[60ch] text-[15px] leading-relaxed text-text-on-dark-muted">
              Share your details below and our team will confirm hostel
              availability and next steps over WhatsApp.
            </p>

            <div className="mt-8 grid max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-2">
              <input className={inputClasses} placeholder="Full Name *" value={form.name} onChange={(e) => update("name", e.target.value)} />
              <input className={inputClasses} placeholder="Mobile Number *" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} />
              <input className={inputClasses} placeholder="WhatsApp Number *" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
              <input className={inputClasses} placeholder="District *" value={form.district} onChange={(e) => update("district", e.target.value)} />
              <input className={inputClasses} placeholder="Course" value={form.course} onChange={(e) => update("course", e.target.value)} />
              <select className={inputClasses} value={form.hostelRequired} onChange={(e) => update("hostelRequired", e.target.value)}>
                <option>Yes</option>
                <option>No</option>
              </select>
              <input className={inputClasses} type="date" placeholder="Preferred Joining Date" value={form.joiningDate} onChange={(e) => update("joiningDate", e.target.value)} />
              <div className="sm:col-span-2">
                <textarea
                  className={`${inputClasses} resize-none`}
                  rows={3}
                  placeholder="Message (Optional)"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <Button href={whatsappHref} variant="primary" icon={Building2}>
                  Apply for Hostel
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Hostel() {
  return (
    <>
      <HostelHero />
      <ExploreGrid />
      <HostelEnquiryForm />
    </>
  );
}
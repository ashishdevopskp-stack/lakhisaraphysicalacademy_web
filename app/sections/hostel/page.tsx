"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MessageCircle,
  Phone,
  ShieldCheck,
  BedDouble,
  Utensils,
  Droplets,
  BatteryCharging,
  ShowerHead,
  Wifi,
  BookOpen,
  Sparkles,
  MapPin,
  ChevronDown,
  Wallet,
  ClipboardList,
  Ban,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WHATSAPP_NUMBER = "918863081082";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

/* Reusable soft gradient wash for section backgrounds — matches About/Courses */
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
   1. Hero
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
   2. Hostel Overview
   ========================================================= */
const OVERVIEW = [
  "Safe & Secure Environment",
  "Comfortable Rooms",
  "Healthy & Hygienic Food",
  "24×7 Water & Electricity",
  "Clean Washrooms",
  "Peaceful Study Atmosphere",
  "Walking Distance from Academy",
  "Discipline & Regular Monitoring",
];

function HostelOverview() {
  return (
    <section className="py-16 sm:py-24">
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
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Hostel Overview
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 4) * 0.05 }}
              className="card-flat flex items-center gap-3 px-4 py-4"
            >
              <ShieldCheck size={16} className="shrink-0 text-signal" />
              <span className="font-body text-[13px] text-text">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Hostel Facilities
   ========================================================= */
const FACILITIES = [
  { label: "Furnished Rooms", icon: BedDouble },
  { label: "Mess Facility", icon: Utensils },
  { label: "Clean Bathrooms", icon: ShowerHead },
  { label: "RO Drinking Water", icon: Droplets },
  { label: "Power Backup", icon: BatteryCharging },
  { label: "Wi-Fi (If Available)", icon: Wifi },
  { label: "Self Study Area", icon: BookOpen },
  { label: "Regular Cleaning", icon: Sparkles },
  { label: "Near Training Ground", icon: MapPin },
  { label: "Safe Environment", icon: ShieldCheck },
] as const;

function HostelFacilities() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={2} />
      <Container>
        <motion.p
          {...fadeUp}
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Comfort &amp; Care
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-display mt-4 text-[28px] font-bold sm:text-[36px]"
        >
          Hostel Facilities
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {FACILITIES.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 5) * 0.04 }}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center"
            >
              <Icon size={20} className="text-signal" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Hostel Gallery
   ========================================================= */
const GALLERY = [
  "Hostel Rooms",
  "Beds",
  "Mess Area",
  "Washrooms",
  "Study Area",
  "Outside View",
];

function HostelGallery() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Hostel Gallery
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {GALLERY.map((item, i) => (
            <motion.div
              key={item}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 6) * 0.05 }}
              className={`card-flat flex aspect-square flex-col items-center justify-center gap-2 px-3 text-center ${PILL_COLORS[i % PILL_COLORS.length]}`}
            >
              <Building2 size={20} />
              <span className="font-body text-[12px] font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Hostel Fees
   ========================================================= */
const FEE_PLANS = [
  { plan: "Monthly Hostel Fee", price: "₹3,500", note: "per month, shared room" },
  { plan: "Security Deposit", price: "₹2,000", note: "refundable, one-time" },
  { plan: "Food Charges", price: "₹2,500", note: "per month, mess included" },
];

function HostelFees() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={3} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Hostel Fees
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {FEE_PLANS.map((fee, i) => (
            <motion.div
              key={fee.plan}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-6"
            >
              <Wallet size={18} className="text-signal" />
              <p className="font-display mt-4 text-[14px] font-semibold text-text">
                {fee.plan}
              </p>
              <p className="font-display mt-1.5 text-[22px] font-bold text-text">
                {fee.price}
              </p>
              <p className="font-body mt-1 text-[12px] text-text-muted">{fee.note}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="mt-8"
        >
          <Button href="#enquiry" variant="secondary" icon={ClipboardList}>
            View Fee Details
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   6. Hostel Rules
   ========================================================= */
const RULES = [
  "Maintain Discipline",
  "Keep Rooms Clean",
  "Follow Hostel Timings",
  "Respect Fellow Students",
  "No Smoking or Alcohol",
  "Damage to Property is Chargeable",
];

function HostelRules() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Hostel Rules
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RULES.map((rule, i) => (
            <motion.div
              key={rule}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
              className="card-flat flex items-center gap-3 px-4 py-4"
            >
              <Ban size={16} className="shrink-0 text-accent-strong" />
              <span className="font-body text-[13px] text-text">{rule}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   7. FAQ
   ========================================================= */
const FAQS = [
  {
    q: "Is hostel available for boys/girls?",
    a: "We offer separate hostel accommodation for boys and girls, each with independent supervision and facilities.",
  },
  {
    q: "Is food included?",
    a: "Yes, mess facility with healthy and hygienic food is available. Food charges are billed separately from the room fee.",
  },
  {
    q: "How far is the hostel from the academy?",
    a: "The hostel is within walking distance of the training ground, so students can reach sessions on time without commuting.",
  },
  {
    q: "Are visitors allowed?",
    a: "Visitors are allowed during designated hours only, in line with hostel discipline and safety rules.",
  },
  {
    q: "What facilities are available?",
    a: "Furnished rooms, mess facility, clean bathrooms, RO drinking water, power backup, self-study area, and regular cleaning.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionGlow variant={1} />
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[36px]">
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="card-flat mt-8 max-w-[70ch] divide-y divide-line overflow-hidden px-6"
        >
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-[15px] font-medium text-text">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="font-body pb-5 text-[14px] text-text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   8. Hostel Enquiry Form (gradient rounded container — matches About FinalCTA)
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
      <HostelOverview />
      <HostelFacilities />
      <HostelGallery />
      <HostelFees />
      <HostelRules />
      <FAQ />
      <HostelEnquiryForm />
    </>
  );
}
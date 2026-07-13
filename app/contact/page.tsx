"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  ClipboardList,
  Send,
  User,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Video as Youtube,
  FormIcon as Facebook,
  Camera as Instagram,
  Navigation,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WHATSAPP_NUMBERS = ["918863081082", "917739776471"];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
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
            <Button href="tel:8863081082" variant="primary" icon={Phone}>
              Call Now
            </Button>
            <Button
              href={`https://wa.me/${WHATSAPP_NUMBERS[0]}`}
              variant="secondary"
              icon={MessageCircle}
            >
              WhatsApp
            </Button>
            <Button href="#enquiry" variant="ghost" icon={ClipboardList}>
              Enquire Now
            </Button>
          </div>
        </motion.div>
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
    { icon: Phone, label: "Mobile Numbers", value: "+91 8863081082, +91 7739776471" },
    { icon: MessageCircle, label: "WhatsApp", value: "+91 8863081082, +91 7739776471" },
    { icon: Mail, label: "Email", value: "ganeshkumar90067@gmail.com" },
    {
      icon: MapPin,
      label: "Address",
      value:
        "K.R.K. Ground, Near Lakhisarai Railway Station, Nawada Sikandara Road, Lakhisarai, Bihar – 811311",
    },
  ];

  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="text-[26px] sm:text-[32px]">
          Contact Information
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-2 text-[14px] text-text-muted"
        >
          Lakhisarai Physical Academy
        </motion.p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rows.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-xl border border-line bg-bg p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-bg-raised">
                <Icon size={16} className="text-signal" />
              </span>
              <div>
                <p className="text-[13px] font-medium text-text">{label}</p>
                <p className="mt-1 text-[13px] text-text-muted">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Quick Enquiry Form
   ========================================================= */
function QuickEnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    email: "",
    subject: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const waMessage = `Hello Lakhisarai Physical Academy, I have an enquiry:\nFull Name: ${form.name}\nMobile Number: ${form.mobile}\nWhatsApp Number: ${form.whatsapp}\nEmail: ${form.email}\nSubject: ${form.subject}\nMessage: ${form.message}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBERS[0]}?text=${encodeURIComponent(waMessage)}`;

  const inputClasses =
    "w-full rounded-lg border border-line bg-bg-raised px-4 py-2.5 text-[14px] text-text outline-none placeholder:text-text-muted";

  return (
    <section id="enquiry" className="border-b border-line py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="text-[28px] sm:text-[34px]">
          Quick Enquiry Form
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mt-3 max-w-[60ch] text-[15px] text-text-muted"
        >
          Send us your questions about admissions, courses, hostel, or fees
          and our team will get back to you shortly.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-8 grid max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <input className={inputClasses} placeholder="Full Name *" value={form.name} onChange={(e) => update("name", e.target.value)} />
          <input className={inputClasses} placeholder="Mobile Number *" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} />
          <input className={inputClasses} placeholder="WhatsApp Number (Optional)" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
          <input className={inputClasses} type="email" placeholder="Email Address (Optional)" value={form.email} onChange={(e) => update("email", e.target.value)} />
          <div className="sm:col-span-2">
            <input className={inputClasses} placeholder="Subject *" value={form.subject} onChange={(e) => update("subject", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <textarea
              className={`${inputClasses} resize-none`}
              rows={4}
              placeholder="Message *"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <Button href={whatsappHref} variant="primary" icon={Send}>
              Send Enquiry
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Find Us
   ========================================================= */
function FindUs() {
  const mapsQuery = encodeURIComponent(
    "K.R.K. Ground, Near Lakhisarai Railway Station, Nawada Sikandara Road, Lakhisarai, Bihar 811311"
  );
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const embedHref = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="text-[28px] sm:text-[34px]">
          Find Us
        </motion.h2>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
          className="mt-8 overflow-hidden rounded-xl border border-line"
        >
          <iframe
            title="Lakhisarai Physical Academy location"
            src={embedHref}
            className="h-[360px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-6"
        >
          <Button href={directionsHref} variant="secondary" icon={Navigation}>
            Get Directions
          </Button>
        </motion.div>
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
        <motion.h2 {...fadeUp} className="text-[26px] sm:text-[32px]">
          Academy Timings
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rows.map(({ label, value }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-xl border border-line bg-bg-raised p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-bg">
                <Clock size={16} className="text-signal" />
              </span>
              <div>
                <p className="text-[14px] font-medium text-text">{label}</p>
                <p className="mt-1 text-[13px] text-text-muted">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   6. Connect With Us
   ========================================================= */
function ConnectWithUs() {
  const links = [
    { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
    { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBERS[0]}` },
  ];

  return (
    <section className="border-b border-line bg-bg-raised py-16 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="text-[26px] sm:text-[32px]">
          Connect With Us
        </motion.h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {links.map(({ label, icon: Icon, href }, i) => (
            <motion.a
              key={label}
              href={href}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="flex items-center gap-2 rounded-lg border border-line bg-bg px-4 py-2.5 text-[13px] font-medium text-text transition-colors hover:border-line-strong"
            >
              <Icon size={16} className="text-signal" />
              {label}
            </motion.a>
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
    q: "How can I take admission?",
    a: "Fill out the Online Admission Form on our website, or visit the academy in person. Our team will guide you through course selection and fees.",
  },
  {
    q: "Is hostel facility available?",
    a: "Yes, we offer safe and comfortable hostel accommodation with meals, within walking distance of the training ground.",
  },
  {
    q: "Which courses are offered?",
    a: "We train for Army, Bihar Police, Daroga (SI), SSC GD, CISF, CRPF, BSF, and other government physical recruitment tests.",
  },
  {
    q: "What are the batch timings?",
    a: "Morning batch runs 05:00 AM – 08:00 AM and evening batch runs 04:00 PM – 07:00 PM, seven days a week.",
  },
  {
    q: "Can I register as a guest student?",
    a: "Yes, guest students can join select training sessions. Contact us on WhatsApp or call to check availability.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="text-[28px] sm:text-[34px]">
          Frequently Asked Questions
        </motion.h2>

        <div className="mt-8 flex max-w-[70ch] flex-col divide-y divide-line border-y border-line">
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
                  <span className="text-[15px] font-medium text-text">
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
                      <p className="pb-5 text-[14px] text-text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactInformation />
      <QuickEnquiryForm />
      <FindUs />
      <AcademyTimings />
      <ConnectWithUs />
      <FAQ />
    </>
  );
}
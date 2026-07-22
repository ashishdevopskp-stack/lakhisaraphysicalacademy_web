"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE } from "./_ContactMotion";

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

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
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
                  <p className="pb-5 text-[14px] text-text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, ClipboardList, Send } from "lucide-react";

const EXAMS = ["Army", "Bihar Police", "Daroga", "SSC GD", "CISF", "CRPF", "BSF"];
const EASE = [0.22, 0.61, 0.36, 1] as const;

const WHATSAPP_NUMBER = "918863081082";

type EnrollFormProps = {
  open: boolean;
  onClose: () => void;
};

export default function EnrollForm({ open, onClose }: EnrollFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [exam, setExam] = useState(EXAMS[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const text = `Hi, I want to enroll at Lakhisarai Physical Academy.%0A%0AName: ${encodeURIComponent(
      name
    )}%0APhone: ${encodeURIComponent(phone)}%0AExam: ${encodeURIComponent(
      exam
    )}${message ? `%0AMessage: ${encodeURIComponent(message)}` : ""}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");

    setName("");
    setPhone("");
    setExam(EXAMS[0]);
    setMessage("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Enroll now"
            className="card-flat relative z-10 w-full max-w-md p-6 sm:p-7"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-text-faint transition-colors hover:bg-bg-raised-2 hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-signal">
              Enroll Now
            </p>
            <h3 className="mt-1.5 text-[22px] font-semibold text-text">
              Start your training
            </h3>
            <p className="mt-1.5 text-[14px] text-text-muted">
              Fill in your details and we&rsquo;ll reach out on WhatsApp to confirm your batch.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-text-muted">Full name</span>
                <div className="flex items-center gap-2 rounded-md border border-line bg-bg-raised px-3.5 py-2.5">
                  <User className="h-4 w-4 shrink-0 text-text-faint" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-transparent text-[14.5px] text-text outline-none placeholder:text-text-faint"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-text-muted">Phone number</span>
                <div className="flex items-center gap-2 rounded-md border border-line bg-bg-raised px-3.5 py-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-text-faint" />
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full bg-transparent text-[14.5px] text-text outline-none placeholder:text-text-faint"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-text-muted">Exam preparing for</span>
                <div className="flex items-center gap-2 rounded-md border border-line bg-bg-raised px-3.5 py-2.5">
                  <ClipboardList className="h-4 w-4 shrink-0 text-text-faint" />
                  <select
                    value={exam}
                    onChange={(e) => setExam(e.target.value)}
                    className="w-full bg-transparent text-[14.5px] text-text outline-none"
                  >
                    {EXAMS.map((item) => (
                      <option key={item} value={item} className="bg-bg text-text">
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-text-muted">
                  Message <span className="text-text-faint">(optional)</span>
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Anything you'd like us to know"
                  rows={3}
                  className="w-full resize-none rounded-md border border-line bg-bg-raised px-3.5 py-2.5 text-[14.5px] text-text outline-none placeholder:text-text-faint"
                />
              </label>

              <button type="submit" className="btn btn-primary mt-1 w-full justify-center">
                <Send className="h-4 w-4" />
                Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
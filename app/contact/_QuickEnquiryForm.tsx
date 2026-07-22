"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Button from "../components/Button";
import { whatsappHref } from "../lib/constants";

export default function QuickEnquiryForm() {
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

  const inputClasses =
    "w-full rounded-lg border border-line bg-bg-raised px-4 py-2.5 text-[14px] text-text outline-none placeholder:text-text-muted";

  return (
    <div className="mt-8 grid max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-2">
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
        <Button href={whatsappHref(encodeURIComponent(waMessage))} variant="primary" icon={Send}>
          Send Enquiry
        </Button>
      </div>
    </div>
  );
}
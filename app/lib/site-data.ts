/**
 * SITE DATA — single source of truth.
 * Edit copy, contact info, exams, and section content here.
 * Components should never hardcode strings that live in this file.
 */

export const brand = {
  name: "Lakhisarai Physical Academy",
  shortName: "LPA",
  tagline: "Lakhisarai Physical Academy",
  city: "Lakhisarai, Bihar",
};

export const contact = {
  phoneDisplay: "88630 81082",
  phoneHref: "tel:8863081082",
  whatsappHref: "https://wa.me/918863081082",
  whatsappDisplay: "WhatsApp",
};

export const exams = [
  "Army",
  "Bihar Police",
  "Daroga",
  "SSC GD",
  "CISF",
  "CRPF",
  "BSF",
] as const;

export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Results", href: "#results" },
  { label: "Admission", href: "#admission" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: brand.tagline,
  headline: "The Most Trusted Physical Training Academy in Lakhisarai",
  subhead:
    "Professional physical training for Army, Bihar Police, Daroga, SSC GD, CISF, CRPF, BSF and other government recruitment physical tests.",
  body: "We help students clear defence and government physical recruitment tests through disciplined training, expert guidance, and continuous performance improvement — with structured preparation built around each exam's actual standards.",
  ctas: {
    primary: { label: "Apply Online", href: "#admission" },
    call: { label: "Call Now", href: contact.phoneHref },
    whatsapp: { label: "WhatsApp", href: contact.whatsappHref },
    tertiary: { label: "Join Today", href: "#admission" },
  },
};

export const seo = {
  title: `${brand.name} | Army, Police & SSC GD Physical Training`,
  description:
    "Professional physical training for Army, Bihar Police, Daroga, SSC GD, CISF, CRPF and BSF recruitment. Disciplined coaching, expert guidance, and hostel facility in Lakhisarai, Bihar.",
};
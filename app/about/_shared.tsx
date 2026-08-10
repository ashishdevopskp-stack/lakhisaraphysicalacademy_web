const EASE = [0.22, 0.61, 0.36, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

export const PILL_COLORS = [
  "pill-color-1",
  "pill-color-2",
  "pill-color-3",
  "pill-color-4",
  "pill-color-5",
];

const GLOW_IMAGES = {
  1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(20,184,166,0.10), transparent 55%)",
  2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.12), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(59,130,246,0.10), transparent 55%)",
  3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(245,166,35,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(59,130,246,0.10), transparent 55%)",
} as const;

export function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: GLOW_IMAGES[variant] }}
    />
  );
}

export const ABOUT_NAV = [
  { href: "/about", label: "Overview" },
  { href: "/about/founderanddirector", label: "Founder & Director" },
  { href: "/about/ourstory", label: "Our Story" },
  { href: "/about/whatwetrain", label: "What We Train" },
  { href: "/about/facilities", label: "Facilities" },
  { href: "/about/achievements", label: "Achievements" },
];

export function AboutSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="About section pages" className="flex flex-wrap items-center gap-2 py-1">
      {ABOUT_NAV.map((item) => {
        const active = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active
                ? "rounded-full bg-[#ea580c] px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-orange-500/25 transition-all hover:bg-[#c2410c] hover:scale-105"
                : "rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm transition-all hover:border-orange-500/40 hover:bg-orange-50/50 hover:text-[#ea580c]"
            }
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
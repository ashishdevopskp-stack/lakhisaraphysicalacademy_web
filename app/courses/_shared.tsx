const GLOW_IMAGES = {
  1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(34,197,94,0.08), transparent 55%)",
  2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.10), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(37,99,235,0.08), transparent 55%)",
  3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(34,197,94,0.09), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(37,99,235,0.08), transparent 55%)",
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

export const PILL_COLORS = [
  "pill-color-1",
  "pill-color-2",
  "pill-color-3",
  "pill-color-4",
  "pill-color-5",
];

export const COURSES_NAV = [
  { href: "/courses", label: "Overview" },
  { href: "/courses/programs", label: "Training Programs" },
  { href: "/courses/schedule", label: "Schedule" },
  { href: "/courses/facilities", label: "Facilities" },
  { href: "/courses/fees-admission", label: "Fees & Admission" },
  { href: "/courses/faq", label: "FAQ" },
];

export function CoursesSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Courses section pages" className="flex flex-wrap gap-2">
      {COURSES_NAV.map((item) => {
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
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
    <nav aria-label="Courses section pages" className="flex flex-wrap items-center gap-2 py-1">
      {COURSES_NAV.map((item) => {
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

// Keep SectionGlow as a no-op accepting optional variant prop
export function SectionGlow({ variant }: { variant?: number } = {}) {
  return null;
}
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
  { href: "/courses/schedule", label: "Ground Schedule" },
  { href: "/courses/facilities", label: "Facilities" },
  { href: "/courses/fees-admission", label: "Fees & Admission" },
  { href: "/courses/faq", label: "PET FAQ" },
];

export function CoursesSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Courses category sub-navigation" className="flex flex-wrap items-center gap-2 py-2">
      {COURSES_NAV.map((item) => {
        const active = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active
                ? "rounded-2xl bg-gradient-to-r from-[#ea580c] to-amber-600 px-4 py-2 text-xs font-black text-white shadow-md shadow-orange-500/25 transition-all hover:scale-105 border border-orange-400 flex items-center gap-1.5"
                : "rounded-2xl border border-slate-200/90 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs transition-all hover:border-orange-400 hover:bg-orange-50/60 hover:text-[#ea580c] flex items-center gap-1.5"
            }
          >
            <span>{item.label}</span>
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
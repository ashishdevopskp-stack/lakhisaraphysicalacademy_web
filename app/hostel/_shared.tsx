// app/hostel/_shared.tsx

export function SectionGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(34,197,94,0.08), transparent 55%)",
      }}
    />
  );
}

/* =========================================================
   Shared sub-navigation across all /hostel pages
   ========================================================= */
export const HOSTEL_NAV = [
  { href: "/hostel", label: "Hostel Overview" },
  { href: "/hostel/facilities", label: "Facilities & Security" },
  { href: "/hostel/gallery", label: "Campus Gallery" },
  { href: "/hostel/fees", label: "Fee Structure" },
  { href: "/hostel/rules", label: "Hostel Rules" },
  { href: "/hostel/faq", label: "Hostel FAQ" },
];

export function HostelSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Hostel section sub-navigation" className="flex flex-wrap items-center gap-2 py-2">
      {HOSTEL_NAV.map((item) => {
        const active = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active
                ? "rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-2 text-xs font-black text-white shadow-md shadow-emerald-600/25 transition-all hover:scale-105 border border-emerald-500"
                : "rounded-2xl border border-slate-200/90 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs transition-all hover:border-emerald-500/50 hover:bg-emerald-50/60 hover:text-emerald-800"
            }
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
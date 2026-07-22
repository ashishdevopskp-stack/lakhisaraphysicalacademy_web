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
  { href: "/hostel", label: "Overview" },
  { href: "/hostel/facilities", label: "Facilities" },
  { href: "/hostel/gallery", label: "Gallery" },
  { href: "/hostel/fees", label: "Fees" },
  { href: "/hostel/rules", label: "Rules" },
  { href: "/hostel/faq", label: "FAQ" },
];

export function HostelSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Hostel section pages" className="flex flex-wrap gap-2">
      {HOSTEL_NAV.map((item) => {
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
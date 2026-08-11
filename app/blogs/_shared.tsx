// app/blogs/_shared.tsx

export const BLOG_NAV = [
  { href: "/blogs", label: "Blog Overview" },
  { href: "/blogs/categories", label: "Blog Categories" },
  { href: "/blogs/articles", label: "Latest Articles" },
  { href: "/blogs/topics", label: "Popular Topics" },
];

export function BlogSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="Blog section sub-navigation" className="flex flex-wrap gap-2 py-2">
      {BLOG_NAV.map((item) => {
        const active = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active
                ? "rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-black text-white shadow-md shadow-blue-600/25 transition-all hover:scale-105 border border-blue-400"
                : "rounded-2xl border border-slate-200/90 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs transition-all hover:border-blue-400 hover:bg-blue-50/60 hover:text-blue-800"
            }
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

/* Shared background glow — variant 1 is reused by the hub hero and the
   categories hero (they were byte-identical). Variant 2 is hub-only
   (Explore Grid) and kept parameterized here for consistency. */
export function SectionGlow({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const images = {
    1: "radial-gradient(ellipse 1000px 550px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(ellipse 800px 500px at 95% 30%, rgba(34,197,94,0.08), transparent 55%)",
    2: "radial-gradient(ellipse 900px 500px at 90% 10%, rgba(20,184,166,0.10), transparent 55%), radial-gradient(ellipse 800px 500px at 5% 90%, rgba(37,99,235,0.08), transparent 55%)",
    3: "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(34,197,94,0.09), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(37,99,235,0.08), transparent 55%)",
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ backgroundImage: images[variant] }}
    />
  );
}
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "whatsapp" | "ghost";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-orange",
  secondary: "btn-secondary-pill",
  accent: "btn-orange bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20",
  whatsapp: "btn-secondary-pill bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  ghost: "btn-secondary-pill border-transparent shadow-none hover:bg-slate-100",
};

export default function Button({
  href,
  variant = "primary",
  icon: Icon,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  const isExternal =
    href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const className = VARIANT_CLASS[variant];

  if (isExternal) {
    return (
      <a href={href} className={className}>
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
    </Link>
  );
}
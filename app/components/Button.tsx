import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "whatsapp" | "ghost";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  accent: "btn btn-accent",
  whatsapp: "btn btn-whatsapp",
  ghost: "btn btn-ghost",
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
  const className = `${VARIANT_CLASS[variant]} text-[14px]`;

  if (isExternal) {
    return (
      <a href={href} className={className}>
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Link>
  );
}
import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
};

const base =
  "inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm border px-6 py-3.5 text-[15px] font-semibold tracking-wide transition-colors duration-150 active:translate-y-px";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-signal bg-signal text-on-signal hover:border-signal-strong hover:bg-signal-strong",
  secondary:
    "border-line-strong bg-transparent text-text hover:border-olive-strong hover:text-olive-strong",
  ghost:
    "border-transparent bg-transparent px-1 text-text-muted hover:text-signal",
};

/** Solid, flat CTA button — no gradients, no blur, no translucency. */
export default function Button({
  href,
  children,
  variant = "primary",
  icon: Icon,
}: ButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {Icon && <Icon size={16} strokeWidth={2.25} aria-hidden="true" />}
      <span>{children}</span>
    </a>
  );
}
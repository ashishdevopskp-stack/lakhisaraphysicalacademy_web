import type { ReactNode } from "react";

export const EASE = [0.22, 0.61, 0.36, 1] as const;

export function FadeInUp({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function ScrollFadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
  hover = false,
  variant = "up",
  as: As = "div",
  href,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "up" | "scale";
  as?: "div" | "a";
  href?: string;
}) {
  if (As === "a") {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
}
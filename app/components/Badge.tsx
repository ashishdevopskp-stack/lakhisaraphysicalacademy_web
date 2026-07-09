import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "olive" | "signal";
};

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  olive: "border-line-strong text-olive-strong",
  signal: "border-signal-dim text-signal-strong",
};

export default function Badge({ children, tone = "olive" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border bg-bg-raised px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
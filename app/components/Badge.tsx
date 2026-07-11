import type { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="glass inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium text-text-muted">
      {children}
    </span>
  );
}
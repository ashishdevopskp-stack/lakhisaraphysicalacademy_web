"use client";

import { Sun, Moon, Smartphone } from "lucide-react";
import { useTheme } from "../lib/theme-provider";

const OPTIONS = [
  { key: "light" as const, icon: Sun, label: "Light" },
  { key: "system" as const, icon: Smartphone, label: "Auto" },
  { key: "dark" as const, icon: Moon, label: "Dark" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Appearance"
      className="relative flex items-center gap-0.5 rounded-full bg-bg-raised-2 p-0.5"
    >
      {OPTIONS.map(({ key, icon: Icon, label }) => {
        const active = theme === key;
        return (
          <button
            key={key}
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => setTheme(key)}
            className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 ${
              active
                ? "bg-bg-raised text-text shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                : "text-text-faint hover:text-text-muted"
            }`}
          >
            <Icon size={14} strokeWidth={2.25} />
          </button>
        );
      })}
    </div>
  );
}
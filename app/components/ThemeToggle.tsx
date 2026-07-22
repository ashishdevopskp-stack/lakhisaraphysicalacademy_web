"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const LABELS = {
  light: "Light theme — click for dark",
  dark: "Dark theme — click for system",
  system: "Following system theme — click for light",
} as const;

export default function ThemeToggle() {
  const { theme, resolvedTheme, cycleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={LABELS[theme]}
      title={LABELS[theme]}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-text-muted transition-colors hover:bg-bg-raised hover:text-text"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <Sun
          size={16}
          className={`absolute transition-all duration-200 ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-50 opacity-0"
          }`}
        />
        <Moon
          size={16}
          className={`absolute transition-all duration-200 ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"
          }`}
        />
        <Monitor
          size={16}
          className={`absolute transition-all duration-200 ${
            theme === "system"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-50 opacity-0"
          }`}
        />
      </span>
      <span className="sr-only">Current: {theme === "system" ? `system (${resolvedTheme})` : theme}</span>
    </button>
  );
}
"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-text-muted transition-colors hover:bg-bg-raised hover:text-text"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <Sun
          size={16}
          className={`absolute transition-all duration-200 ${
            theme === "dark" ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          size={16}
          className={`absolute transition-all duration-200 ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * Two states, both named. A single icon that "shows what you get" is read as
 * often backwards as forwards, so the control is a pair: the sun is the light
 * theme, the moon the dark one, and the one you are in is inked.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn("studio-chrome__theme", className)}
      role="group"
      aria-label="Colour theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        aria-label="Light theme"
        title="Light"
      >
        <Sun className="w-3.5 h-3.5" strokeWidth={1.6} aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        aria-label="Dark theme"
        title="Dark"
      >
        <Moon className="w-3.5 h-3.5" strokeWidth={1.6} aria-hidden />
      </button>
    </div>
  );
}

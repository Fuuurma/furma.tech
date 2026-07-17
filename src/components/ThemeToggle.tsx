"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={cn("studio-chrome__theme", className)}
      aria-label={`Switch to ${next} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4" strokeWidth={1.5} aria-hidden />
      ) : (
        <Sun className="w-4 h-4" strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}

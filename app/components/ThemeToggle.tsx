"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "quizzy-theme";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(
      THEME_STORAGE_KEY,
    ) as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [mounted, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const icon = theme === "light" ? "🌙" : "☀️";
  const label =
    theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="flex items-center gap-2 rounded-full border border-white/20 bg-black/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur transition hover:border-white/40"
    >
      <span className="text-lg" aria-hidden>
        {icon}
      </span>
      <span className="hidden sm:inline">
        {theme === "light" ? "Dark" : "Light"} mode
      </span>
    </button>
  );
};

export default ThemeToggle;

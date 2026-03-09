import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem("theme") as Theme | null;
  if (storedTheme) return storedTheme;

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev: Theme) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (theme: Theme) => setCurrentTheme(theme);

  return { theme: currentTheme, currentTheme, toggleTheme, setTheme };
}

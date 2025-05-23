import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "dark"
  );

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

  return { currentTheme, toggleTheme, setTheme };
}

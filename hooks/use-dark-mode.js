"use client";

import { useCallback, useSyncExternalStore } from "react";

const getTheme = (defaultTheme) => {
  if (typeof window === "undefined") return defaultTheme;
  return localStorage.getItem("theme") ||
    (document.documentElement.classList.contains("dark") ? "dark" : defaultTheme);
};

const useDarkMode = (defaultTheme = "dark") => {
  const theme = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("themechange", onStoreChange);
      return () => window.removeEventListener("themechange", onStoreChange);
    },
    () => getTheme(defaultTheme),
    () => defaultTheme
  );

  const applyTheme = (newTheme) => {
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    window.dispatchEvent(new Event("themechange"));
  };

  const setAndSaveTheme = useCallback((newTheme) => {
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setAndSaveTheme]);

  return { theme, toggleTheme };
};

export default useDarkMode;
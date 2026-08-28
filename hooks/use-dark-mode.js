"use client";

import { useState, useCallback, useEffect } from "react";

const useDarkMode = (defaultTheme = "dark") => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const hasDarkClass = document.documentElement.classList.contains("dark");
    const current = saved || (hasDarkClass ? "dark" : defaultTheme);

    applyTheme(current);
    setTheme(current);
  }, [defaultTheme]);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const setAndSaveTheme = useCallback((newTheme) => {
    applyTheme(newTheme);
    setTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setAndSaveTheme]);

  return { theme, toggleTheme };
};

export default useDarkMode;
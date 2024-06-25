import { useState, useEffect } from "react";

function useTheme() {
  const [theme, setThemeState] = useState(localStorage.getItem("theme") || "dark");

  // Available themes: dark, light, blue, greenish
  const setTheme = (newTheme) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  // Ensure theme is synced with local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setThemeState(storedTheme);
    }
  }, []);

  return [theme, setTheme];
}

export default useTheme;
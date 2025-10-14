"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeCtx = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeCtx must be used within ThemeProvider");
  return ctx;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // initialize theme safely on client
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const resolved = storedTheme ?? (prefersDark ? "dark" : "light");
    setTheme(resolved);

    document.documentElement.classList.toggle("dark", resolved === "dark");
    localStorage.setItem("theme", resolved);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// "use client";

// // ThemeContext.tsx
// import { createContext, useContext, useState, useEffect } from "react";

// type Theme = "light" | "dark";

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// // Use undefined as initial value so we can detect missing provider at runtime
// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const useThemeCtx = () => {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) throw new Error("useThemeCtx must be used within a ThemeProvider");
//   return ctx;
// };

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [theme, setTheme] = useState<Theme>("light");

//   // Initialize theme on mount (safe for SSR)
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme === "light" || storedTheme === "dark") {
//       setTheme(storedTheme);
//       return;
//     }

//     const prefersDark =
//       typeof window !== "undefined" &&
//       window.matchMedia &&
//       window.matchMedia("(prefers-color-scheme: dark)").matches;
//     setTheme(prefersDark ? "dark" : "light");
//   }, []);

//   // Persist theme and apply Tailwind dark class
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     try {
//       localStorage.setItem("theme", theme);
//     } catch (e) {
//       // ignore storage errors (privacy modes)
//     }

//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

import { createContext, useState } from "react";

export const ThemeContext = createContext({});

interface ThemProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemProviderProps) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

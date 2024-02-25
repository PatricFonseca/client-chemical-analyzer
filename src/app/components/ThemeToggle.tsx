import React, { useState } from "react";

interface ThemeToggleProps {
  onChange: (isDarkTheme: boolean) => void;
}

const ThemeToggle = ({ onChange }: ThemeToggleProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    onChange(isDarkTheme);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleToggle}
    >
      Alternar Tema
    </button>
  );
};

export default ThemeToggle;

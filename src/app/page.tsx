"use client";

import { useEffect, useState } from "react";
import { postcss } from "tailwindcss";
import { NavBar } from "./components/Navbar";

export default function Home() {
  function handleInput() {}

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(localStorage.getItem("theme"));
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center p-24 bg-primary">
        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
        <h1 className="text-3xl font-bold text-typography">Aurora</h1>
        <input
          type="search"
          className="rounded colors bg-rose-100 p-2 border"
        />
      </main>
    </>
  );
}

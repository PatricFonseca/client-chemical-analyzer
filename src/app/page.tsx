"use client";

import { useEffect, useState } from "react";
import { postcss } from "tailwindcss";
import { NavBar } from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import ResultTable from "./components/ResultTable";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { chemicalAnalyser } from "./api/chemicalAnalyser";

export default function Home() {
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
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <main className="flex min-h-screen flex-col items-center p-24 bg-primary">
          {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
          <h1 className="text-3xl font-bold text-typography">Aurora</h1>
          <SearchBox />
          <ResultTable data={undefined} />
        </main>
      </QueryClientProvider>
    </>
  );
}
{
  /* // data={queryClient.getQueryData(["chemicalAnalyser"]) as JSON} */
}

"use client";

import { NavBar } from "@/app/components/Navbar";
import ResultTable from "@/app/components/ResultTable";
import SearchBox from "@/app/components/SearchBox";
import { ChemicalAnalysisDTO } from "@/app/dto/chemicalDto";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function Home() {
  const queryClient = useQueryClient();

  const { data } = useQuery<ChemicalAnalysisDTO>({
    queryKey: ["chemicalAnalyser"],
    // queryFn: () =>
    //   queryClient.getQueryData(["chemicalAnalyser"]) as ChemicalAnalysisDTO,
  });

  // const cachedData = queryClient.getQueryData(["chemicalAnalyser"]) as
  //   | ChemicalAnalysisDTO
  //   | undefined;

  return (
    <>
      <NavBar />

      <main className="flex min-h-screen flex-col items-center p-24 bg-primary">
        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
        <h1 className="text-3xl font-bold text-typography">Aurora</h1>
        <SearchBox />
        {/* <ResultTable data={data?.words} /> */}
        <ResultTable data={data?.words} />
      </main>
    </>
  );
}

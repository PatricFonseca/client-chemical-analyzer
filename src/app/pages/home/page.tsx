"use client";

import { InputImage } from "@/app/components/InputImage";
import { NavBar } from "@/app/components/Navbar";
import ResultTable from "@/app/components/ResultTable";
import SearchBox from "@/app/components/SearchBox";
import { Stepper } from "@/app/components/Stepper";
import { ChemicalAnalysisDTO } from "@/app/dto/chemicalDto";
import { AnalyzeIcon } from "@/app/icons/AnalyzeIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function Home() {
  const queryClient = useQueryClient();
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

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
        <Stepper
          steps={[{ stepNumber: "1" }, { stepNumber: "2" }]}
          activeStep={0}
        />
        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
        <h1 className="text-3xl font-bold text-typography mb-3">Aurora</h1>
        <InputImage imageSrc={imageSrc} setImageSrc={setImageSrc} />
        <button
          type="button"
          className="flex items-center gap-2 bg-red-700 hover:bg-red-500 text-primary rounded p-2 disabled:bg-gray-200 disabled:text-gray-500"
          disabled={!imageSrc}
        >
          Buscar componentes{" "}
          <AnalyzeIcon width={20} height={20} stroke="white" />
        </button>
        <SearchBox />
        {/* <ResultTable data={data?.words} /> */}
        <ResultTable data={data?.words} />
      </main>
    </>
  );
}

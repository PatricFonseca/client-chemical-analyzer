// "use client";

import InfoBox from "@/app/components/InfoBox";
import { InputImage } from "@/app/components/InputImage";
import { NavBar } from "@/app/components/Navbar";
import ResultTable from "@/app/components/ResultTable";
import SearchBox from "@/app/components/SearchBox";
import { Stepper } from "@/app/components/Stepper/index";
import { ChemicalAnalysisDTO } from "@/app/dto/chemicalDto";
import { AnalyzeIcon } from "@/app/icons/AnalyzeIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Home() {
  const [stepp, setStepp] = useState(0);
  const [steps, setSteps] = useState([
    { stepNumber: "1" },
    { stepNumber: "2" },
    { stepNumber: "3" },
  ]);
  // const queryClient = useQueryClient();
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

      <div className="flex bg-primary h-full container">
        <Stepper.Root steps={steps} activeStep={stepp} />
        <h1 className="text-3xl font-bold text-typography">Aurora</h1>
        <main className="flex min-h-full flex-col m-auto items-center p-24 bg-primary">
          {/* <button onClick={toggleTheme}>Toggle Theme</button> */}

          {stepp === 0 && (
            <>
              <InfoBox title="Encontre os componentes químicos a partir de uma imagem" />
              {/* <h3>.</h3> */}
              <InputImage imageSrc={imageSrc} setImageSrc={setImageSrc} />
            </>
          )}

          {stepp === 1 && (
            <>
              <InfoBox
                title="Clique em buscar componentes para encontrar os componentes do
                produto"
              />
              <button
                type="button"
                className="flex items-center gap-2 bg-red-700 hover:bg-red-500 text-primary rounded p-2 disabled:bg-gray-200 disabled:text-gray-500 mb-8"
                disabled={!imageSrc}
              >
                Buscar componentes
                <AnalyzeIcon width={20} height={20} stroke="white" />
              </button>

              <SearchBox />
            </>
          )}

          {stepp === 2 && (
            <>
              <h1 className="text-2xl">Resultados</h1>
              <ResultTable data={data?.words} />
            </>
          )}
        </main>
      </div>

      <Stepper.Button
        stepp={stepp}
        setStepp={setStepp}
        totalStepps={steps.length}
      />
    </>
  );
}

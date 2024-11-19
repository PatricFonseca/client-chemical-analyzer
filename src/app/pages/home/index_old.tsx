"use client";

import { SearchComponentsByImage } from "@/app/api/searchComponents";
import InfoBox from "@/app/components/InfoBox";
import { InputImage } from "@/app/components/InputImage";
import { NavBar } from "@/app/components/Navbar";
import ResultTable from "@/app/components/ResultTable";
import SearchBox from "@/app/components/SearchBox";
import { Stepper } from "@/app/components/Stepper/index";
import { ChemicalAnalysisDTO, ProductImageResult } from "@/app/dto/chemicalDto";
import { AnalyzeIcon } from "@/app/icons/AnalyzeIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Tag } from "react-tag-input";

export default function Home() {
  const [isLoading, setIsloading] = useState(false);
  const [stepp, setStepp] = useState(0);
  const [steps, setSteps] = useState([
    { stepNumber: "1" },
    { stepNumber: "2" },
    { stepNumber: "3" },
  ]);
  // const queryClient = useQueryClient();
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [tags, setTags] = React.useState<Tag[]>([]);

  const { data } = useQuery<ChemicalAnalysisDTO>({
    queryKey: ["chemicalAnalyser"],
    // queryFn: () =>
    //   queryClient.getQueryData(["chemicalAnalyser"]) as ChemicalAnalysisDTO,
  });

  async function handleSearchComponents() {
    if (!imageSrc) return;

    setIsloading(true);

    try {
      const data: ProductImageResult = await SearchComponentsByImage(imageSrc);

      const composition = data.composition.split(",");
      composition.map((item) => {
        setTags((prevTags) => [...prevTags, { id: item, text: item }]);
      });

      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  }

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
                onClick={handleSearchComponents}
              >
                Buscar componentes
                <AnalyzeIcon width={20} height={20} stroke="white" />
              </button>

              {isLoading ? (
                <p>Carregando...</p>
              ) : (
                <SearchBox tags={tags} setTags={setTags} />
              )}
            </>
          )}

          {stepp === 2 && (
            <>
              <h1 className="text-2xl">Resultados</h1>
              <ResultTable data={data} />
              {/* <ResultTable data={data?.words} /> */}
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

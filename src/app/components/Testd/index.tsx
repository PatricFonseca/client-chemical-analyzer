import { ChemicalAnalysisDTO } from "@/app/dto/chemicalDto";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export function Test() {
  const query = useQueryClient();

  const { data } = useQuery({
    queryKey: ["chemicalAnalyser"],
    queryFn: () =>
      query.getQueryData(["chemicalAnalyser"]) as ChemicalAnalysisDTO,
  });

  // const chem = query.getQueryData(["chemicalAnalyser"]) as ChemicalAnalysisDTO;
  return (
    <p className="text-teal-300">{data?.words.map((word) => word.name)}</p>
  );
}

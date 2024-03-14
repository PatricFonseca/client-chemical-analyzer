"use client";

import { NavBar } from "@/app/components/Navbar";
import ResultTable from "@/app/components/ResultTable";
import SearchBox from "@/app/components/SearchBox";
import { ChemicalAnalysisDTO } from "@/app/dto/chemicalDto";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Home from "./pages/home/page";

export default function DefaultPage() {
  const queryClient = new QueryClient();
  // const { data } = useQuery({
  //   queryKey: ["chemicalAnalyser"],
  //   queryFn: () =>
  //     queryClient.getQueryData(["chemicalAnalyser"]) as ChemicalAnalysisDTO,
  // });

  // const queryClient = useQueryClient();

  // const { data } = useQuery({
  //   queryKey: ["chemicalAnalyser"],
  //   queryFn: () =>
  //     queryClient.getQueryData(["chemicalAnalyser"]) as ChemicalAnalysisDTO,
  // });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </>
  );
}

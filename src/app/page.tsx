"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home/";

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

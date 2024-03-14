"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;

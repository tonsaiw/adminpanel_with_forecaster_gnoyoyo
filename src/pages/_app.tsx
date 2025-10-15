import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MachinesProvider } from "@/hooks/useMachines";
import "react-loading-skeleton/dist/skeleton.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <MachinesProvider>
        <Component {...pageProps} />
      </MachinesProvider>
    </QueryClientProvider>
  );
}

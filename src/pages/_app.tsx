import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MachinesProvider } from "@/hooks/useMachines";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MachinesProvider>
      <Component {...pageProps} />
    </MachinesProvider>
  );
}

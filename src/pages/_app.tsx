import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { query } from "../lib/query";
import { PopUpContextProvider } from "../contexts/PopUpContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PopUpContextProvider>
      <QueryClientProvider client={query}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </PopUpContextProvider>
  );
}

export default MyApp;

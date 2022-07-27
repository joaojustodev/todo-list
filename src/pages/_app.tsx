import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { query } from "../lib/query";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={query}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

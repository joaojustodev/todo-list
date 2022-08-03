import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { query } from "../lib/query";
import { PopUpContextProvider } from "../contexts/PopUpContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={query}>
        <PopUpContextProvider>
          <Component {...pageProps} />
        </PopUpContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;

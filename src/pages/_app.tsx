import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { query } from "../lib/query";
import { PopUpContextProvider } from "../contexts/PopUpContext";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={query}>
        <PopUpContextProvider>
          <Head>
            <title>TodoList - joaojustodev</title>
            <meta name="description" content="Todo list with NextJS" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
          </Head>
          <Component {...pageProps} />
        </PopUpContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;

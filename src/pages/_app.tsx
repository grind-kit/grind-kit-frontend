import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/layout/layout";
import { SessionProvider } from "next-auth/react";
import { Router } from "next/router";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {loading ? <h1>App is loading...</h1> : <Component {...pageProps} />}
      </Layout>
    </SessionProvider>
  );
}

export default App;

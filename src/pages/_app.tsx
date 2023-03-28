import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/layout/layout";
import { AuthContextProvider } from "@/context/AuthContext";
import { Router } from "next/router";
import Loading from "./loading";
import CookiePopup from "@/components/CookiePopup";
import { parseCookies } from "nookies";

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const cookies = parseCookies();

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
    <AuthContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <CookiePopup />
        {loading ? <Loading /> : <Component {...pageProps} />}
      </Layout>
    </AuthContextProvider>
  );
}

export default App;

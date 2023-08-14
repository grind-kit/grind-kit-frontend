import React, { useEffect } from "react";
import Head from "next/head";
import { auth } from "@/firebase/firebase";
import useLocale from "@/hooks/useLocale";

export default function Home() {
  const { strings } = useLocale();

  useEffect(() => {
    // After 1 hour has passed, refresh the token
    const interval = setInterval(() => {
      return handleNewToken();
    }, 60 * 60 * 1000);

    // Clear interval if the component is unmounted
    return () => clearInterval(interval);
  }, []);

  async function handleNewToken() {
    const user = auth.currentUser;
    if (!user) return;

    const idToken = await user.getIdToken();
    sessionStorage.setItem("idToken", idToken);
  }

  return (
    <div>
      <Head>
        <title>{strings.INDEX_TITLE}</title>
      </Head>
    </div>
  );
}

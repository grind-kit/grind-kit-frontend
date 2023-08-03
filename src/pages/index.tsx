import React, { useEffect } from "react";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import useLocale from "@/hooks/useLocale";

export default function Home() {
  const { strings } = useLocale();
  const { user } = useAuth();

  useEffect(() => {
    handleCookies();
  }, [user]);

  useEffect(() => {
    handleNewToken();

    const interval = setInterval(() => {
      handleNewToken();
      // Time: 1 hour
    }, 60 * 60 * 1000);

    // Clear interval if the component is unmounted
    return () => clearInterval(interval);
  }, []);

  async function handleNewToken() {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();
    document.cookie = `token=${token}; path=/`;
  }

  async function handleCookies() {
    if (!user || !user.uid) return;

    document.cookie = `uid=${user.uid}; path=/`;
  }

  return (
    <div>
      <Head>
        <title>{strings.INDEX_TITLE}</title>
      </Head>
    </div>
  );
}

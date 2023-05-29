import React, { useEffect } from "react";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import { User } from "@/api/api-client";
import * as strings from "@/locales/en/strings.json";

export default function Home() {
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
    
    else if (auth.currentUser) {
      const token = await auth.currentUser?.getIdToken();

      document.cookie = `token=${token}; path=/`;
      document.cookie = `uid=${user.uid}; path=/`;
      document.cookie = `authenticated=true; path=/`;

      const response = await User.getUserInfo(user.uid, token);

      // Remove this line later
      console.log(token, "✅");

      if (response && response.lodestone_id && response.id) {
        document.cookie = `lodestoneId=${response.lodestone_id}; path=/`;
        document.cookie = `id=${response.id}; path=/`;
      }
    }
  }

  return (
    <div>
      <Head>
        <title>{strings.INDEX_TITLE}</title>
      </Head>
    </div>
  );
}

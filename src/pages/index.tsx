import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import CookiePopup from "@/components/CookiePopup";

export default function Home() {
  const { user } = useAuth();
  const [token, setToken] = useState<string | undefined | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const res = await auth.currentUser?.getIdToken();
      setToken(res);
      document.cookie = `token=${token}; path=/`;
      document.cookie = `uid=${user.uid}; path=/`;
    };
    getToken();
  }, [user, token]);

  return (
    <div>
      <Head>
        <title>Grind Kit</title>
      </Head>
    </div>
  );
}

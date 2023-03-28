import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";

export default function Home() {
  const { user } = useAuth();
  const [token, setToken] = useState<string | undefined | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await auth.currentUser?.getIdToken();
      setToken(token);
      document.cookie = `token=${token}; path=/`;
      document.cookie = `uid=${user.uid}; path=/`;
    };
    getToken();
  }, [user]);

  return (
    <div>
      <Head>
        <title>Grind Kit</title>
      </Head>
    </div>
  );
}

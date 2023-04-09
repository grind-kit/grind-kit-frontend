import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import { User } from "@/pages/api/api-client";

export default function Home() {
  const { user } = useAuth();
  const [token, setToken] = useState<string | undefined | null>(null);
  const [lodestoneId, setLodestoneId] = useState<string | undefined | null>(
    null
  );

  useEffect(() => {
    const getTokenAndLodestoneId = async () => {
      if (auth.currentUser) {
        const token = await auth.currentUser?.getIdToken();
        setToken(token);
        document.cookie = `token=${token}; path=/`;
        document.cookie = `uid=${user.uid}; path=/`;
        document.cookie = `authenticated=true; path=/`;

        const res = await User.getUserInfo(user.uid, token);
        setLodestoneId(res.lodestone_id);
        document.cookie = `lodestoneId=${lodestoneId}; path=/`;
      }
    };
    getTokenAndLodestoneId();
  }, [user, token, lodestoneId]);

  return (
    <div>
      <Head>
        <title>Grind Kit</title>
      </Head>
    </div>
  );
}

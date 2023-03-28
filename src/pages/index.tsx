import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";

export default function Home() {
  const { user } = useAuth();
  const token = auth.currentUser?.getIdToken();

  useEffect(() => {
    document.cookie = `token=${token}; path=/`;
    document.cookie = `uid=${user.uid}; path=/`;
  }, [user, token]);

  return (
    <div>
      <Head>
        <title>Grind Kit</title>
      </Head>
    </div>
  );
}

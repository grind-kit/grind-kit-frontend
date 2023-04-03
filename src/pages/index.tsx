import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import { parseCookies } from "nookies";
import axios from "axios";
import { User } from "@/pages/api/api-client";

export default function Home({ initialResults }: any) {
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

  useEffect(() => {
    console.log(initialResults);
  }, [initialResults]);

  return (
    <div>
      <Head>
        <title>Grind Kit</title>
      </Head>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { uid, token } = parseCookies(context);
  const clientRes = await User.getUserInfo(uid, token);
  let arrayOfClassJobs = null;

  if (clientRes.lodestone_id !== null) {
    const handlerRes = await axios.get(
      `https://xivapi.com/character/${clientRes.lodestone_id}`
    );

    arrayOfClassJobs = handlerRes.data.Character.ClassJobs.slice(0, 19);
  }

  return {
    props: {
      initialResults: arrayOfClassJobs,
    },
  };
}

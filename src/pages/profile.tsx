// For component code
"use client";

import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Profile() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/signin");
    }
  }),
    [user];

  return (
    <div>
      <h1>You must log in to view this page.</h1>
    </div>
  );
}

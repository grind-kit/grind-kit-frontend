import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { parseCookies } from "nookies";
import useSWR from "swr";
const loadStrings = require("@/locales/en/strings");

const DashboardPage = () => {
  const strings = loadStrings;
  const { id, token, lodestoneId } = parseCookies();

  const characterDataFetcher = async (url: string) =>
    await fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    });

  const bookmarkDataFetcher = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Character data

  useSWR(`https://xivapi.com/character/${lodestoneId}`, characterDataFetcher, {
    refreshInterval: 60000, // fetch every 60 seconds
    dedupingInterval: 300000, // wait 5 minutes before fetching again
    revalidateOnFocus: false, // don't revalidate when the window is focused
    shouldRetryOnError: false, // don't retry on error
    errorRetryCount: 1, // retry once
    errorRetryInterval: 5000, // retry after 5 seconds
    compare: (prevData, newData) =>
      JSON.stringify(prevData) === JSON.stringify(newData),
    initialData: localStorage.getItem("characterData")
      ? JSON.parse(localStorage.getItem("characterData")!)
      : undefined,
    onSuccess: (data) => {
      localStorage.setItem("characterData", JSON.stringify(data));
    },
  });

  // Bookmarks

  useSWR(
    `${process.env.BACKEND_URL}/users/${id}/bookmarks`,
    bookmarkDataFetcher,
    {
      refreshInterval: 60000, // fetch every 60 seconds
      dedupingInterval: 300000, // wait 5 minutes before fetching again
      revalidateOnFocus: false, // don't revalidate when the window is focused
      shouldRetryOnError: false, // don't retry on error
      errorRetryCount: 1, // retry once
      errorRetryInterval: 5000, // retry after 5 seconds
      compare: (prevData, newData) =>
        JSON.stringify(prevData) === JSON.stringify(newData),
      initialData: localStorage.getItem("bookmarkData")
        ? JSON.parse(localStorage.getItem("bookmarkData")!)
        : undefined,
      onSuccess: (data) => {
        localStorage.setItem("bookmarkData", JSON.stringify(data));
      },
    }
  );

  // Delete this later

  console.log(localStorage.getItem("bookmarkData"));
  console.log(localStorage.getItem("characterData"));

  return (
    <ProtectedRoute>
      <div className="flex py-2 container mx-auto text-slate-900">
        <div className="px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-semibold">{strings.DASHBOARD_HEADER}</h2>
          {!lodestoneId ? (
            <div>
              <h3 className="text-1xl my-4">
                {strings.DASHBOARD_NO_CHARACTER_MESSAGE}
              </h3>
              <Link legacyBehavior href="/dashboard/settings">
                <a className="hover:underline">
                  {strings.DASHBOARD_NO_CHARACTER_BUTTON}
                </a>
              </Link>
            </div>
          ) : (
            <div>
              <h3 className="text-1xl my-4">
                {strings.DASHBOARD_CHARACTER_EXISTS_MESSAGE}
              </h3>
              <Link legacyBehavior href="/dashboard/settings">
                <a className="hover:underline">
                  {strings.DASHBOARD_CHARACTER_EXISTS_BUTTON}
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

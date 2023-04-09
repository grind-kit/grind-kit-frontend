import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { parseCookies } from "nookies";
import useSWR from "swr";

const DashboardPage = () => {
  const { lodestoneId } = parseCookies();

  const fetcher = async (url: string) =>
    await fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    });

  const { data, error } = useSWR(
    `https://xivapi.com/character/${lodestoneId}`,
    fetcher,
    {
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
    }
  );

  return (
    <ProtectedRoute>
      <div className="flex py-2 container mx-auto text-slate-900">
        <div className="px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-semibold">Character Stats</h2>
          {!lodestoneId ? (
            <div>
              <h3 className="text-1xl my-4">
                Your character has not been set up yet.
              </h3>
              <Link legacyBehavior href="/dashboard/settings">
                <a className="hover:underline">Settings</a>
              </Link>
            </div>
          ) : (
            <div>
              <h3 className="text-1xl my-4">Your character is set up.</h3>
              <Link legacyBehavior href="/dashboard/settings">
                <a className="hover:underline">Settings</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

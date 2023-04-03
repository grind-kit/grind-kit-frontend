import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { TDashboardProps } from "types/global";
import { parseCookies } from "nookies";
import axios from "axios";
import { User } from "@/pages/api/api-client";
import { useEffect } from "react";

const DashboardPage = ({ lodestoneId, arrayOfClassJobs }: TDashboardProps) => {
  useEffect(() => {
    console.log(arrayOfClassJobs);
  }, [arrayOfClassJobs]);

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
      lodestoneId: clientRes.lodestone_id,
      arrayOfClassJobs: arrayOfClassJobs,
    },
  };
}

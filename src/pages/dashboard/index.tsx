import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { User } from "@/pages/api/api-client";
import { parseCookies } from "nookies";
import { TDashboardProps } from "types/global";

const DashboardPage = ({ uid, lodestoneId }: TDashboardProps) => {
  return (
    <ProtectedRoute>
      <div className="flex py-2 container mx-auto text-slate-900">
        <div className="px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-semibold">Character Stats</h2>
          <p>Your uid is {uid}</p>
          <p>Your lodestone id is {lodestoneId}</p>
          <Link legacyBehavior href="/dashboard/settings">
            <a className="hover:underline">Character Settings</a>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

export async function getServerSideProps(context: any) {
  const { uid, token } = parseCookies(context);

  const res = await User.getUserInfo(uid, token);

  console.log(res);

  return {
    props: {
      uid: res.username,
      lodestoneId: res.lodestone_id,
    },
  };
}

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { TDashboardProps } from "types/global";

const DashboardPage = ({ lodestoneId }: TDashboardProps) => {
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

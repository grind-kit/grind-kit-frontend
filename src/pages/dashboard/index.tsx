import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="flex py-2 container mx-auto text-slate-900">
        <div className="px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-semibold">Character Stats</h2>
          <Link legacyBehavior href="/dashboard/settings">
            <a className="hover:underline">Character Settings</a>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

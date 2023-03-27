import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { User } from "@/pages/api/api-client";
import axios from "axios";
import { auth } from "@/firebase/firebase";

const DashboardPage = () => {
  const user = auth.currentUser;
  console.log(user);
  console.log(user?.getIdToken);

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

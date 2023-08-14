import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import useLocale from "@/hooks/useLocale";
import { User } from "@/api/api-client";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { strings } = useLocale();
  const [lodestoneId, setLodestoneId] = useState(null);

  useEffect(() => {
    handleLodestoneId();
  }, []);

  async function handleLodestoneId() {
    let lodestoneId = null;

    // Get the user's ID token and user ID from session storage
    const idToken = sessionStorage.getItem("idToken");
    const userId = Number(sessionStorage.getItem("userId"));

    // Initialize data to be sent to our API
    const userData = {
      userId: userId,
    };

    const response = await User.retrieve(userData, idToken);

    // If the user has a Lodestone ID, store it in a variable
    if (response?.lodestone_id) {
      lodestoneId = response.lodestone_id;
      setLodestoneId(lodestoneId);
    }

    return;
  }

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
}

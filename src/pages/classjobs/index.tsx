import React, { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleAccordion from "@/components/RoleAccordion";
import getData from "@/data";
import { useRouter } from "next/router";
import useLocale from "@/hooks/useLocale";
import { parseCookies } from "nookies";

function ClassJobsPage() {
  const { strings } = useLocale();
  const data = localStorage.getItem("characterData");
  const { lodestoneId } = parseCookies();
  const { arrayOfRoles } = getData();
  const router = useRouter();

  useEffect(() => {
    if (!data || !lodestoneId) {
      router.push("/dashboard");
    }
  }, [data, router, lodestoneId]);

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {strings.START_HEADER}
        </h2>
        {arrayOfRoles?.map((role) => {
          return <RoleAccordion key={role.roleId} {...role} />;
        })}
      </div>
    </ProtectedRoute>
  );
}

export default ClassJobsPage;

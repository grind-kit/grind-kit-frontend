import React, { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleAccordion from "@/components/RoleAccordion";
import getData from "@/data";
import { useRouter } from "next/router";
import useLocale from "@/hooks/useLocale";

function ClassJobsPage() {
  const { strings } = useLocale();
  const data = localStorage.getItem("characterData");
  const { arrayOfRoles } = getData();
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      router.push("/dashboard");
    }
  }, [data, router]);

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

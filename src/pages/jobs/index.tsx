import React, { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleAccordion from "@/components/RoleAccordion";
import getData from "@/data";
import { useRouter } from "next/router";

export default function JobsPage() {
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
        <h1 className="text-3xl font-bold text-slate-900">Choose a Job</h1>
        {arrayOfRoles?.map((role) => {
          return <RoleAccordion key={role.roleId} {...role} />;
        })}
      </div>
    </ProtectedRoute>
  );
}

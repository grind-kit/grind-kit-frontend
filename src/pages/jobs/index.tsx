import React, { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { RoleAccordion } from "@/components/Accordion";
import getData from "@/data";

export default function JobsPage() {
  const data = localStorage.getItem("characterData");
  const parsedData = JSON.parse(data!);
  const { roleData } = getData();

  useEffect(() => {
    if (!data) {
      window.location.href = "/dashboard";
    }
    console.log(parsedData);
  }, [data]);

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900">Choose a Job</h1>
        {roleData.map((role) => {
          return <RoleAccordion key={role.roleId} {...role} />;
        })}
      </div>
    </ProtectedRoute>
  );
}

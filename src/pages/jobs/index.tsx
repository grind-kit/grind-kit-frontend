import React, { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { RoleAccordion } from "@/components/Accordion";
import { roleData } from "@/data";
import { parseCookies } from "nookies";
import { Character } from "@/pages/api/api-handler";
import useSWR from "swr";

export default function JobsPage() {
  const { lodestoneId } = parseCookies();
  
  useEffect(() => {
    console.log(lodestoneId);
  }, [lodestoneId]);

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

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { RoleAccordion } from "@/components/Accordion";
import { roleData } from "@/data";

export default function Jobs() {
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

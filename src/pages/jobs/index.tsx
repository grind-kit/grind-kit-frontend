import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { RoleAccordion } from "@/components/Accordion";
import { roleData } from "@/data";
import { parseCookies } from "nookies";
import axios from "axios";
import { User } from "@/pages/api/api-client";
import { TClassJob } from "types/global";

export default function JobsPage(arrayOfClassJobs: TClassJob) {
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

export async function getServerSideProps(context: any) {
  const { uid, token } = parseCookies(context);
  const clientRes = await User.getUserInfo(uid, token);
  let arrayOfClassJobs = null;

  if (clientRes.lodestone_id !== null) {
    const handlerRes = await axios.get(
      `https://xivapi.com/character/${clientRes.lodestone_id}`
    );

    arrayOfClassJobs = handlerRes.data.Character.ClassJobs.slice(0, 19);
  }

  console.log(arrayOfClassJobs);

  return {
    props: {
      arrayOfClassJobs: arrayOfClassJobs,
    },
  };
}

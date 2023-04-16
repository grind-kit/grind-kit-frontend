import React from "react";
import { ContentFinderCondition } from "@/pages/api/api-handler";
import InstanceContentResultsList from "@/components/InstanceContentResultsList";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TDungeonPageProps } from "types/global";
import { parseCookies } from "nookies";
import { IGetServerSidePropsContext } from "types/global";

export default function DungeonsPage({ results }: TDungeonPageProps) {
  const instanceContentType = "dungeons";
  
  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Recommended Dungeons
        </h1>
        <InstanceContentResultsList
          results={results}
          instanceContentType={instanceContentType}
        />
      </div>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async (context: IGetServerSidePropsContext) => {
  const { level } = context.query;
  const parsedLevel = Number(level);
  const { token } = parseCookies(context);

  const response = await ContentFinderCondition.getContentFinderConditionList(
    parsedLevel,
    token
  );

  return {
    props: {
      results: response?.data,
    },
  };
};

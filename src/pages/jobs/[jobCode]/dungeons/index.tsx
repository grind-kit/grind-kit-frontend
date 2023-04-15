import React from "react";
import { ContentFinderCondition } from "@/pages/api/api-handler";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TDungeonListPageProps } from "types/global";
import { DungeonList } from "@/components/List";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function Dungeons({ results }: TDungeonListPageProps) {
  const contentType = "dungeons";
  const router = useRouter();
  const { jobCode } = router.query;

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Recommended Dungeons
        </h1>
        <DungeonList
          results={results}
          contentType={contentType}
          jobCode={jobCode}
        />
      </div>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async (context: any) => {
  let parsedLevel = 50;
  const { token } = parseCookies(context);

  // Implement item level required later
  const response = await ContentFinderCondition.getContentFinderConditionList(
    parsedLevel,
    token
  );

  console.log(response?.data, "🤞")

  return {
    props: {
      results: response?.data,
    },
  };
};

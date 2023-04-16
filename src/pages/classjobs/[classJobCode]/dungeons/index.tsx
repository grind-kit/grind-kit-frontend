import React from "react";
import { ContentFinderCondition } from "@/pages/api/api-client";
import InstanceContentResultsList from "@/components/InstanceContentResultsList";
import { TContentFinderCondition } from "types/global";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TInstanceContentPageProps } from "types/global";
import { parseCookies } from "nookies";
import { IGetServerSidePropsContext } from "types/global";

export default function DungeonsPage({
  arrayOfContentFinderConditions,
}: TInstanceContentPageProps) {
  const instanceContentType = "dungeons";

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Recommended Dungeons
        </h1>
        {arrayOfContentFinderConditions
          ?.sort((a, b) => b.classJobLevelRequired - a.classJobLevelRequired)
          .map((contentFinderCondition: TContentFinderCondition) => {
            return (
              <InstanceContentResultsList
                key={contentFinderCondition.id}
                contentFinderCondition={contentFinderCondition}
                instanceContentType={instanceContentType}
              />
            );
          })}
      </div>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async (
  context: IGetServerSidePropsContext
) => {
  const { level } = context.query;
  const parsedLevel = Number(level);
  const { token } = parseCookies(context);
  let response;

  if (level && token) {
    response = await ContentFinderCondition.getContentFinderConditionList(
      parsedLevel,
      token
    );
  }

  return {
    props: {
      arrayOfContentFinderConditions: response,
    },
  };
};

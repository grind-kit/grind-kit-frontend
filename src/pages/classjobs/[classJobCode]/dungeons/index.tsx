import React from "react";
import { ContentFinderCondition } from "@/api/api-client";
import InstanceContentResultsList from "@/components/InstanceContentResultsList";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  TContentFinderCondition,
  TInstanceContentPageProps,
  IGetServerSidePropsContext,
} from "types/global";
import { parseCookies } from "nookies";
const loadStrings = require("@/locales/en/strings");

export default function DungeonsPage({
  arrayOfContentFinderConditions,
}: TInstanceContentPageProps) {
  const strings = loadStrings;
  const instanceContentType = strings.DUNGEONS_CONTENT_TYPE;

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900">
          {strings.DUNGEONS_HEADER}
        </h1>
        {/* Convert this to a modular function */}
        {arrayOfContentFinderConditions
          ?.sort((a, b) => b.itemLevelRequired - a.itemLevelRequired)
          .slice(0, 4)
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
  const { level, contentTypeId } = context.query;
  const parsedLevel = Number(level);
  const { token } = parseCookies(context);
  let response = null;

  if (level && token && response === null) {
    response = await ContentFinderCondition.getContentFinderConditionList(
      parsedLevel,
      contentTypeId,
      token
    );
  }

  return {
    props: {
      arrayOfContentFinderConditions: response,
    },
  };
};

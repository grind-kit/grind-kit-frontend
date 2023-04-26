import React from "react";
import { ClientContentFinderCondition } from "@/api/api-client";
import InstanceContentResultsList from "@/components/InstanceContentResultsList";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  TContentFinderCondition,
  TInstanceContentPageProps,
  IGetServerSidePropsContext,
} from "types/global";
import { parseCookies } from "nookies";

export default function InstanceContentTypePage({
  arrayOfContentFinderConditions,
  instanceContentTypeHeader,
  instanceContentType,
}: TInstanceContentPageProps) {
  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900">
          {instanceContentTypeHeader}
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
  const loadStrings = require("@/locales/en/strings");
  const strings = loadStrings;
  const { level, contentTypeId } = context.query;
  const parsedLevel = Number(level);
  const { token } = parseCookies(context);

  let response;
  let instanceContentType;
  let instanceContentTypeHeader;

  response =
    level && token
      ? await ClientContentFinderCondition.getClientContentFinderConditionList(
          parsedLevel,
          contentTypeId,
          token
        )
      : null;

  switch (contentTypeId) {
    default:
      instanceContentTypeHeader = "";
      instanceContentType = "";
      break;
    case "2":
      instanceContentTypeHeader = strings.DUNGEONS_HEADER;
      instanceContentType = strings.DUNGEONS_CONTENT_TYPE;
      break;
    case "4":
      instanceContentTypeHeader = strings.TRIALS_HEADER;
      instanceContentType = strings.TRIALS_CONTENT_TYPE;
      break;
    case "5":
      instanceContentTypeHeader = strings.RAIDS_HEADER;
      instanceContentType = strings.RAIDS_CONTENT_TYPE;
      break;
  }

  return {
    props: {
      arrayOfContentFinderConditions: response,
      instanceContentTypeHeader,
      instanceContentType,
    },
  };
};
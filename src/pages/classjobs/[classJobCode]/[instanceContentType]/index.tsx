import React from "react";
import { ClientContentFinderCondition } from "@/api/api-client";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  TInstanceContentPageProps,
  IGetServerSidePropsContext,
} from "types/global";
import { parseCookies } from "nookies";
import ContentSorter from "@/components/ContentSorter";
const loadStrings = require("@/locales/en/strings");

export default function InstanceContentTypePage({
  arrayOfContentFinderConditions,
  instanceContentTypeHeader,
  instanceContentType,
}: TInstanceContentPageProps) {
  const strings = loadStrings;

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        {arrayOfContentFinderConditions ? (
          <>
            <h2 className="text-3xl font-bold text-slate-900">
              {instanceContentTypeHeader}
            </h2>
            <ContentSorter
              arrayOfContentFinderConditions={arrayOfContentFinderConditions}
              instanceContentType={instanceContentType}
            />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-slate-900">
              {strings.MIN_LEVEL_HEADER}
            </h1>
            <p className="text-slate-900 mt-5">{strings.MIN_LEVEL_MESSAGE}</p>
          </>
        )}
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

  if (parsedLevel < 90 && token) {
    response =
      await ClientContentFinderCondition.getClientContentFinderConditionList(
        parsedLevel,
        contentTypeId,
        token
      );
  }

  if (typeof response === "undefined") response = null;

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

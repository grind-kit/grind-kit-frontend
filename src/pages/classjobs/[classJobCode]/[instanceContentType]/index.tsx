import React from "react";
import { ClientContentFinderCondition } from "@/api/api-client";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  TInstanceContentPageProps,
  IGetServerSidePropsContext,
} from "types/global";
import { parseCookies } from "nookies";
import ContentSorter from "@/components/ContentSorter";
import * as strings from "@/locales/en/strings.json";

export default function InstanceContentTypePage({
  arrayOfContentFinderConditions,
  instanceContentTypeHeader,
  instanceContentType,
}: TInstanceContentPageProps) {
  const header: string = arrayOfContentFinderConditions ? instanceContentTypeHeader : strings.MIN_LEVEL_HEADER;

  return (
    <ProtectedRoute>
      <section className="w-full flex flex-col items-center text-slate-900">
        <header>
          <h2 className="text-3xl font-bold">
            {header}
          </h2>
        </header>
        {arrayOfContentFinderConditions ? (
            <ContentSorter
              arrayOfContentFinderConditions={arrayOfContentFinderConditions}
              instanceContentType={instanceContentType}
            />
        ) : (
            <p className="mt-5">{strings.MIN_LEVEL_MESSAGE}</p>
        )}
      </section>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async (
  context: IGetServerSidePropsContext
) => {
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

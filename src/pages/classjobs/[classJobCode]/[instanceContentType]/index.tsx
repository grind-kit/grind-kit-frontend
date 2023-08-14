import React, { useState, useEffect } from "react";
import { ClientContentFinderCondition } from "@/api/api-client";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  TInstanceContentPageProps,
  IGetServerSidePropsContext,
  TContentFinderCondition,
} from "types/global";
import ContentSorter from "@/components/ContentSorter";
import useLocale from "@/hooks/useLocale";
import en from "@/resources/locales/en";

export default function InstanceContentTypePage({
  level,
  contentTypeId,
  instanceContentTypeHeader,
  instanceContentType,
}: TInstanceContentPageProps) {
  const [arrayOfContentFinderConditions, setArrayOfContentFinderConditions] =
    useState<TContentFinderCondition[] | null>(null);
  const { strings } = useLocale();
  const header: string = arrayOfContentFinderConditions
    ? instanceContentTypeHeader
    : strings.MIN_LEVEL_HEADER;

  useEffect(() => {
    handleContentFinderConditions();
  }, []);

  async function handleContentFinderConditions() {
    const idToken = sessionStorage.getItem("idToken");

    const response =
      await ClientContentFinderCondition.getClientContentFinderConditionList(
        level,
        contentTypeId,
        idToken
      );

    if (response) {
      setArrayOfContentFinderConditions(response);
    }
  }

  return (
    <ProtectedRoute>
      <section className="w-full flex flex-col items-center text-slate-900">
        <header>
          <h2 className="text-3xl font-bold">{header}</h2>
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
  const getLocaleData = () => {
    const strings = en;
    return { strings };
  };
  const { strings } = getLocaleData();
  const { level, contentTypeId } = context.query;

  let instanceContentType = null;
  let instanceContentTypeHeader = null;

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
      level,
      contentTypeId,
      instanceContentTypeHeader,
      instanceContentType,
    },
  };
};

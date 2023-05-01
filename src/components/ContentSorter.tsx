import React from "react";
import { TContentFinderCondition } from "types/global";
import InstanceContentResultsList from "@/components/InstanceContentResultsList";
import { TContentSorterProps } from "types/global";

// Sorts the content finder conditions by item level required and returns the first 4 in O(n log n) time complexity

function ContentSorter({
  arrayOfContentFinderConditions,
  instanceContentType,
}: TContentSorterProps) {
  function renderContentFinderConditions(
    arrayOfContentFinderConditions: TContentFinderCondition[] | null
  ) {
    return arrayOfContentFinderConditions
      ?.sort((a: TContentFinderCondition, b: TContentFinderCondition) => {
        return b.itemLevelRequired - a.itemLevelRequired;
      })
      .slice(0, 4)
      .map((contentFinderCondition: TContentFinderCondition) => {
        return renderInstanceContentResultsList(
          contentFinderCondition,
          instanceContentType
        );
      });
  }

  function renderInstanceContentResultsList(
    contentFinderCondition: TContentFinderCondition,
    instanceContentType: string
  ) {
    return (
      <InstanceContentResultsList
        key={contentFinderCondition.id}
        contentFinderCondition={contentFinderCondition}
        instanceContentType={instanceContentType}
      />
    );
  }

  return <>{renderContentFinderConditions(arrayOfContentFinderConditions)}</>;
}

export default ContentSorter;

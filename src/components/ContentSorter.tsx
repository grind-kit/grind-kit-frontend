import React from "react";
import { TContentFinderCondition } from "types/global";
import InstanceContentResultsList from "@/components/InstanceContentResultsList";
import { TContentSorterProps } from "types/global";

function ContentSorter({
  arrayOfContentFinderConditions,
  instanceContentType,
}: TContentSorterProps) {
  return (
    <>
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
    </>
  );
}

export default ContentSorter;

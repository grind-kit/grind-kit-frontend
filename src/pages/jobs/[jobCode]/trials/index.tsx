import React, { useState } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TDungeonList, TDungeonListPageProps } from "types/global";
import { DungeonList } from "@/components/List";
import { useRouter } from "next/router";

export default function Trials({ initialResults }: TDungeonListPageProps) {
  const [results, setResults] = useState<Array<TDungeonList>>(initialResults);
  const contentType = "trials";

  const router = useRouter();
  const { jobCode } = router.query;

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Recommended Trials
        </h1>
        <DungeonList
          results={results}
          jobCode={jobCode}
          contentType={contentType}
        />
      </div>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async () => {
  // Trials are less common than dungeons, so the minLevel is 5 levels lower
  const maxLevel = 55;
  const minLevel = maxLevel - 5;
  // Change this to get trials for a specific level
  // Implement item level required later
  const res = await axios.get(
    `https://xivapi.com/search?private_key=${process.env.XIVAPI_KEY}&filters=ContentFinderCondition.ClassJobLevelRequired<=${maxLevel},ContentFinderCondition.ClassJobLevelRequired>=${minLevel},InstanceClearExp>0,InstanceClearGil>0,ContentType.ID=4&columns=ID,Name,InstanceClearExp,InstanceClearGil,ContentFinderCondition.ClassJobLevelRequired,ContentType.ID&language=en`
  );

  return {
    props: {
      initialResults: res.data.Results,
    },
  };
};

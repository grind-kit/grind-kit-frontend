import React, { useState } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TDungeonList, TDungeonListPageProps } from "types/global";
import { DungeonList } from "@/components/List";
import { useRouter } from "next/router";

export default function Dungeons({ initialResults }: TDungeonListPageProps) {
  const [results, setResults] = useState<Array<TDungeonList>>(initialResults);
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
          jobCode={jobCode}
          contentType={contentType}
        />
      </div>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async ({ query }: any) => {
  const { level } = query;
  const minLevel = level - 2;

  // Implement item level required later
  const res = await axios.get(
    `https://xivapi.com/InstanceContent?private_key=${process.env.XIVAPI_KEY}&filters=ContentFinderCondition.ClassJobLevelRequired<=${level},ContentFinderCondition.ClassJobLevelRequired>=${minLevel},InstanceClearExp>0,InstanceClearGil>0&columns=ID,Name,InstanceClearExp,InstanceClearGil,ContentFinderCondition.ClassJobLevelRequired&language=en`
  );

  return {
    props: {
      initialResults: res.data.Results,
    },
  };
};

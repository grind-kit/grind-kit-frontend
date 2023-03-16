import React, { useState } from "react";
import axios from "axios";
import { TDungeonList } from "types/global";
import DungeonList from "@/components/List";
import { useRouter } from "next/router";

type TProps = {
  initialResults: Array<TDungeonList>;
};

export default function Dungeons({ initialResults }: TProps) {
  const [results, setResults] =
    useState<Array<TDungeonList>>(initialResults);

  const router = useRouter();
  const { jobCode } = router.query;

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-slate-900">Dungeons</h1>
      <DungeonList results={results} jobCode={jobCode} />
    </div>
  );
}

export async function getServerSideProps() {
  const maxLevel = 55;
  const minLevel = maxLevel - 2;
  // Change this to get dungeons for a specific level
  // Implement item level required later
  const res = await axios.get(
    `https://xivapi.com/search?private_key=${process.env.XIVAPI_KEY}&filters=ContentFinderCondition.ClassJobLevelRequired<=${maxLevel},ContentFinderCondition.ClassJobLevelRequired>=${minLevel},InstanceClearExp>0,InstanceClearGil>0&columns=ID,Name,InstanceClearExp,InstanceClearGil,ContentFinderCondition.ClassJobLevelRequired&language=en`
  );

  return {
    props: {
      initialResults: res.data.Results,
    },
  };
}

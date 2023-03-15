import React, { useState } from "react";
import axios from "axios";
import { TPagination, TInstanceContentResults } from "types/global";
import List from "@/components/DungeonList";

type TProps = {
  level: number;
  initialResults: Array<TInstanceContentResults>;
  initialPagination: TPagination;
};

export default function Dungeons({
  level,
  initialResults,
  initialPagination,
}: TProps) {
  const [results, setResults] =
    useState<Array<TInstanceContentResults>>(initialResults);
  const [currentPage, setCurrentPage] = useState<number>(
    initialPagination.Page
  );

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-slate-900">Dungeons</h1>
      <List results={results} />
    </div>
  );
}

export async function getServerSideProps() {
  // Change this to get dungeons for a specific level
  // Implement item level required later
  const res = await axios.get(
    `https://xivapi.com/search?private_key=${
      process.env.XIVAPI_KEY
    }&filters=ContentFinderCondition.ClassJobLevelRequired<=${50},InstanceClearExp>0,InstanceClearGil>0&columns=ID,Name,InstanceClearExp,InstanceClearGil,ContentFinderCondition.ClassJobLevelRequired&language=en`
  );

  return {
    props: {
      initialResults: res.data.Results,
      initialPagination: res.data.Pagination,
    },
  };
}

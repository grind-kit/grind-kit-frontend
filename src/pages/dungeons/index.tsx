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
  const res = await axios.get(
    // Rate limit is set to 86 due to current MSQ level
    `https://xivapi.com/InstanceContent?private_key=${process.env.XIVAPI_KEY}&limit=86&columns=ID,Name,ContentFinderCondition.ClassJobLevelRequired,InstanceClearExp,InstanceClearGil`
  );

  return {
    props: {
      initialResults: res.data.Results,
      initialPagination: res.data.Pagination,
    },
  };
}

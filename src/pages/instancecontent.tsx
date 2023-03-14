import React, { useState } from "react";
import axios from "axios";
import { TPagination } from "types/global";

type TResults = {
  ContentFinderCondition: {
    ClassJobLevelRequired: number;
  };
  ID: number;
  InstanceClearExp: number;
  InstanceClearGil: number;
  Icon: string;
  Name: string;
  Url: string;
};

type TInstancesProps = {
  level: number;
  initialResults: Array<TResults>;
  initialPagination: TPagination;
};

export default function InstanceContent({
  level,
  initialResults,
  initialPagination,
}: TInstancesProps) {
  const [results, setResults] = useState<Array<TResults>>(initialResults);
  const [currentPage, setCurrentPage] = useState<number>(
    initialPagination.Page
  );

  return (
    <div className="w-full flex flex-col items-center font-bold text-slate-900">
      <h1 className="text-3xl font-bold">Dungeons</h1>
      {results
        .filter(
          (instance) =>
            // Replace 50 with the level variable later
            instance.ContentFinderCondition.ClassJobLevelRequired <= 50
        )
        .sort(
          (a, b) =>
            b.ContentFinderCondition.ClassJobLevelRequired -
            a.ContentFinderCondition.ClassJobLevelRequired
        )
        .map((instance) => (
          <div
            key={instance.ID}
            className="w-full bg-gray-200 rounded-md mt-5 p-4 text-transform: capitalize"
          >
            <div className="flex flex-row items-center justify-between text-2xl">
              <p>{instance.Name}</p>
              <ul className="flex flex-row">
                <li>EXP: {instance.InstanceClearExp}</li>
                <li className="ml-5">Gil: {instance.InstanceClearGil}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    `https://xivapi.com/InstanceContent?private_key=${process.env.XIVAPI_KEY}&columns=ID,Name,ContentFinderCondition.ClassJobLevelRequired,InstanceClearExp,InstanceClearGil`
  );

  return {
    props: {
      initialResults: res.data.Results,
      initialPagination: res.data.Pagination,
    },
  };
}

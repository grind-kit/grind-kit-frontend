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
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold">Dungeons</h1>
      <ul>
        {results
          .filter(
            (instance) =>
              instance.ContentFinderCondition.ClassJobLevelRequired <= 50
          )
          .map((instance) => (
            <li className="text-transform: capitalize" key={instance.ID}>
              {instance.Name}
            </li>
          ))}
      </ul>
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

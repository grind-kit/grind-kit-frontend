import React, { useState } from "react";

export default function Play() {
  const [job, setJob] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const arrayOfJobs = [
    {
      type: "tank",
      className: "bg-blue-600 hover:bg-blue-700",
      data: [
        {
          id: 0,
          name: "paladin",
        },
        {
          id: 1,
          name: "warrior",
        },
        {
          id: 2,
          name: "dark knight",
        },
        {
          id: 3,
          name: "gunbreaker",
        },
      ],
    },
    {
      type: "healer",
      className: "bg-green-600 hover:bg-green-700",
      data: [
        {
          id: 0,
          name: "white mage",
        },
        {
          id: 1,
          name: "scholar",
        },
        {
          id: 2,
          name: "astrologian",
        },
        {
          id: 3,
          name: "sage",
        },
      ],
    },
    {
      type: "melee DPS",
      className: "bg-red-600 hover:bg-red-700",
      data: [
        {
          id: 0,
          name: "monk",
        },
        {
          id: 1,
          name: "dragoon",
        },
        {
          id: 2,
          name: "ninja",
        },
        {
          id: 3,
          name: "samurai",
        },
        {
          id: 4,
          name: "reaper",
        },
      ],
    },
    {
      type: "physical ranged DPS",
      className: "bg-red-600 hover:bg-red-700",
      data: [
        {
          id: 0,
          name: "bard",
        },
        {
          id: 1,
          name: "machinist",
        },
        {
          id: 2,
          name: "dancer",
        },
      ],
    },
    {
      type: "magical ranged DPS",
      className: "bg-red-600 hover:bg-red-700",
      data: [
        {
          id: 0,
          name: "black mage",
        },
        {
          id: 1,
          name: "summoner",
        },
        {
          id: 2,
          name: "red mage",
        },
      ],
    },
  ];

  return (
    <div className="w-2/3 flex flex-col items-center">
      <h1 className="mb-5 text-3xl font-bold">Choose a Job</h1>
      {arrayOfJobs.map((job) => (
        <>
          <div
            onClick={() => setSelectedType(job.type)}
            className={`${job.className} hover:cursor-pointer rounded-md mb-5 w-full flex flex-row items-center justify-between p-3`}
          >
            <div className="font-bold text-white text-2xl text-transform: capitalize">
              {job.type}
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
          <div>
            {selectedType === job.type && (
              <div className="flex flex-col w-full">
                {job.data.map((job) => (
                  <div>{job.name}</div>
                ))}
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
}

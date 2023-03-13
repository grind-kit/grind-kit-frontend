import React from "react";
import Accordion from "@/components/Accordion";

export default function Play() {
  const tanks = {
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
  };
  const healers = {
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
  };

  const meleeDPS = {
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
  };

  const physicalRangedDPS = {
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
  };

  const magicalRangedDPS = {
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
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="mb-5 text-3xl font-bold">Choose a Job</h1>
      <Accordion {...tanks} />
      <Accordion {...healers} />
      <Accordion {...meleeDPS} />
      <Accordion {...physicalRangedDPS} />
      <Accordion {...magicalRangedDPS} />
    </div>
  );
}

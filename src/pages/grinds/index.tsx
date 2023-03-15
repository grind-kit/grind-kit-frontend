import React, { useState } from "react";
import Accordion from "@/components/Accordion";

export default function Grind() {
  const [level, setLevel] = useState<number | null>(null);

  const tanks = {
    type: "tank",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
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
    bg: "bg-green-600",
    hover: "hover:bg-green-700",
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
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
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
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
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
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
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
      <h1 className="text-3xl font-bold text-slate-900">Choose a Job</h1>
      <Accordion {...tanks} setLevel={setLevel} />
      <Accordion {...healers} setLevel={setLevel} />
      <Accordion {...meleeDPS} setLevel={setLevel} />
      <Accordion {...physicalRangedDPS} setLevel={setLevel} />
      <Accordion {...magicalRangedDPS} setLevel={setLevel} />
    </div>
  );
}

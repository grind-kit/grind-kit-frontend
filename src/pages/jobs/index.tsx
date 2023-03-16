import React, { useState } from "react";
import Accordion from "@/components/Accordion";

export default function Jobs() {
  const [level, setLevel] = useState<number | null>(null);

  const tanks = {
    type: "tank",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    data: [
      {
        id: 0,
        name: "paladin",
        jobCode: "pld",
      },
      {
        id: 1,
        name: "warrior",
        jobCode: "war",
      },
      {
        id: 2,
        name: "dark knight",
        jobCode: "drk",
      },
      {
        id: 3,
        name: "gunbreaker",
        jobCode: "gnb",
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
        jobCode: "whm",
      },
      {
        id: 1,
        name: "scholar",
        jobCode: "sch",
      },
      {
        id: 2,
        name: "astrologian",
        jobCode: "ast",
      },
      {
        id: 3,
        name: "sage",
        jobCode: "sge",
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
        jobCode: "mnk",
      },
      {
        id: 1,
        name: "dragoon",
        jobCode: "drg",
      },
      {
        id: 2,
        name: "ninja",
        jobCode: "nin",
      },
      {
        id: 3,
        name: "samurai",
        jobCode: "sam",
      },
      {
        id: 4,
        name: "reaper",
        jobCode: "rpr",
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
        jobCode: "brd",
      },
      {
        id: 1,
        name: "machinist",
        jobCode: "mch",
      },
      {
        id: 2,
        name: "dancer",
        jobCode: "dnc",
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
        jobCode: "blm"
      },
      {
        id: 1,
        name: "summoner",
        jobCode: "smn",
      },
      {
        id: 2,
        name: "red mage",
        jobCode: "rdm",
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

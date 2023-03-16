import React, { useState } from "react";
import Accordion from "@/components/Accordion";

export default function Jobs() {
  const [level, setLevel] = useState<number | null>(null);



  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-slate-900">Choose a Job</h1>
      {/* <Accordion {...tanks} /> */}
      {/* <Accordion {...healers} />
      <Accordion {...meleeDPS} />
      <Accordion {...physicalRangedDPS} />
      <Accordion {...magicalRangedDPS} /> */}
    </div>
  );
}
import { useState } from "react";

type AccordionProps = {
  type: string;
  className: string;
  data: Array<{
    id: number;
    name: string;
  }>;
  setSelectedJob: Function;
};

export default function Accordion({
  type,
  className,
  data,
  setSelectedJob,
}: AccordionProps) {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const handleIsShowing = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div
      className={`${className} w-full hover:cursor-pointer rounded-md mt-5 p-4 font-bold text-white text-transform: capitalize`}
    >
      <div
        onClick={() => handleIsShowing()}
        className={"flex flex-row items-center justify-between text-2xl"}
      >
        {type}
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
      {isShowing && (
        <div className="w-full text-xl flex flex-col">
          {data.map((job) => (
            <div
              key={job.id}
              onClick={setSelectedJob(job.name)}
              className="flex flex-row mt-5 items-center justify-between"
            >
              <div>{job.name}</div>
              <div>Level: 0</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

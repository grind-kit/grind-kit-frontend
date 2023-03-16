import { useState } from "react";
import { useRouter } from "next/router";

type TProps = {
  type: string;
  bg: string;
  hover: string;
  data: Array<{
    id: number;
    name: string;
    jobCode: string;
  }>;
  setLevel: Function;
};

export default function Accordion({ type, bg, hover, data, setLevel }: TProps) {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const handleIsShowing = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div
      className={`${bg} w-full rounded-md mt-5 p-4 font-bold text-white text-transform: capitalize`}
    >
      <div className="flex flex-row items-center justify-between text-2xl">
        {type}
        <button onClick={() => handleIsShowing()}>
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      {isShowing && (
        <div className="w-full text-xl flex flex-col">
          {data.map((job) => (
            <div
              key={job.id}
              onClick={() => router.push(`/jobs/${job.jobCode}`)}
              className={`${hover} hover:cursor-pointer p-2 rounded-md flex flex-row mt-5 items-center justify-between`}
            >
              <div>{job.name}</div>
              <div>Your Level: 0</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useRouter } from "next/router";
import { TRoleAccordionProps } from "types/global";

export function RoleAccordion({
  roleId,
  type,
  bg,
  hover,
  data,
}: TRoleAccordionProps) {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const handleIsShowing = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div
      key={roleId}
      className={`${bg} w-full rounded-md mt-5 p-4 font-bold text-white text-transform: capitalize`}
    >
      <div className="flex flex-row items-center justify-between text-2xl">
        {type}
        <button onClick={() => handleIsShowing()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      {isShowing && (
        <div className="w-full text-xl flex flex-col">
          {data.map((job) => (
            <div
              key={job.jobId}
              onClick={() => router.push(`/jobs/${job.jobCode}`)}
              className={`${hover} hover:cursor-pointer p-2 rounded-md flex flex-row mt-5 items-center justify-between`}
            >
              <div>
                <p>{job.name}</p>
              </div>
              <div>
                <p>Level: {job.level}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

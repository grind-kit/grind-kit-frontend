import { useState } from "react";
import { useRouter } from "next/router";
import { TRoleAccordionProps } from "types/global";

type TRoleAccordionToggleProps = {
  isShowingClassJobs: boolean;
  onClick: () => void;
};

function RoleAccordionToggle({
  isShowingClassJobs,
  onClick,
}: TRoleAccordionToggleProps) {
  return (
    <button onClick={onClick}>
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
  );
}

export function RoleAccordion({
  // Takes in data as props to display the accordion depending on the type of role
  roleId,
  type,
  bg,
  hover,
  data,
}: TRoleAccordionProps) {
  const router = useRouter();
  const [isShowingClassJobs, setIsShowingClassJobs] = useState<boolean>(false);

  const handleIsShowing = () => {
    setIsShowingClassJobs(!isShowingClassJobs);
  };

  const handleClassJobClick = (classJob: {
    jobId: number;
    jobCode: string;
    level: number;
    name: string;
  }) => {
    router.push({
      pathname: `/jobs/${classJob.jobCode}`,
      // Pass in the level as a query for the filter
      query: { level: classJob.level },
    });
  };

  return (
    <div
      key={roleId}
      className={`${bg} w-full rounded-md mt-5 p-4 font-bold text-white text-transform: capitalize`}
    >
      <div className="flex flex-row items-center justify-between text-2xl">
        {type}
        <RoleAccordionToggle
          isShowingClassJobs={isShowingClassJobs}
          onClick={handleIsShowing}
        />
      </div>
      {isShowingClassJobs && (
        <div className="w-full text-xl flex flex-col">
          {data.map((classJob) => (
            <div
              key={classJob.jobId}
              onClick={() => handleClassJobClick(classJob)}
              className={`${hover} hover:cursor-pointer p-2 rounded-md flex flex-row mt-5 items-center justify-between`}
            >
              <div>
                <p>{classJob.name}</p>
              </div>
              <div>
                <p>Lv. {classJob.level}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useRouter } from "next/router";
import { TRoleAccordionProps, TRoleData } from "types/global";

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
      {isShowingClassJobs ? (
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
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  );
}

function RoleAccordion({
  // Takes in data as props to display the accordion depending on the type of role
  roleType,
  bg,
  hover,
  roleData,
}: TRoleAccordionProps) {
  const router = useRouter();
  const [isShowingClassJobs, setIsShowingClassJobs] = useState<boolean>(false);

  const handleIsShowing = () => {
    setIsShowingClassJobs(!isShowingClassJobs);
  };

  const handleClassJobClick = (classJob: TRoleData) => {
    router.push({
      pathname: `/classjobs/${classJob.classJobCode}`,
      // Pass in the level as a query for the filter
      query: { level: classJob.classJobLevel },
    });
  };

  return (
    <div
      className={`${bg} w-full rounded-md mt-5 p-4 font-bold text-white text-transform: capitalize`}
    >
      <div className="flex flex-row items-center justify-between text-2xl">
        {roleType}
        <RoleAccordionToggle
          isShowingClassJobs={isShowingClassJobs}
          onClick={handleIsShowing}
        />
      </div>
      {isShowingClassJobs && (
        <div className="w-full text-xl flex flex-col">
          {roleData.map((classJob: TRoleData) => (
            <div
              key={classJob.classJobId}
              onClick={() => handleClassJobClick(classJob)}
              className={`${hover} hover:cursor-pointer p-2 rounded-md flex flex-row mt-5 items-center justify-between`}
            >
              <div>
                <p>{classJob.classJobName}</p>
              </div>
              <div>
                <p>Lv. {classJob.classJobLevel}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoleAccordion;

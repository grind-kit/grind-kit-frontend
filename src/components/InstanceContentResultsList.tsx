import { TInstanceContentResultsListProps } from "types/global";
import { useRouter } from "next/router";

function InstanceContentResultsList({
  contentFinderCondition: {
    id,
    name,
    classJobLevelRequired,
    itemLevelRequired,
    url,
    contentTypeId,
    acceptClassJobCategory,
  },
  instanceContentType,
}: TInstanceContentResultsListProps) {
  const router = useRouter();
  const { level, classJobCode } = router.query;

  const handleInstanceContentResultClick = () => {
    router.push({
      pathname: `/classjobs/${classJobCode}/${instanceContentType}/${id}`,
      // Pass in the level as a query for the filter
      query: { level: level, contentTypeId: contentTypeId },
    });
  };

  return (
    <div className="w-full flex flex-col items-center font-bold text-slate-900">
      <div
        className="w-full hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md mt-5 p-4 text-transform: capitalize"
        onClick={handleInstanceContentResultClick}
      >
        <div className="flex flex-row items-center justify-between text-2xl">
          <p>{name}</p>
          <ul className="flex flex-row">
            <li className="ml">Lvl. {classJobLevelRequired}</li>
            <li className="ml-5">iLvl. {itemLevelRequired}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InstanceContentResultsList;

import { TInstanceContentResultsListProps } from "types/global";
import { useRouter } from "next/router";

function InstanceContentResultsList({
  results,
  instanceContentType,
}: TInstanceContentResultsListProps) {
  const router = useRouter();
  const { classJobCode } = router.query;

  return (
    <div className="w-full flex flex-col items-center font-bold text-slate-900">
      {results
        .sort((a, b) => b.class_job_level_required - a.class_job_level_required)
        .map((instance) => (
          <div
            key={instance.id}
            className="w-full hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md mt-5 p-4 text-transform: capitalize"
            onClick={() =>
              router.push(
                `/classjobs/${classJobCode}/${instanceContentType}/${instance.id}`
              )
            }
          >
            <div className="flex flex-row items-center justify-between text-2xl">
              <p>{instance.name}</p>
              <ul className="flex flex-row">
                <li className="ml">Lvl. {instance.class_job_level_required}</li>
                <li className="ml-5">iLvl. {instance.item_level_required}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
}

export default InstanceContentResultsList;

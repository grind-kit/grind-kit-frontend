import { TInstanceContentResultsListProps } from "types/global";
import { useRouter } from "next/router";

function InstanceContentResultsList({
  id,
  name,
  class_job_level_required,
  item_level_required,
  instanceContentType,
}: TInstanceContentResultsListProps) {
  const router = useRouter();
  const { level, classJobCode } = router.query;

  return (
    <div className="w-full flex flex-col items-center font-bold text-slate-900">
      <div
        className="w-full hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md mt-5 p-4 text-transform: capitalize"
        onClick={() =>
          router.push(`/classjobs/${classJobCode}/${instanceContentType}/${id}`)
        }
      >
        <div className="flex flex-row items-center justify-between text-2xl">
          <p>{name}</p>
          <ul className="flex flex-row">
            <li className="ml">Lvl. {class_job_level_required}</li>
            <li className="ml-5">iLvl. {item_level_required}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InstanceContentResultsList;

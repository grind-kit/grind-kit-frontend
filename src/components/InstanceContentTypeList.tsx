import { useRouter } from "next/router";
import { TInstanceContentTypeListProps } from "types/global";

function InstanceContentTypeList({
  // Takes in data as props to display the list depending on the type of instance content
  instanceContentType,
  classJobCode,
}: TInstanceContentTypeListProps) {
  const router = useRouter();
  const { level } = router.query;

  const handleInstanceContentTypeClick = () => {
    router.push({
      pathname: `/classjobs/${classJobCode}/${instanceContentType}`,
      // Pass in the level as a query for the filter
      query: { level: level },
    });
  };

  return (
    <div className="w-full flex flex-col items-center font-bold text-slate-900">
      <div
        className="w-full hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md mt-5 p-4 text-transform: capitalize"
        onClick={handleInstanceContentTypeClick}
      >
        <div className="flex flex-row items-center justify-between text-2xl">
          <p>{instanceContentType}</p>
        </div>
      </div>
    </div>
  );
}

export default InstanceContentTypeList;

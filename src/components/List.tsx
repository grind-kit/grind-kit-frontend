import { useRouter } from "next/router";
import { TDungeonListProps, TContentListProps } from "types/global";
import getData from "@/data";

export function ContentList({ jobCode }: TContentListProps) {
  const router = useRouter();
  const { contentData } = getData();

  return (
    <div className="w-full flex flex-col items-center font-bold text-slate-900">
      {contentData.map((content) => (
        <div
          key={content.contentId}
          className="w-full hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md mt-5 p-4 text-transform: capitalize"
          onClick={() => router.push(`/jobs/${jobCode}/${content.href}`)}
        >
          <div className="flex flex-row items-center justify-between text-2xl">
            <p>{content.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DungeonList({
  results,
  contentType,
  jobCode,
}: TDungeonListProps) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center font-bold text-slate-900">
      {results
        .sort(
          (a, b) =>
            b.ClassJobLevelRequired -
            a.ClassJobLevelRequired
        )
        .map((instance) => (
          <div
            key={instance.ID}
            className="w-full hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md mt-5 p-4 text-transform: capitalize"
            onClick={() =>
              router.push(`/jobs/${jobCode}/${contentType}/${instance.ID}`)
            }
          >
            <div className="flex flex-row items-center justify-between text-2xl">
              <p>{instance.Name}</p>
              <ul className="flex flex-row">
                <li className="ml">Lvl. {instance.ClassJobLevelRequired}</li>
                <li className="ml-5">iLvl. {instance.ItemLevelRequired}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
}

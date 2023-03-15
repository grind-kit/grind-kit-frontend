import { useRouter } from "next/router";
import { TInstanceContentResults } from "types/global";

type TProps = {
  results: Array<TInstanceContentResults>;
};

export default function List({ results }: TProps) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center font-bold text-slate-900">
      {results
        .sort(
          (a, b) =>
            b.ContentFinderCondition.ClassJobLevelRequired -
            a.ContentFinderCondition.ClassJobLevelRequired
        )
        .map((instance) => (
          <div
            key={instance.ID}
            className="w-full hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md mt-5 p-4 text-transform: capitalize"
            onClick={() => router.push(`/dungeons/${instance.ID}`)}
          >
            <div className="flex flex-row items-center justify-between text-2xl">
              <p>{instance.Name}</p>
              <ul className="flex flex-row">
                <li className="ml">EXP: {instance.InstanceClearExp}</li>
                <li className="ml-5">Gil: {instance.InstanceClearGil}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
}

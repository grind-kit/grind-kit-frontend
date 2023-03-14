import { TInstanceContentResults } from "types/global";

type TProps = {
  results: Array<TInstanceContentResults>;
};

export default function List({ results }: TProps) {
  return (
    <div className="w-full flex flex-col items-center font-bold text-slate-900">
      {results
        .filter(
          (instance) =>
            // Replace 50 with the level variable later
            instance.ContentFinderCondition.ClassJobLevelRequired <= 50 &&
            instance.Name &&
            instance.InstanceClearExp > 0
        )
        .sort(
          (a, b) =>
            b.ContentFinderCondition.ClassJobLevelRequired -
            a.ContentFinderCondition.ClassJobLevelRequired
        )
        .map((instance) => (
          <div
            key={instance.ID}
            className="w-full hover:cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md mt-5 p-4 text-transform: capitalize"
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

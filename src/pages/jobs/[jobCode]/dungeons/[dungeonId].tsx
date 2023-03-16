import { useRouter } from "next/router";
import axios from "axios";
import { TDungeonId } from "types/global";

type TDungeonIdProps = {
  initialResults: TDungeonId;
};

export default function DungeonId({ initialResults }: TDungeonIdProps) {
  const router = useRouter();
  const { dungeonId } = router.query;
  return (
    <div>
      <p>Dungeon #{dungeonId}</p>
      <p>Name: {initialResults.Name}</p>
      <p>Description: {initialResults.Description}</p>
      <p>
        Minimum Level:{" "}
        {initialResults.ContentFinderCondition.ClassJobLevelRequired}
      </p>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.dungeonId;
  const res = await axios.get(
    `https://xivapi.com/InstanceContent/${id}?private_key=${process.env.XIVAPI_KEY}&language=en&columns=Name,Description,Banner,InstanceClearExp,InstanceClearGil,ContentType.IconHD,ItemLevelRequired,ContentFinderCondition.ClassJobLevelRequired`
  );

  return {
    props: {
      initialResults: res.data,
    },
  };
}

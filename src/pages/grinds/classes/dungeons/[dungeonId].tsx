import { useRouter } from "next/router";
import { TPagination } from "types/global";
import axios from "axios";

type TResults = {
  Name: string;
  Description: string;
  Banner: string;
  InstanceClearExp: number;
  InstanceClearGil: number;
  ContentType: {
    IconHD: string;
  };
  ItemLevelRequired: number;
};

type TProps = {
  initialResults: TResults;
  initialPagination: TPagination;
};

export default function DungeonPage({ initialResults }: TProps) {
  const router = useRouter();
  const { dungeonId } = router.query;
  return (
    <div>
      <p>Dungeon #{dungeonId}</p>
      <p>Name: {initialResults.Name}</p>
      <p>Description {initialResults.Description}</p>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.dungeonId;
  const res = await axios.get(
    `https://xivapi.com/InstanceContent/${id}?private_key=${process.env.XIVAPI_KEY}&language=en&columns=Name,Description,Banner,InstanceClearExp,InstanceClearGil,ContentType.IconHD,ItemLevelRequired`
  );

  return {
    props: {
      initialResults: res.data,
      initialPagination: res.data.Pagination,
    },
  };
}

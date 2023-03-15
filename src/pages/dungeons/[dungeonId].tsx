import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";

const DungeonPage: NextPage = () => {
  const router = useRouter();
  const { dungeonId } = router.query;
  return <h1>This is Dungeon {dungeonId}</h1>;
};

export default DungeonPage;

export async function getServerSideProps(context: any) {
  const id = context.query.dungeonId;
  const res = await axios.get(`https://xivapi.com/InstanceContent/${id}`);

  console.log(res);

  return {
    props: {
      initialResults: res.data.Results,
    },
  };
}

import { NextPage } from "next";
import { useRouter } from "next/router";

const DungeonPage: NextPage = () => {
  const router = useRouter();
  const { dungeonId } = router.query;
  
  return <h1>This is Dungeon {dungeonId}</h1>;
};

export default DungeonPage;

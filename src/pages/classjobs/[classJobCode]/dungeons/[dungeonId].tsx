import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Dungeon } from "@/pages/api/api-handler";

export default function DungeonId({ initialResults }: any) {
  const router = useRouter();
  const { dungeonId } = router.query;
  return (
    <ProtectedRoute>
      <div>
        <p>Dungeon #{dungeonId}</p>
        <p>Name: {initialResults.Name}</p>
        <p>Description: {initialResults.Description}</p>
        <p>
          Minimum Level:{" "}
          {initialResults.ContentFinderCondition.ClassJobLevelRequired}
        </p>
      </div>
    </ProtectedRoute>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.dungeonId;

  const fetchedData = await Dungeon.getDungeonInfo(id);

  return {
    props: {
      initialResults: fetchedData,
    },
  };
};

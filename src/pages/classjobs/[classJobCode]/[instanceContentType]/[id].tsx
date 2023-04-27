import { HandlerContentFinderCondition } from "@/api/api-handler";
import ProtectedRoute from "@/components/ProtectedRoute";
import { GetServerSideProps } from "next";
import { IGetServerSidePropsContext } from "types/global";

export default function IdPage({ arrayOfContentFinderConditionDetails }: any) {
  return (
    <ProtectedRoute>
      <div>
        <p>Test</p>
      </div>
    </ProtectedRoute>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: IGetServerSidePropsContext
) => {
  const id = context.query.id;
  const parsedId = Number(id);

  const response =
    await HandlerContentFinderCondition.getHandlerContentFinderConditionDetails(
      parsedId
    );

  console.log(response);

  return {
    props: {
      arrayOfContentFinderConditionDetails: response,
    },
  };
};

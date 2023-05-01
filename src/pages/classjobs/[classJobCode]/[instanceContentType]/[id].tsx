import { HandlerContentFinderCondition } from "@/api/api-handler";
import ProtectedRoute from "@/components/ProtectedRoute";
import { GetServerSideProps } from "next";
import { IGetServerSidePropsContext } from "types/global";
const loadStrings = require("@/locales/en/strings");

export default function IdPage({ arrayOfContentFinderConditionDetails }: any) {
  const strings = loadStrings;

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {strings.DETAILS_HEADER}
        </h2>
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

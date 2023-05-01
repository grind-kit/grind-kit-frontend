import { HandlerContentFinderCondition } from "@/api/api-handler";
import ProtectedRoute from "@/components/ProtectedRoute";
import { GetServerSideProps } from "next";
import { IGetServerSidePropsContext } from "types/global";
const loadStrings = require("@/locales/en/strings");

export default function IdPage({
  arrayOfContentFinderConditionDetails,
  imageSrc,
}: any) {
  const strings = loadStrings;

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {strings.DETAILS_HEADER}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col">
            <h3 className="capitalize text-2xl font-bold text-slate-900">
              {arrayOfContentFinderConditionDetails.Name}
            </h3>
            <img src={imageSrc}></img>
            <p className="text-slate-900">
              {arrayOfContentFinderConditionDetails.Description}
            </p>
          </div>
          <div>02</div>
        </div>
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

  const imageSrc = `${process.env.XIVAPI_URL}` + response.Image;

  console.log(imageSrc);

  return {
    props: {
      arrayOfContentFinderConditionDetails: response,
      imageSrc,
    },
  };
};

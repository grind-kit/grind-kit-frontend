import { HandlerContentFinderCondition } from "@/api/api-handler";
import ProtectedRoute from "@/components/ProtectedRoute";
import { GetServerSideProps } from "next";
import { IGetServerSidePropsContext } from "types/global";
import { TIdPage } from "types/global";
const loadStrings = require("@/locales/en/strings");

export default function IdPage({
  id,
  icon,
  name,
  description,
  image,
}: TIdPage) {
  const strings = loadStrings;

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {strings.DETAILS_HEADER}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="w-full flex flex-col bg-gray-200 p-4 rounded-md">
            <div className="flex flex-row justify-center">
              <img src={icon} />
              <h3 className="ml-5 capitalize text-2xl font-bold text-slate-900">
                {name}
              </h3>
            </div>
            <img className="mt-5" src={image} />
            <p className="mt-5 text-slate-900 leading-relaxed">{description}</p>
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
  let response = null;
  let iconSrc = null;
  let imageSrc = null;

  response =
    await HandlerContentFinderCondition.getHandlerContentFinderConditionDetails(
      parsedId
    );

  if (response) {
    imageSrc = `${process.env.XIVAPI_URL}` + response.Image;
    iconSrc = `${process.env.XIVAPI_URL}` + response.ContentType.Icon;
  } else if (typeof response === "undefined") response = null;

  console.log(response);

  return {
    props: {
      id: response.ID,
      icon: iconSrc,
      name: response.Name,
      description: response.Description,
      image: imageSrc,
    },
  };
};

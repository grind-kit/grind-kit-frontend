import { HandlerContentFinderCondition } from "@/api/api-handler";
import ProtectedRoute from "@/components/ProtectedRoute";
import { GetServerSideProps } from "next";
import { IGetServerSidePropsContext } from "types/global";
import { TIdPage } from "types/global";
import Image from "next/image";
const loadStrings = require("@/locales/en/strings");

export default function IdPage({
  id,
  icon,
  name,
  description,
  banner,
}: TIdPage) {
  const strings = loadStrings;

  function handleImage(src: string) {
    return `${process.env.XIVAPI_URL}` + src;
  }

  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {strings.DETAILS_HEADER}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="w-full flex flex-col bg-gray-200 p-4 rounded-md">
            <div className="flex flex-row justify-center gap-5">
              <Image
                src={handleImage(icon)}
                alt="The icon for the instance content type"
                width={32}
                height={32}
              />
              <h3 className="capitalize text-2xl font-bold text-slate-900">
                {name}
              </h3>
            </div>
            <Image
              className="mt-5 mx-auto"
              src={handleImage(banner)}
              alt="The banner image for the instance content"
              width={376}
              height={120}
            />
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

  response =
    await HandlerContentFinderCondition.getHandlerContentFinderConditionDetails(
      parsedId
    );

  if (typeof response === "undefined") response = null;

  // Set cache-control header for images
  context.res.setHeader("Cache-Control", "public, max-age=86400");

  console.log(response);

  return {
    props: {
      id: response.ID,
      icon: response.ContentType.Icon,
      name: response.Name,
      description: response.Description,
      banner: response.Image,
    },
  };
};

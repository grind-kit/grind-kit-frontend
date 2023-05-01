import { HandlerContentFinderCondition } from "@/api/api-handler";
import ProtectedRoute from "@/components/ProtectedRoute";
import { GetServerSideProps } from "next";
import { IGetServerSidePropsContext } from "types/global";
import { TIdPage } from "types/global";
import Image from "next/image";
const loadStrings = require("@/locales/en/strings");

export default function IdPage({
  id,
  typeName,
  typeIcon,
  name,
  description,
  banner,
  classJobLevel,
  itemLevel,
  regionIcon,
  regionName,
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
            <span className="text-slate-900 uppercase font-bold tracking-wide text-center">
              {typeName}
            </span>
            <div className="flex flex-row justify-center gap-5 mt-5">
              <Image
                src={handleImage(typeIcon)}
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
            <div className="mt-5 grid grid-cols-2 grid-rows-2">
              <h4 className="text-slate-900 text-xl uppercase font-bold tracking-wide">
                {strings.DETAILS_REQUIREMENTS_LABEL}
              </h4>
              <div className="flex flex-row gap-3">
                <span className="text-slate-900 capitalize font-bold tracking-wide">
                  {strings.DETAILS_LEVEL_LABEL} {classJobLevel}
                </span>
                <span className="text-slate-900 capitalize font-bold tracking-wide">
                  {strings.DETAILS_ILVL_LABEL} {itemLevel}
                </span>
              </div>
              <h4 className="text-slate-900 text-xl uppercase font-bold tracking-wide">
                {strings.DETAILS_LOCATION_LABEL}
              </h4>
              <div className="flex flex-row gap-3">
                <Image
                  src={handleImage(regionIcon)}
                  alt="The icon for the region the instance content is located in"
                  width={32}
                  height={32}
                />
                <span className="text-slate-900 capitalize font-bold tracking-wide">
                  {regionName}
                </span>
              </div>
            </div>
            <span className="text-slate-900 uppercase font-bold tracking-wide mt-5 text-center">
              {strings.DETAILS_DESCRIPTION_LABEL}
            </span>
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

  if (response) {
    // Set cache-control header for images
    context.res.setHeader("Cache-Control", "public, max-age=86400");
  } else if (typeof response === "undefined") response = null;

  console.log(response);

  return {
    props: {
      id: response.ID,
      typeName: response.ContentType.Name,
      typeIcon: response.ContentType.Icon,
      name: response.Name,
      description: response.Description,
      banner: response.Image,
      classJobLevel: response.ClassJobLevelRequired,
      itemLevel: response.ItemLevelRequired,
      regionIcon: response.TerritoryType.Map.PlaceNameRegion.Icon,
      regionName: response.TerritoryType.Map.PlaceNameRegion.Name,
    },
  };
};

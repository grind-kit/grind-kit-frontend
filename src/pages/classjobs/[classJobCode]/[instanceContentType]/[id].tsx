import { HandlerContentFinderCondition } from "@/api/api-handler";
import ProtectedRoute from "@/components/ProtectedRoute";
import { GetServerSideProps } from "next";
import { IGetServerSidePropsContext } from "types/global";
import { TIdPage } from "types/global";
import Image from "next/image";
import { Bookmark } from "@/api/api-client";
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

  function handleImage(src: string): string {
    return `${process.env.XIVAPI_URL}` + src;
  }

  return (
    <ProtectedRoute>
      <table className="text-slate-900">
        <thead className="w-full flex flex-col items-center">
          <tr>
            <th colSpan={2}>
              <h2 className="text-3xl font-bold">{strings.DETAILS_HEADER}</h2>
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          <tr className="mt-5 grid grid-cols-2 gap-5">
            <td className="flex flex-col bg-gray-200 p-4 rounded-md shadow-md">
              <header className="flex flex-col items-center font-bold">
                <h3 className="uppercase tracking-wide">{typeName}</h3>
                <div className="flex flex-row justify-center gap-5 mt-5">
                  <Image
                    src={handleImage(typeIcon)}
                    alt="The categorical icon for the instance content type"
                    width={32}
                    height={32}
                  />
                  <h4 className="capitalize text-2xl">{name}</h4>
                </div>
              </header>
              <Image
                className="mt-5 mx-auto"
                src={handleImage(banner)}
                alt="The banner image for the instance content"
                width={376}
                height={120}
              />

              <section className="mt-5 flex flex-col items-center">
                <h5 className="text-xl uppercase font-bold tracking-wide">
                  {strings.DETAILS_REQUIREMENTS_LABEL}
                </h5>
                <span className="capitalize font-bold tracking-wide">
                  {strings.DETAILS_LEVEL_LABEL + classJobLevel}
                </span>
                <span className="capitalize font-bold tracking-wide">
                  {strings.DETAILS_ILVL_LABEL + itemLevel}
                </span>
                <h5 className="mt-5 text-xl uppercase font-bold tracking-wide">
                  {strings.DETAILS_LOCATION_LABEL}
                </h5>
                <div className="flex items-center">
                  <Image
                    src={handleImage(regionIcon)}
                    alt="The icon for the region the instance content is located in"
                    width={32}
                    height={32}
                  />
                  <span className="capitalize font-bold tracking-wide">
                    {regionName}
                  </span>
                </div>
              </section>

              <section className="mt-5 flex flex-col items-center">
                <h3 className="uppercase font-bold tracking-wide">
                  {strings.DETAILS_DESCRIPTION_LABEL}
                </h3>
                <p className="mt-5 leading-relaxed">{description}</p>
              </section>
            </td>

            <td className="flex flex-col bg-gray-200 p-4 rounded-md shadow-md">
              <header className="flex flex-col items-center font-bold">
                <h3 className="tracking-wide uppercase">
                  {strings.DETAILS_INTERACT_LABEL}
                </h3>
              </header>

              <section className="mt-5 flex flex-col items-center">
                <Bookmark contentFinderConditionId={id} />
              </section>
            </td>
          </tr>
        </tbody>
      </table>
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

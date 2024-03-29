import React, { useEffect, useState } from "react";
import { HandlerContentFinderCondition } from "@/api/api-handler";
import ProtectedRoute from "@/components/ProtectedRoute";
import { GetServerSideProps } from "next";
import { IGetServerSidePropsContext } from "types/global";
import { TIdPage, TBookmarkData } from "types/global";
import Image from "next/image";
import BookmarkIcon from "@/components/BookmarkIcon";
import { InstanceContentBookmark } from "@/api/api-client";
import useLocale from "@/hooks/useLocale";
import axios from "axios";

export default function IdPage({
  instanceContentId,
  typeId,
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
  const { strings } = useLocale();
  const [bookmarkData, setBookmarkData] = useState<TBookmarkData | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    fetchBookmarkData(instanceContentId);
  }, []);

  function handleImage(src: string): string {
    const url: string | undefined = process.env.XIVAPI_URL;

    if (url) return url + src;

    return "";
  }

  async function handleBookmarkClick() {
    const idToken: string | null = await sessionStorage.getItem("idToken");
    const userId: string | null = await sessionStorage.getItem("userId");
    const parsedUserId = Number(userId);
    let response = null;

    if (!bookmarkData) {
      response = await InstanceContentBookmark.postBookmark(
        parsedUserId,
        idToken,
        typeId,
        instanceContentId
      );

      setBookmarked(true); // Update bookmarked state when bookmark is created
    } else if (bookmarkData.value === 0) {
      response = await InstanceContentBookmark.patchBookmark(
        parsedUserId,
        idToken,
        bookmarkData.id,
        1
      );
      setBookmarked(true); // Update bookmarked state when bookmark is updated
    } else if (bookmarkData.value === 1) {
      response = await InstanceContentBookmark.patchBookmark(
        parsedUserId,
        idToken,
        bookmarkData.id,
        0
      );
      setBookmarked(false); // Update bookmarked state when bookmark is updated
    }

    setBookmarkData(response); // Update bookmark data state when bookmark is created
    return;
  }

  async function fetchBookmarkData(id: number) {
    const idToken: string | null = await sessionStorage.getItem("idToken");
    const userId: string | null = await sessionStorage.getItem("userId");

    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/conditions/${id}/bookmarks`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    if (response) {
      const filteredBookmarkData = response.data.filter((bookmark: TBookmarkData) => {
        return bookmark.user_id === Number(userId);
      });

      if (filteredBookmarkData.length > 0) {
        setBookmarkData(filteredBookmarkData[0]);
        setBookmarked(filteredBookmarkData[0].value === 1);
      }

      return;
    }
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
                <BookmarkIcon
                  bookmarked={bookmarked}
                  bookmarkData={bookmarkData}
                  handleBookmarkClick={handleBookmarkClick}
                />
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

  return {
    props: {
      instanceContentId: response.ID,
      typeId: response.ContentType.ID,
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

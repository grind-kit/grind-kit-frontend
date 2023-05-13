import { InstanceContentBookmark } from "@/api/api-client";
import { parseCookies } from "nookies";

type TBookmarkIconProps = {
  contentTypeId: number;
  contentFinderConditionId: number;
};

export default function BookmarkIcon({
  contentTypeId,
  contentFinderConditionId,
}: TBookmarkIconProps) {
  async function handleBookmark() {
    const { id, token } = parseCookies();
    const parsedId = Number(id);

    const response = await InstanceContentBookmark.postBookmark(
      parsedId,
      token,
      contentTypeId,
      contentFinderConditionId
    );
    return response;
  }

  return <button onClick={handleBookmark}>Bookmark</button>;
}

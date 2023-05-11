import { Bookmark } from "@/api/api-client";
import { parseCookies } from "nookies";

type TBookmarkIconProps = {
    contentTypeId: number;
    contentFinderConditionId: number;
}

export default function BookmarkIcon({
  contentTypeId,
  contentFinderConditionId,
}: TBookmarkIconProps) {
  const cookies = parseCookies();

  async function handleBookmark() {
    const { id, token } = parseCookies();
    const parsedId = Number(id);

    await Bookmark.postBookmark(parsedId, token, contentTypeId, contentFinderConditionId);
  }

  return <span>Test</span>;
}

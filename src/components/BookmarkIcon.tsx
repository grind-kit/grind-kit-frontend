import { InstanceContentBookmark } from "@/api/api-client";
import { parseCookies } from "nookies";
import { TBookmarkData } from "types/global";

type TBookmarkIconProps = {
  bookmarkData: TBookmarkData | null;
  contentTypeId: number;
  contentFinderConditionId: number;
};

export default function BookmarkIcon({
  bookmarkData,
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

  return (
    <>
      {!bookmarkData || bookmarkData.value === 0 ? (
        <button
          onClick={handleBookmark}
          className="flex gap-x-1.5 bg-orange-500 hover:bg-orange-700 transition-all px-4 py-2 font-bold text-white rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 inline-block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>

          <span className="inline">Bookmark</span>
        </button>
      ) : (
        <button
          onClick={handleBookmark}
          className="flex gap-x-1.5 bg-orange-700 transition-all px-4 py-2 font-bold text-white rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 inline-block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>

          <span className="inline">Bookmarked</span>
        </button>
      )}
    </>
  );
}
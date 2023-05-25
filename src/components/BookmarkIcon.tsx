import { TBookmarkData } from "types/global";
const loadStrings = require("@/locales/en/strings");

type TBookmarkIconProps = {
  bookmarked: boolean;
  bookmarkData: TBookmarkData | null;
  handleBookmarkClick: Function;
};

export default function BookmarkIcon({
  bookmarked,
  handleBookmarkClick,
}: TBookmarkIconProps) {
  const strings = loadStrings;

  return (
    <button
      onClick={() => handleBookmarkClick()}
      className={
        bookmarked === false
          ? "flex gap-x-1.5 outline outline-1 outline-orange-500 transition-all px-4 py-2 font-bold text-orange-500 rounded-full"
          : "flex gap-x-1.5 outline outline-1 bg-orange-500 outline-orange-500 transition-all px-4 py-2 font-bold text-white rounded-full"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={bookmarked === false ? "none" : "currentColor"}
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
      <span className="inline">
        {bookmarked === false ? strings.SAVE_BUTTON : strings.SAVED_BUTTON}
      </span>
    </button>
  );
}

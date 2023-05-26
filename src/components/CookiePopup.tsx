import React, { useState } from "react";
import * as strings from "@/locales/en/strings.json";

function CookiePopup() {
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const acceptCookies = () => {
    setShowPopup(false);
    setAcceptedCookies(true);

    // Age of the cookie is 1 year
    document.cookie = "cookies_accepted=true; path=/; max-age=31536000";
  };

  const hasAcceptedCookies =
    // If the index of the cookie is greater than -1 or if accepted is true, then the cookie has been accepted
    document.cookie.indexOf("cookies_accepted=true") > -1 || acceptedCookies;

  if (hasAcceptedCookies) {
    return null;
  }

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative max-w-screen-md mx-auto w-full p-6 bg-white rounded-md flex gap-3 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between">
            <div className="w-full">
              <p className="text-slate-900">{strings.COOKIES_POPUP_MESSAGE}</p>
              <a
                href="#"
                className="text-blue-500 hover:underline whitespace-nowrap"
              >
                {strings.COOKIES_POPUP_LINK}
              </a>
            </div>
            <div className="flex gap-4 items-center flex-shrink-0">
              <button
                className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 px-5 py-2 text-white rounded-md hover:bg-blue-400 focus:outline-none"
                onClick={acceptCookies}
              >
                {strings.COOKIES_POPUP_BUTTON}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookiePopup;

import React, { useState } from "react";

const CookiePopup = () => {
  const [accepted, setAccepted] = useState(false);
  const [show, setShow] = useState(true);

  const acceptCookies = () => {
    setShow(false);
    setAccepted(true);
    document.cookie = "cookies_accepted=true; path=/; max-age=31536000";
  };

  const hasAcceptedCookies =
    document.cookie.indexOf("cookies_accepted=true") > -1 || accepted;

  if (hasAcceptedCookies) {
    return null;
  }

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative max-w-screen-md mx-auto w-full p-6 bg-white rounded-md flex gap-3 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between">
            <div className="w-full">
              <p className="text-slate-900">
                This website uses cookies to ensure you get the best experience
                on our website.
              </p>
              <a
                href="#"
                className="text-blue-500 hover:underline whitespace-nowrap"
              >
                Privacy Policy
              </a>
            </div>
            <div className="flex gap-4 items-center flex-shrink-0">
              <button
                className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 px-5 py-2 text-white rounded-md hover:bg-blue-400 focus:outline-none"
                onClick={acceptCookies}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiePopup;

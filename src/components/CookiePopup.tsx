import React, { useState } from "react";

const CookiePopup = () => {
  const [accepted, setAccepted] = useState(false);

  const acceptCookies = () => {
    setAccepted(true);
    document.cookie = "cookies_accepted=true; path=/; max-age=31536000";
  };

  const hasAcceptedCookies =
    document.cookie.indexOf("cookies_accepted=true") > -1 || accepted;

  if (hasAcceptedCookies) {
    return null;
  }

  return (
    <div className="cookie-popup">
      <p>
        We use cookies to ensure that we give you the best experience on our
        website. By continuing to use our website, you consent to our use of
        cookies.
      </p>
      <button onClick={acceptCookies}>Accept</button>
    </div>
  );
};

export default CookiePopup;

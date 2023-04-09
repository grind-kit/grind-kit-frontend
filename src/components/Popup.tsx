import React, { useEffect } from "react";
import "@/styles/globals.css";

type TChangesSavedPopupProps = {
  isVisible: boolean;
  setIsVisible: Function;
};

export default function ChangesSavedPopup({
  isVisible,
  setIsVisible,
}: TChangesSavedPopupProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div className={`popup ${isVisible === true ? `show` : ""}`}>
      <p>Changes saved! May take up to 5 minutes to take effect.</p>
    </div>
  );
}

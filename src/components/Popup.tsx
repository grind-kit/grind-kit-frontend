import React, { useEffect } from "react";

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
  }, [isVisible, setIsVisible]);

  return (
    <div
      className={`fixed bottom-20 left-10 bg-slate-900 bg-opacity-75 text-white p-4 rounded-lg shadow-md opacity-0 transition-opacity duration-200 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p>Changes saved! Please log in again to view the updated information.</p>
    </div>
  );
}

import React, { useEffect } from "react";

type TPopupModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};

function PopupModal({ isVisible, setIsVisible, message }: TPopupModalProps) {
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
      <span>{message}</span>
    </div>
  );
}

export default PopupModal;

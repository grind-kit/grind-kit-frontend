import { useState } from "react";

type AccordionProps = {
  type: string;
  className: string;
  data: Array<{
    id: number;
    name: string;
  }>;
};

export default function Accordion(props: AccordionProps) {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const handleIsShowing = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div
      onClick={() => handleIsShowing()}
      className={`${props.className} w-2/3 hover:cursor-pointer rounded-md mb-5 flex flex-row items-center justify-between p-3 font-bold text-white text-2xl text-transform: capitalize`}
    >
      {props.type}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  );
}

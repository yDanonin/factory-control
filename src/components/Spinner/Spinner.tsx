import React from "react";

type Props = {
  message?: string;
  visible: boolean;
};
const Spinner: React.FC<Props> = ({ message, visible }) => {
  if (!visible) return <></>;

  return (
    <div className="w-screen h-screen h-50 bg-black/75 fixed top-0 left-0 flex justify-center items-center flex-col">
      <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
      <span className="font-bold text-white pt-2 text-sm">{message || "Processing..."}</span>
    </div>
  );
};

export default Spinner;

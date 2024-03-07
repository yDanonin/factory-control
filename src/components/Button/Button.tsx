import React, { ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e?: any) => void;
  children: ReactNode;
  disabled?: boolean;
  additionalStyle?: string;
  color?: string;
};
const Button: React.FC<Props> = ({ type, onClick, children, disabled, additionalStyle, color = "blue" }) => {
  //TODO: pass styling to css file
  if (!color) color = "blue";
  let buttonCSS = `inline-flex justify-center gap-1 items-center cursor-pointer text-white bg-blue-500 border border-gray-300 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-2 mb-2 px-5 h-10`;
  if (disabled) {
    buttonCSS += " bg-gray-400 hover:bg-gray-400";
  }
  if (additionalStyle) {
    buttonCSS += ` ${additionalStyle}`;
  }
  return (
    <button disabled={disabled} type={type || "button"} className={buttonCSS} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

import React from "react";
import Image from "next/image";
import LogoPontaltiPng from "../../assets/images/logo_pontalti_black.png";

const LogoPontalti = () => {
  return (
    <div className="flex flex-row items-center gap-5">
      <div className="bg-white py-1 px-3 rounded-full flex items-center justify-center">
        <Image src={LogoPontaltiPng} width={20} height={20} alt="Logo Pontalti" />
      </div>
      <p className="font-bold text-sm color-gray-800 sm:max-2xl:hidden">Pontalti</p>
    </div>
  );
};

export default LogoPontalti;

import React from "react";
import Image from "next/image";
import "./Background.css";

const Background: React.FC = () => {
  return (
    <div className="background">
      <Image className="logo" src="/background-logo.svg" alt="Background Logo" width={400} height={400} />
    </div>
  );
};

export default Background;

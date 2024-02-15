import React from "react";

const SectionHeader = ({ text }) => {
  return (
    <div className="text-start p-2 ml-4 md:ml-0 w-fit">
      <h1 className="text-[40px] font-medium">{text}</h1>
    </div>
  );
};

export default SectionHeader;

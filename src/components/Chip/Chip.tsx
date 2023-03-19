import React, { ReactNode } from "react";

const Chip = (props: { label: ReactNode }) => {
  const { label } = props;

  return (
    <p className="inline-flex items-center justify-center h-5 px-2 bg-red-600 border-2 border-white rounded-full font-poppins">
      <span className="text-[10px] leading-[1] text-white">{label}</span>
    </p>
  );
};

export default Chip;

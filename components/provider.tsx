import Image from "next/image";
import React, { FC, ReactNode } from "react";

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-screen h-screen">
      <div className="z-40">{children}</div>
    </div>
  );
};

import Image from "next/image";
import React, { FC } from "react";

export interface ILogo {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo: FC<ILogo> = ({ width = 50, height = 50, ...props }) => {
  return (
    <Image
      {...props}
      src="/logo.png"
      alt="logo"
      width={width}
      height={height}
    />
  );
};

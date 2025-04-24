'use client';

import Image from "next/image";
import React, { FC, ReactNode } from "react";
import { WalletProvider, Chain, SuiTestnetChain } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

const SupportedChains: Chain[] = [
  SuiTestnetChain,
];

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-screen h-screen">
      <WalletProvider chains={SupportedChains}>
      <div className="z-40">{children}</div>
      </WalletProvider>
    </div>
  );
};

"use client";

import Image from "next/image";
import React, { FC, ReactNode } from "react";
import { WalletProvider, Chain, SuiTestnetChain } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SupportedChains: Chain[] = [SuiTestnetChain];

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <div className="relative w-screen h-screen">
      <QueryClientProvider client={queryClient}>
        <WalletProvider chains={SupportedChains}>
          <div className="z-40">{children}</div>
        </WalletProvider>
      </QueryClientProvider>
    </div>
  );
};

"use client";

import React, { FC, Fragment, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { PowerOff, Wallet } from "lucide-react";
import { ConnectModal, useWallet } from "@suiet/wallet-kit";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const ConnectWalletButton: FC<{ children?: ReactNode }> = ({
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ...wallet } = useWallet();

  if (!props.children) {
    props.children = (
      <Button onClick={() => setIsOpen(true)}>
        <Wallet size={18} />
        Connect Wallet
      </Button>
    );
  }

  if (wallet.connected) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <Wallet size={18} />
            {wallet.address?.slice(0, 3) + "..." + wallet.address?.slice(-8)}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button onClick={wallet.disconnect} className="space-x-2 w-full">
            <PowerOff size={18} />
            Disconnect
          </Button>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <ConnectModal
      open={isOpen}
      onOpenChange={setIsOpen}
      onConnectError={() => setIsOpen(false)}
      onConnectSuccess={() => setIsOpen(false)}
    >
      {/* @ts-ignore */}
      {props.children ? props.children : ""}
    </ConnectModal>
  );
};

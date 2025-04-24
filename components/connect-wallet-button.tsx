'use client'

import React, { Fragment, useState } from "react";
import { Button } from "./ui/button";
import { PowerOff, Wallet } from "lucide-react";
import { ConnectModal, useWallet } from "@suiet/wallet-kit";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const ConnectWalletButton = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { ...wallet } = useWallet()

  if (wallet.connected) return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Wallet size={18} />
          {wallet.address?.slice(0, 3) + "..." + wallet.address?.slice(-10)}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Button onClick={wallet.disconnect} className="space-x-2 w-full"><PowerOff size={18} />Disconnect</Button>
      </PopoverContent>
    </Popover>
  )


  return (



    <ConnectModal open={isOpen} onOpenChange={setIsOpen} onConnectError={() => setIsOpen(false)} onConnectSuccess={() => setIsOpen(false)}>
      <Button onClick={() => setIsOpen(true)} variant="secondary">
        <Wallet size={18} />
        Connect Wallet
      </Button>
    </ConnectModal>
  );
};

import React from "react";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

export const ConnectWalletButton = () => {
  return (
    <Button variant="secondary">
      <Wallet size={18} />
      Connect Wallet
    </Button>
  );
};

"use client";

import React from "react";
import { ConversionFlowCard } from "./conversion-card";
import { Button } from "./ui/button";
import { formatCurrency } from "@/lib/utils";
import { BuySuiButton } from "./buy-sui-button";

export const SupplyToPool = () => {
  return (
    <div className="w-full max-w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Amount</h2>
        <ConversionFlowCard
          onCurrencySelect={() => {}}
          onAmountChange={() => {}}
          currency="naira"
          hideFooter
          className="h-[8.5rem]"
        />
      </div>
      <div className="grid grid-cols-4 gap-3 w-full mt-3">
        {["10%", "20%", "50%", "100%"].map((_, idx) => (
          <Button key={idx} variant="outline" className="max-w-full w-full">
            {_}
          </Button>
        ))}
      </div>
      <div className="w-full rounded-md bg-[#817E7E42] p-3 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">APR</h2>
          <p className="font-semibold text-lg">4.77%</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">Fee</h2>
          <p className="font-semibold text-lg">
            {formatCurrency(0, { mfm: 2 })}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">Total Market Circulation</h2>
          <p className="font-semibold text-lg">
            {formatCurrency(1000.43, { currency: "USD" })}
          </p>
        </div>
      </div>
      <BuySuiButton amountToReceive={0} amountToSend={0}>
        <Button className="h-12 w-full">Confirm Transaction</Button>
      </BuySuiButton>
    </div>
  );
};

"use client";

import React from "react";
import { ConversionFlowCard } from "./conversion-card";
import { Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { formatCurrency } from "@/lib/utils";

export const WithdrawFromPool = () => {
  return (
    <div className="w-full max-w-full space-y-6 overflow-auto">
      <div className="flex flex-col gap-3 w-full relative h-fit">
        <h2 className="text-xl font-bold">Amount</h2>
        <ConversionFlowCard
          type="send"
          amount={0}
          onAmountChange={() => {}}
          onCurrencySelect={() => {}}
          hideFooter
        />
      </div>
      <div className="grid grid-cols-4 gap-3 w-full mt-3">
        {["10%", "20%", "50%", "100%"].map((_, idx) => (
          <Button key={idx} variant="outline" className="max-w-full w-full">
            {_}
          </Button>
        ))}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Wallet /> {formatCurrency(0, { currency: "USD" })}
        </div>
        <div className="w-full rounded-md bg-[#817E7E42] p-3 space-y-5">
          <div className="flex items-center justify-between">
            {/*<h2 className="text-muted-foreground">APR</h2>
          <p className="font-semibold text-lg">4.77%</p>*/}
          </div>
          {/*<div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">Fee</h2>
          <p className="font-semibold text-lg">
            {formatCurrency(0, { mfm: 2 })}
          </p>
        </div>*/}

          <div className="flex items-center justify-between">
            <h2 className="text-muted-foreground">TVL</h2>
            <p className="font-semibold text-lg">
              {formatCurrency(Number(0), {
                currency: "USD",
              })}
            </p>
          </div>
        </div>
      </div>
      <Button className="w-full h-[3rem]">Confirm Transaction</Button>
    </div>
  );
};

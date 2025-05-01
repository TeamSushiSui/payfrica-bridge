"use client";

import React from "react";
import { ConversionFlowCard } from "./conversion-card";
import { MoveDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const WithdrawFromPool = () => {
  return (
    <div className="w-full max-w-full space-y-6 overflow-auto">
      <div className="flex flex-col gap-3 w-full relative h-fit">
        <ConversionFlowCard
          type="send"
          currency={"naira"}
          amount={0}
          onAmountChange={() => {}}
          onCurrencySelect={() => {}}
          hideFooter
        />
        <div className="absolute top-0 left-0 w-full flex h-full items-center justify-center pointer-events-none">
          <div className="p-2 bg-[#2C2F33] rounded-full">
            <div className="p-2 bg-[#FFFFFF1A] rounded-full">
              <MoveDown />
            </div>
          </div>
        </div>
        <ConversionFlowCard
          type="receive"
          currency={"sui"}
          amount={0}
          onAmountChange={() => {}} // Receive amount is calculated, not input
          onCurrencySelect={() => {}}
          disabled={true}
          hideFooter
        />
      </div>
      <Card>
        <CardContent>
          <form action="" className="flex flex-col gap-3">
            <label htmlFor="" className="flex flex-col gap-2">
              Account Number
              <Input
                className="rounded-2xl"
                placeholder="Input your account number"
              />
            </label>
            <label htmlFor="" className="flex flex-col gap-2">
              Select Bank
              <Input
                className="rounded-2xl"
                placeholder="Choose your prefered bank"
              />
            </label>
            <label htmlFor="" className="flex flex-col gap-2">
              Account Name
              <Input className="rounded-2xl" placeholder="Your Account Name" />
            </label>
          </form>
        </CardContent>
      </Card>
      <Button className="w-full h-[3rem]">Confirm Transaction</Button>
    </div>
  );
};

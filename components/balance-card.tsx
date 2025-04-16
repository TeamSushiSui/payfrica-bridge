import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { balances } from "@/constants";
import { formatCurrency } from "@/lib/utils";

export const BalanceCard = () => {
  return (
    <Card className="rounded-[8px] bg-[#FFFFFF14]">
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-[21.33px] font-bold text-muted-foreground">
          Wallet Balance
        </h2>
        <h2 className="text-[21.33px] font-bold text-muted-foreground">
          Total Supply
        </h2>
        <h2 className="text-[21.33px] font-bold text-muted-foreground">
          Total Rewards
        </h2>
      </CardHeader>
      <Separator />
      <CardContent className="flex items-center justify-between">
        <p className="text-center text-2xl font-bold">
          {formatCurrency(balances[0].amount, { currency: "USD" })}
        </p>
        <p className="text-center text-2xl font-bold">
          {formatCurrency(balances[1].amount, { currency: "USD" })}
        </p>
        <p className="text-center text-2xl font-bold">
          {formatCurrency(balances[2].amount, { currency: "USD" })}
        </p>
      </CardContent>
    </Card>
  );
};

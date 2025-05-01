"use client";

import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MoveDown, Wallet } from "lucide-react";
import { BuySuiButton } from "./buy-sui-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { currencies, rates } from "@/constants";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export interface IConversionFlowCard {
  type?: "send" | "receive";
  currency?: string;
  onCurrencySelect: (currency: (typeof currencies)[0]) => void;
  onAmountChange: (amount: number) => void;
  amount?: number;
  disabled?: boolean;
  hideFooter?: boolean;
  className?: string;
}

export const ConversionCard = () => {
  // Initialize with default currencies
  const [sendCurrency, setSendCurrency] = useState(
    currencies.find((c) => c.value === "naira") || currencies[0]
  );

  const [receiveCurrency, setReceiveCurrency] = useState(
    currencies.find((c) => c.value === "sui") || currencies[1]
  );

  const [sendAmount, setSendAmount] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);

  // Calculate conversion when send amount or currencies change
  useEffect(() => {
    if (sendAmount <= 0) {
      setReceiveAmount(0);
      return;
    }

    const SUIRATE = rates.sui * rates.usdc;

    let convertedAmount = sendAmount;

    // Then convert from USDC to the target currency
    if (receiveCurrency.value === "naira") {
      // USDC to SUI: divide by sui rate
      convertedAmount = convertedAmount * SUIRATE;
    } else if (receiveCurrency.value === "sui") {
      // USDC to SUI: divide by sui rate
      convertedAmount = convertedAmount / SUIRATE;
    } else if (receiveCurrency.value === "usdc") {
      // Keep as USDC
    }

    // Round to 2 decimal places for display
    setReceiveAmount(Number(convertedAmount.toFixed(2)));
  }, [sendAmount, sendCurrency, receiveCurrency]);

  return (
    <Card className="glassmorphism w-full">
      <CardContent className="flex flex-col gap-3 w-full relative h-fit p-6">
        <ConversionFlowCard
          type="send"
          currency={sendCurrency.value}
          amount={sendAmount}
          onAmountChange={setSendAmount}
          onCurrencySelect={setSendCurrency}
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
          currency={receiveCurrency.value}
          amount={receiveAmount}
          onAmountChange={() => {}} // Receive amount is calculated, not input
          onCurrencySelect={setReceiveCurrency}
          disabled={true}
        />
      </CardContent>
      <CardFooter>
        <BuySuiButton
          amountToSend={sendAmount}
          amountToReceive={receiveAmount}
          className="hover:bg-[#5865F2]/80 text-white w-full md:h-[53px] h-[48px]"
        />
      </CardFooter>
    </Card>
  );
};

export const ConversionFlowCard: FC<IConversionFlowCard> = ({
  type = "send",
  onCurrencySelect,
  onAmountChange,
  amount,
  currency,
  disabled = false,
  hideFooter = false,
  className,
}) => {
  // Find the default currency object
  const defaultCurrency =
    currencies.find((c) => c.value === currency) || currencies[0];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : Number.parseFloat(e.target.value);
    if (!isNaN(value)) {
      onAmountChange(value);
    }
  };

  return (
    <Card
      className={cn(
        "bg-[#8D868657] md:py-5 py-3 w-full md:gap-0 gap-2",
        className
      )}
    >
      <CardHeader className="py-0">
        <CardTitle className="text-gray-400">
          {type === "send" ? "You Send" : "You Receive"}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-fit md:py-3 flex w-full items-center justify-between">
        <Input
          type="text"
          inputMode="decimal"
          value={amount === undefined || amount === 0 ? "" : amount}
          onChange={handleAmountChange}
          disabled={disabled}
          className={cn(
            "md:text-5xl text-3xl font-semibold text-gray-300 border-0 p-0 h-auto dark:bg-transparent bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
            "w-auto max-w-[50%] z-30"
          )}
          placeholder="0"
        />
        <Select
          defaultValue={defaultCurrency.value}
          onValueChange={(value) => {
            const selectedCurrency = currencies.find((c) => c.value === value);
            if (selectedCurrency) {
              onCurrencySelect(selectedCurrency);
            }
          }}
        >
          <SelectTrigger className="py-1 z-50 border-none md:text-lg md:data-[size=default]:h-12 data-[size=default]:h-9">
            <SelectValue placeholder="Selected Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Crypto</SelectLabel>
              {currencies.map((currency, idx) => (
                <SelectItem key={idx} value={currency.value}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={currency.symbol || "/placeholder.svg"}
                      alt={currency.value}
                      width={20}
                      height={20}
                    />
                    {currency.label}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
      {!hideFooter && (
        <CardFooter className="flex items-center justify-between">
          <p className="text-gray-300 font-semibold">
            $
            {(() => {
              // Convert to USD equivalent
              if (currency === "naira") {
                return ((amount || 0) / rates.usdc).toFixed(2);
              } else if (currency === "sui") {
                return ((amount || 0) * rates.sui).toFixed(2);
              } else {
                return (amount || 0).toFixed(2);
              }
            })()}
          </p>
          <div className="flex items-center gap-2">
            <Wallet size={16} />
            ----
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

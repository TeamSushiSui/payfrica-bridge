"use client";

import React, { FC, SetStateAction, useEffect, useState } from "react";
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
import { cn, getCoinBalance, payfricaBridgeApi } from "@/lib/utils";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { SuiToken, Token } from "@/types/types";
import { currencyLogo } from "@/lib/constants";
import { useWallet } from "@suiet/wallet-kit";
import { ConnectWalletButton } from "./connect-wallet-button";
import { Button } from "./ui/button";

export interface IConversionFlowCard {
  type?: "send" | "receive";
  onCurrencySelect: (coinType: string) => void;
  onAmountChange: (amount: number) => void;
  amount?: number;
  disabled?: boolean;
  hideFooter?: boolean;
  className?: string;
  sendingCurrencies?: Token[];
  receivingCurrencies?: SuiToken[];
  disableCurrency?: boolean;
  onReceivingCoinTypeChange?: (coinType: string) => void;
  decimals?: number;
  setDecimals?: React.Dispatch<SetStateAction<number>>;
  defaultCoinType?: string;
}

export const ConversionCard = () => {
  const { connecting, connected } = useWallet();
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const [suiTokens, setSuiTokens] = useState<SuiToken[]>([]);
  const [receivingCoinType, setReceivingCoinType] = useState("");
  const [sendingCoinType, setSendingCoinType] = useState("");
  const [rate, setRate] = useState(0);
  const [decimals, setDecimals] = useState(6);

  //const [sendingCurrencies, setSendingCurrencies] = useState([]);
  //const [receivingCurrencies, setReceivingCurrencies] = useState([]);

  //1. Getting the tokens from the api
  const { isLoading, data } = useQuery({
    queryKey: ["get-tokens"],
    queryFn: async () =>
      (await payfricaBridgeApi.get<Token[]>("/agents/base-tokens")).data,
    retry: 3,
  });

  console.log({ isLoading, data });

  //This will be trigger when a user select a parent token then the receiving token will be changed to the relative tokens on the select currency.
  const onCurrencySelect = (coinType: string) => {
    const relativeTokens =
      data?.find((c) => c.coinType === coinType)?.suiTokens || [];

    setSendingCoinType(coinType); // Set the selected coin type for the ConversionFlowCard component

    setSuiTokens(relativeTokens);
  };

  //This will trigger when the coin type os selcted by the user and this will get the converted amount
  useEffect(() => {
    if (!(sendingCoinType && receivingCoinType && sendAmount)) return;

    const selectedCurrency = data?.find((c) => c.coinType === sendingCoinType);

    const suiToken = selectedCurrency?.suiTokens;

    const selectedToken = suiToken?.find(
      (t) => t.coinType === receivingCoinType
    );

    setRate(Number(selectedToken?.price));

    setReceiveAmount(sendAmount * Number(selectedToken?.price) || 0.00062);
  }, [receivingCoinType, sendAmount]);

  return (
    <Card className="glassmorphism w-full">
      <CardContent className="flex flex-col gap-3 w-full relative h-fit p-6">
        <ConversionFlowCard
          type="send"
          amount={sendAmount}
          onAmountChange={setSendAmount}
          onCurrencySelect={onCurrencySelect}
          sendingCurrencies={data}
          disabled={isLoading}
          decimals={decimals}
          setDecimals={setDecimals}
        />
        <div className="absolute top-0 left-0 w-full flex h-full items-center justify-center pointer-events-none -mt-3">
          <div className="p-2 bg-[#2C2F33] rounded-full">
            <div className="p-2 bg-[#FFFFFF1A] rounded-full">
              <MoveDown />
            </div>
          </div>
        </div>
        <ConversionFlowCard
          type="receive"
          amount={receiveAmount}
          onAmountChange={() => {}} // Receive amount is calculated, not input
          onCurrencySelect={() => {}}
          disabled={isLoading}
          receivingCurrencies={suiTokens}
          disableCurrency
          onReceivingCoinTypeChange={(e) => setReceivingCoinType(e)}
          decimals={decimals}
          setDecimals={setDecimals}
        />
      </CardContent>
      <CardFooter>
        {connected ? (
          <BuySuiButton
            amountToSend={sendAmount}
            amountToReceive={receiveAmount}
            inputCoinType={sendingCoinType}
            outputCoinType={receivingCoinType}
            rate={rate}
            decimals={decimals}
            className="hover:bg-[#5865F2]/80 text-white w-full md:h-[53px] h-[48px]"
          />
        ) : (
          <ConnectWalletButton>
            <Button size="lg" className="w-full">
              Connect Wallet
            </Button>
          </ConnectWalletButton>
        )}
      </CardFooter>
    </Card>
  );
};

export const ConversionFlowCard: FC<IConversionFlowCard> = ({
  type = "send",
  onCurrencySelect,
  onAmountChange,
  amount,
  disabled = false,
  hideFooter = false,
  className,
  sendingCurrencies = [],
  receivingCurrencies = [],
  onReceivingCoinTypeChange = () => {},
  decimals,
  setDecimals = () => {},
  ...props
}) => {
  const { connected, address, ...prop } = useWallet();
  const [coinType, setCoinType] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : Number.parseFloat(e.target.value);
    if (!isNaN(value)) {
      onAmountChange(value);
    }
  };

  useEffect(() => {
    if (type === "send" || !connected || !coinType) return;

    const _getBalance = async () => {
      const balance = await getCoinBalance(address!, coinType, decimals);
      setWalletBalance(balance);
    };

    _getBalance();
  }, [connected, coinType]);

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
          disabled={props.disableCurrency}
          className={cn(
            "md:text-5xl text-3xl font-semibold text-gray-300 border-0 p-0 h-auto dark:bg-transparent bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
            "w-auto max-w-[50%] z-30"
          )}
          placeholder="0"
        />
        <Select
          //defaultValue={defaultCurrency.value}
          defaultValue={props.defaultCoinType}
          disabled={disabled}
          onValueChange={(value) => {
            onCurrencySelect(value);
            if (type === "receive") {
              onReceivingCoinTypeChange(value);
              setCoinType(value);
            }
          }}
        >
          <SelectTrigger className="py-1 z-50 border-none md:text-lg md:data-[size=default]:h-12 data-[size=default]:h-9">
            {/*<Image src={currencyLogo["NGNC"]} alt="" />*/}
            <SelectValue placeholder="Selected Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currencies</SelectLabel>
              {type === "send"
                ? sendingCurrencies.map((currency, idx) => (
                    <SelectItem key={idx} value={currency.coinType}>
                      <Image
                        //@ts-ignore
                        src={currencyLogo[currency.name]}
                        alt=""
                        width={23}
                        height={23}
                      />
                      {currency.name}
                    </SelectItem>
                  ))
                : receivingCurrencies.map((currency, idx) => (
                    <SelectItem
                      key={idx}
                      onClick={() => setDecimals(currency.decimal)}
                      value={currency.coinType}
                    >
                      <Image
                        //@ts-ignore
                        src={currencyLogo[currency.name]}
                        alt=""
                        width={23}
                        height={23}
                      />
                      {currency.name}
                    </SelectItem>
                  ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
      {!hideFooter && (
        <CardFooter className="flex items-center justify-between">
          {type === "receive" && (
            <div className="flex items-center gap-2">
              <Wallet size={16} />
              {walletBalance}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

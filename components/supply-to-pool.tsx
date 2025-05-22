"use client";

import React, { useEffect, useState } from "react";
import { ConversionFlowCard } from "./conversion-card";
import { Button } from "./ui/button";
import {
  client,
  formatCurrency,
  getCoinBalance,
  getObject,
  handleMergeSplit,
  PACKAGE_ID,
  PAYFRICA_ID,
  PAYFRICA_PACKAGE_ID,
  PAYFRICA_POOL_ID,
} from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Wallet } from "lucide-react";
import { useWallet } from "@suiet/wallet-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useRouter } from "next/navigation";

export const SupplyToPool = () => {
  const q = useSearchParams();
  const r = useRouter();
  const { address, signAndExecuteTransaction } = useWallet();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isPending, startTransition] = useState(false);
  const [percentage, setPercentage] = useState<number>();
  const percentages = [10, 20, 50, 100];

  useEffect(() => {
    if (!(q.get("coinType") && q.get("decimal") && address)) return;

    const _getBalance = async () => {
      const balance = await getCoinBalance(
        address!,
        q.get("coinType")!,
        Number(q.get("decimal")),
        false
      );

      console.log({ balance });

      setBalance(balance);
    };
    _getBalance();
  }, [q.get("coinType"), q.get("decimal"), address]);

  const resetURL = () => {
    r.replace(location.pathname);
    location.reload();
  };

  const handleAddtoLiquidity = async () => {
    startTransition(true);

    try {
      if (!address) throw new Error("No wallet");
      const amt = amount * Math.pow(10, 6);
      const tx = new Transaction();
      const coins = await client.getCoins({
        owner: address,
        coinType: q.get("coinType"),
      });
      const coinArg = handleMergeSplit(tx, coins.data, BigInt(amt));

      const liqObj = await getObject(
        address,
        `${PAYFRICA_PACKAGE_ID}:: pool::PayfricaPoolTicket`
      );
      if (liqObj === null) {
        tx.moveCall({
          target: `${PAYFRICA_PACKAGE_ID}::pool::add_liquidity_new`,
          typeArguments: [q.get("coinType")!],
          arguments: [
            tx.object(q.get("poolId")!),
            tx.object(PAYFRICA_POOL_ID),
            coinArg,
          ],
        });
      } else {
        tx.moveCall({
          target: `${PAYFRICA_PACKAGE_ID}::pool::add_liquidity`,
          typeArguments: [q.get("coinType")!],
          arguments: [
            tx.object(q.get("poolId")!),
            tx.object(PAYFRICA_POOL_ID),
            tx.object(liqObj),
            coinArg,
          ],
        });
      }

      const txResult = await signAndExecuteTransaction({ transaction: tx });

      if (txResult) {
        resetURL();
      }
    } catch (error) {
      console.log(error);
    } finally {
      startTransition(false);
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!address) throw new Error("No wallet");
    //const a = poolMap.get(coinType)!;
    const amt = amount * Math.pow(10, 6);
    const tx = new Transaction();

    const liqObj = await getObject(
      address,
      `${PAYFRICA_PACKAGE_ID}::pool::PayfricaPoolTicket`
    );
    if (liqObj === null) {
      throw new Error("No liquidity");
    }
    tx.moveCall({
      target: `${PAYFRICA_PACKAGE_ID}::pool::remove_liquidity`,
      typeArguments: [q.get("coinType")!],
      arguments: [
        tx.object(q.get("poolId")!),
        tx.object(liqObj),
        tx.pure.u64(amt),
      ],
    });

    const txResult = await signAndExecuteTransaction({ transaction: tx });

    if (txResult) {
      resetURL();
    }
  };

  useEffect(() => {
    if (percentage) {
      setAmount(balance * (percentages[percentage] / 100));
    }
  }, [percentage]);

  return (
    <div className="w-full max-w-full space-y-6 mt-5">
      <div className="space-y-2">
        <ConversionFlowCard
          key={q.get("coinType")}
          onCurrencySelect={() => {}}
          onAmountChange={setAmount}
          amount={amount}
          sendingCurrencies={
            Boolean(q.get("coinType") && q.get("coinName"))
              ? [
                  {
                    coinType: q.get("coinType")!,
                    name: q.get("coinName")!,
                    suiTokens: [],
                    id: "",
                    createdAt: "",
                    updatedAt: "",
                  },
                ]
              : undefined
          }
          hideFooter
          defaultCoinType={q.get("coinType")!}
          type="send"
          className="h-[8.5rem]"
        />
      </div>
      <div className="grid grid-cols-4 gap-3 w-full mt-3">
        {percentages.map((_, idx) => (
          <Button
            onClick={() => setPercentage(idx === percentage ? undefined : idx)}
            key={idx}
            variant={percentage === idx ? "default" : "outline"}
            className="max-w-full w-full"
          >
            {_ + "%"}
          </Button>
        ))}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Wallet /> {formatCurrency(balance, { currency: "USD" })}
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
              {formatCurrency(
                Number(q.get("tvl") || 0) /
                  Math.pow(10, Number(q.get("decimal") || 1)),
                {
                  currency: "USD",
                }
              )}
            </p>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          if (q.get("type") === "withdraw") {
            handleRemoveLiquidity();
          }

          if (q.get("type") === "supplyToPool") {
            handleAddtoLiquidity();
          }
        }}
        disabled={amount > balance || isPending || amount <= 0}
        className="h-12 w-full"
      >
        Confirm Transaction
      </Button>
    </div>
  );
};

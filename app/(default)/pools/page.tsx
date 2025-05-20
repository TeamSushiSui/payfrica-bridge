"use client";

import { AvailablePool } from "@/components/available-pools";
import { BalanceCard } from "@/components/balance-card";
import { SupplyToPool } from "@/components/supply-to-pool";
import { SupplyToPoolDrawer } from "@/components/supply-to-pool-drawer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPool } from "@/components/user-pool";
import { WithdrawFromPool } from "@/components/withdraw-from-pool";
import { getUserSuppliedPools, payfricaBackendApi } from "@/lib/utils";
import { IRes } from "@/types/types";
import { useWallet } from "@suiet/wallet-kit";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

const Page = () => {
  const q = useSearchParams();
  const { address = "" } = useWallet();
  const [userPools, setUserPools] = useState<
    (IRes & { amountSupplied?: number })[]
  >([]);
  const [availablePools, setAvailablePools] = useState<IRes[]>([]);
  const [activeTab, setActiveTab] = useState("supplyToPool");

  const { isLoading, data: pools = [] } = useQuery({
    queryKey: ["available-pools"],
    queryFn: async () => (await payfricaBackendApi.get<IRes[]>(`/pools`)).data,
  });

  const { data = [] } = useQuery({
    queryKey: ["get-user-pool", address],
    queryFn: () => getUserSuppliedPools(address),
    enabled: Boolean(address),
  });

  useEffect(() => {
    if (!pools.length || !data?.length) return;

    const usdcPools = pools.filter(
      (pool) => pool.coinName.toUpperCase() === "USDC"
    );

    setAvailablePools([]);
    setUserPools([]);

    //iterate through available pools
    usdcPools.forEach((pool) => {
      data?.forEach((d) => {
        if (pool.id === d.pool_id) {
          setUserPools((prev) => [
            ...prev,
            { ...pool, amountSupplied: Number(d.amount_added) },
          ]);
        } else {
          setAvailablePools((prev) => [...prev, pool]);
        }
      });
    });
  }, [pools, data]);

  useEffect(() => {
    setActiveTab(
      q.get("supplyToPool") === "true"
        ? "supplyToPool"
        : q.get("showWithdrawal") === "true"
        ? "withdrawFromPool"
        : "supplyToPool"
    );
  }, [q.get("supplyToPool"), q.get("showWithdrawal")]);
  //const q = queryString.parse()

  return (
    <section className="py-24 w-screen h-screen">
      <SupplyToPoolDrawer />
      <section className="container mx-auto px-3 flex md:px-0 md:h-[90vh] overflow-hidden py-4">
        <div className="md:w-[70%] w-full md:px-5 space-y-7 overflow-auto h-full">
          {/*<BalanceCard />*/}

          <UserPool pools={userPools} isLoading={isLoading} />

          <AvailablePool isLoading={isLoading} pools={availablePools} />
        </div>
        <div className="hidden md:flex md:w-[30%] md:justify-center border-l">
          <div className="w-[90%] bg-[#817E7E42] overflow-hidden p-3 rounded-xl">
            <h2 className="text-2xl font-bold mb-3">
              {q.get("type") === "supplyToPool"
                ? "Supply To Pool"
                : "Withdraw From Pool"}
            </h2>
            <Separator />
            {/*<Tabs defaultValue="supplyToPool" className="w-[400px]">*/}

            <SupplyToPool />
            {/*<Tabs
              value={activeTab}
              onValueChange={(e) => setActiveTab(e)}
              defaultValue="supplyToPool"
              className="w-full flex justify-center items-center flex-col mt-3"
            >
              <TabsList className="h-16 p-2 w-full border">
                <TabsTrigger value="supplyToPool">Supply</TabsTrigger>
                {(q.get("supplyToPool") !== "true" ||
                  q.get("showWithdrawal") === "true") && (
                  <TabsTrigger value="withdrawFromPool">Withdraw</TabsTrigger>
                )}
              </TabsList>
              <TabsContent className="w-full" value="supplyToPool">
                <SupplyToPool />
              </TabsContent>
              <TabsContent
                className="w-full max-h-[38rem] overflow-y-auto"
                value="withdrawFromPool"
              >
                <WithdrawFromPool />
              </TabsContent>
            </Tabs>*/}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Page;

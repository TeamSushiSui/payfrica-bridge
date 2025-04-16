import { AvailablePool } from "@/components/available-pools";
import { BalanceCard } from "@/components/balance-card";
import { SupplyToPool } from "@/components/supply-to-pool";
import { SupplyToPoolDrawer } from "@/components/supply-to-pool-drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPool } from "@/components/user-pool";
import { WithdrawFromPool } from "@/components/withdraw-from-pool";
import React from "react";

const Page = () => {
  return (
    <section className="py-24 w-screen h-screen">
      <SupplyToPoolDrawer />
      <section className="container mx-auto px-3 flex md:px-0 md:h-[90vh] overflow-hidden py-4">
        <div className="md:w-[70%] w-full md:px-5 space-y-7 overflow-auto h-full">
          <BalanceCard />

          <UserPool />

          <AvailablePool />
        </div>
        <div className="hidden md:flex md:w-[30%] md:justify-center border-l">
          <div className="w-[90%] bg-[#817E7E42] p-5 rounded-xl">
            <h2 className="text-2xl font-bold">Supply To Pool</h2>
            <Tabs
              defaultValue="supplyToPool"
              className="w-full flex justify-center items-center flex-col mt-3"
            >
              <TabsList className="h-16 p-2 w-full border">
                <TabsTrigger value="supplyToPool">Supply</TabsTrigger>
                <TabsTrigger value="withdrawFromPool">Withdraw</TabsTrigger>
              </TabsList>
              <TabsContent className="w-full" value="supplyToPool">
                <SupplyToPool />
              </TabsContent>
              <TabsContent value="withdrawFromPool">
                <WithdrawFromPool />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Page;

"use client";

import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getUserSuppliedPools } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userPools } from "@/constants";
import { PoolListCard } from "./pool-list-card";
import { useWallet } from "@suiet/wallet-kit";
import { useQuery } from "@tanstack/react-query";
import { IRes } from "@/types/types";

export const UserPool: FC<{ isLoading: boolean; pools: IRes[] }> = ({
  pools = [],
}) => {
  const { address = "" } = useWallet();
  const [showInNaira, setShowInNaira] = useState(false);
  const [filterPools, setFilterPools] = useState<IRes[]>([]);

  return (
    <Card className={cn("rounded-[8px] bg-[#1E1E1E] border-[#2A2A2A]")}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl text-white">Pools Supplied</CardTitle>
        <div className="w-[40%] relative">
          <Input
            className="w-full bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-400 rounded-md"
            placeholder="Search"
          />
          <Search
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="border-b border-[#2A2A2A]">
            <TableRow>
              <TableHead className="text-gray-400">Pool</TableHead>
              <TableHead className="text-gray-400">Price</TableHead>
              <TableHead className="text-gray-400">Balance</TableHead>
              <TableHead className="text-gray-400">Amount Supply</TableHead>
              <TableHead className="text-gray-400">
                <div className="flex items-center gap-1">
                  TVL
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M7 15L12 20L17 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </TableHead>
              <TableHead className="text-right text-gray-400 w-[100px]">
                <div className="flex items-center justify-end gap-2">
                  <label htmlFor="showInNaira" className="text-sm">
                    Action
                  </label>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {pools.map((pool) => (
              <PoolListCard
                key={pool.id}
                {...pool}
                showAmountSupply
                showBalance
                disableSupply={false}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

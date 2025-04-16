"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { availablePools } from "@/constants";
import { PoolListCard } from "./pool-list-card";

export const AvailablePool = () => {
  const [showInNaira, setShowInNaira] = useState(false);

  return (
    <Card className={cn("rounded-[8px] bg-[#1E1E1E] border-[#2A2A2A]")}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl text-white">Available Pools</CardTitle>
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
              <TableHead className="text-gray-400">Volume (24h)</TableHead>
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
              <TableHead className="text-right text-gray-400 w-[150px]">
                <div className="flex items-center justify-end gap-2">
                  <input
                    type="checkbox"
                    id="showInNaira"
                    checked={showInNaira}
                    onChange={(e) => setShowInNaira(e.target.checked)}
                    className="rounded border-gray-400 text-green-500 focus:ring-green-500"
                  />
                  <label htmlFor="showInNaira" className="text-sm">
                    Show in Naira
                  </label>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {availablePools.map((pool) => (
              <PoolListCard
                key={pool.id}
                {...pool}
                hiddenWithdrawalButton
                showDetails
                disableSupply={false}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

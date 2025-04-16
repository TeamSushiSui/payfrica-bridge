"use client";

import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { SupplyToPool } from "./supply-to-pool";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import queryString from "query-string";

export const SupplyToPoolDrawer = () => {
  const q = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const r = useRouter();

  const handleOpenAndClose = (e: boolean) => {
    if (!e) {
      const qs = queryString.stringify({
        supplyToPool: false,
        poolId: q.get("poolId"),
      });
      r.push(`?${qs}`);
    }
  };

  return (
    <Drawer
      open={Boolean(q.get("supplyToPool") === "true" && isMobile)}
      onOpenChange={handleOpenAndClose}
    >
      <DrawerContent className="p-4 space-y-2">
        <DrawerHeader className="py-2">
          <DrawerTitle className="text-3xl font-bold">
            Supply To Pool
          </DrawerTitle>
        </DrawerHeader>
        <Separator />
        <SupplyToPool />
      </DrawerContent>
    </Drawer>
  );
};

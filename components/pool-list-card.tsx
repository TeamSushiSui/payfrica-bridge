import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import type { FC } from "react";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { PoolDetails } from "./pool-details";
import { currencyLogo } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

interface PoolProps {
  coinBalance: string;
  coinDecimal: number;
  coinName: string;
  coinType: string;
  createdAt: string;
  defaultFees: null;
  feeDecimal: number;
  id: string;
  ratesDollar: number;
  rewardsBalance: string;
  amountSupplied?: number;
}

export const PoolListCard: FC<
  PoolProps & {
    disableSupply?: boolean;
    hiddenWithdrawalButton?: boolean;
    hiddenSupplyButton?: boolean;
    showDetails?: boolean;
    showAmountSupply?: boolean;
    showBalance?: boolean;
  }
> = ({ disableSupply = true, ...props }) => {
  const r = useRouter();

  const openSupplyToPool = (type = "supplyToPool") => {
    const qs = queryString.stringify({
      poolId: props.id,
      coinName: props.coinName,
      coinType: props.coinType,
      tvl: props.coinBalance,
      decimal: props.coinDecimal,
      type,
    });

    r.push(`?${qs}`);
  };

  return (
    <TableRow className="h-16">
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="size-8">
              <Image
                className="inline-block size-7 rounded-full ring-1 ring-white"
                src={currencyLogo["USDC"] || "/placeholder.svg"}
                alt={props.coinName}
                width={28}
                height={28}
              />
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>${props.ratesDollar}</TableCell>
      <TableCell>
        {formatCurrency(
          Number(props.coinBalance || 0) / Math.pow(10, props.coinDecimal),
          { currency: "USD" }
        ) || "None"}
      </TableCell>
      {props.showAmountSupply && <TableCell>{props.amountSupplied}</TableCell>}
      {props.showBalance && <TableCell>{"Balance"}</TableCell>}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          {!props.hiddenWithdrawalButton && (
            <Button
              onClick={() => openSupplyToPool("withdraw")}
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-600 hover:bg-[#2A2A2A] text-white"
            >
              Withdraw
            </Button>
          )}
          {!props.hiddenSupplyButton && (
            <Button
              size="sm"
              disabled={disableSupply}
              onClick={() => openSupplyToPool()}
            >
              Supply
            </Button>
          )}
          {props.showDetails && (
            <PoolDetails>
              <Button variant="link">Details</Button>
            </PoolDetails>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

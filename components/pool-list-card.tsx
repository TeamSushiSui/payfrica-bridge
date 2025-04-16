import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import type { FC } from "react";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { PoolDetails } from "./pool-details";

interface Coin {
  id: string;
  name: string;
  image: string;
}

interface PoolProps {
  id: string;
  name: string;
  coins: Coin[];
  price: number;
  percentage: number;
  volume: string;
  tvl: string | undefined;
  hiddenWithdrawalButton?: boolean;
  hiddenSupplyButton?: boolean;
  showDetails?: boolean;
  disableSupply?: boolean;
}

export const PoolListCard: FC<PoolProps> = ({
  disableSupply = true,
  ...props
}) => {
  const r = useRouter();

  const openSupplyToPool = () => {
    const qs = queryString.stringify({
      supplyToPool: true,
      poolId: props.id,
    });

    r.push(`?${qs}`);
  };

  return (
    <TableRow className="h-16">
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            {props.coins.map((coin) => (
              <div key={coin.id} className="size-8">
                <Image
                  className="inline-block size-7 rounded-full ring-1 ring-white"
                  src={coin.image || "/placeholder.svg"}
                  alt={coin.name}
                  width={28}
                  height={28}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span>{props.name}</span>
            <Badge className="text-xs  rounded-sm w-fit">
              {props.percentage}%
            </Badge>
          </div>
        </div>
      </TableCell>
      <TableCell>${props.price}</TableCell>
      <TableCell>{props.volume}</TableCell>
      <TableCell>{props.tvl || "None"}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          {!props.hiddenWithdrawalButton && (
            <Button
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
              onClick={openSupplyToPool}
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

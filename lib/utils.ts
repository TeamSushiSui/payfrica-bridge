import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { truncate } from "fs";
import { Transaction } from "@mysten/sui/transactions";
import { IUserPoolType } from "@/types/types";

const rpcUrl = getFullnodeUrl("testnet");
const client = new SuiClient({ url: rpcUrl });

async function getCoinBalance(
  addr: string,
  coinType: string,
  decimal = 6,
  haveOX = true
) {
  if (haveOX) {
    coinType = `0x${coinType}`;
  }
  const resp = await client.getBalance({
    owner: addr,
    coinType,
  });
  return Number(resp.totalBalance) / 10 ** decimal;
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getInitials = (fullName?: string) => {
  if (!fullName) return;
  let initial = "";

  const names = fullName.split(" ");

  if (names.length === 1) {
    return names[0][0];
  }

  initial += names.map((name) => {
    return name[0];
  });

  return initial;
};

const formatCurrency = (
  amount = 0,
  options?: { currency?: string; mfm?: number }
) => {
  if (!options?.currency) {
    options = {
      ...options,
      currency: options?.currency ?? "NGN",
    };
  }
  return new Intl.NumberFormat(
    options?.currency === "NGN" ? "en-NG" : "en-US",
    {
      style: "currency",
      currency: options?.currency || "NGN",
      minimumFractionDigits: options?.mfm || 2,
    }
  ).format(amount);
};

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID!;
const PAYFRICA_AGENTS = process.env.NEXT_PUBLIC_PAYFRICA_AGENTS!;
const PAYFRICA_PACKAGE_ID = process.env.NEXT_PUBLIC_PAYFRICA_PACKAGE_ID!;
const PAYFRICA_ID = process.env.NEXT_PUBLIC_PAYFRICA_ID!;
const PAYFRICA_POOL_ID = process.env.NEXT_PUBLIC_PAYFRICA_POOL_ID!;

const payfricaBridgeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYFRACIA_BRIDGE_API,
  withCredentials: true,
});

const payfricaBackendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYFRICA_BACKEND_API,
  withCredentials: true,
});

const handleMergeSplit = (
  tx: Transaction,
  coinObjects: any[],
  amount: bigint
) => {
  if (!coinObjects.length) throw new Error("No coins");
  const primary = coinObjects[0].coinObjectId;
  if (coinObjects.length > 1) {
    tx.mergeCoins(
      tx.object(primary),
      coinObjects.slice(1).map((c) => tx.object(c.coinObjectId))
    );
  }
  const [split] = tx.splitCoins(primary, [amount]);
  return split;
};

export const getObject = async (address: string, nftType: string) => {
  const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "suix_getOwnedObjects",
    params: [
      address,
      {
        filter: {
          StructType: nftType,
        },
        options: {
          showType: true,
          showOwner: true,
          showContent: true,
          showDisplay: true,
          showBcs: false,
          showStorageRebate: false,
        },
      },
    ],
  };

  const response = await fetch("https://fullnode.testnet.sui.io:443", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  try {
    return await response
      .json()
      .then((res) => res.result.data[0].data.objectId);
  } catch (error) {
    return null;
  }
};

export const getUserSuppliedPools = async (
  address: string
): Promise<IUserPoolType[] | null> => {
  const nftType = `${PAYFRICA_PACKAGE_ID}::pool::PayfricaPoolTicket`;
  const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "suix_getOwnedObjects",
    params: [
      address,
      {
        filter: {
          StructType: nftType,
        },
        options: {
          showType: true,
          showOwner: true,
          showContent: true,
          showDisplay: true,
          showBcs: false,
          showStorageRebate: false,
        },
      },
    ],
  };

  const response = await fetch("https://fullnode.testnet.sui.io:443", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  try {
    return await response
      .json()
      .then((res) =>
        res.result.data.map(
          (item: { data: { content: { fields: any } } }) =>
            item.data.content.fields
        )
      );
  } catch (error) {
    return null;
  }
};

// (async () => {
//   console.log(await getNFTs("0x299997c9cc660a99a12e0b9945d138adcca560facde681e06ed9e078b815962e", "0x35fcdca2bd3d7b3a845ea1e5b614e727698da3af3cd64658ba8ace10fdb73a64::payfrica::PayfricaUser"));
// })();

export {
  formatCurrency,
  getInitials,
  cn,
  getCoinBalance,
  payfricaBridgeApi,
  PACKAGE_ID,
  PAYFRICA_AGENTS,
  payfricaBackendApi,
  PAYFRICA_ID,
  PAYFRICA_PACKAGE_ID,
  handleMergeSplit,
  client,
  PAYFRICA_POOL_ID,
};

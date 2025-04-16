import { formatCurrency } from "./lib/utils";

const navLinks = [
  {
    label: "Swap",
    path: "#swap",
    showOnDesktop: true,
  },
  {
    label: "Save",
    path: "#save",
    showOnDesktop: true,
  },
  {
    label: "Market",
    path: "/market",
    showOnDesktop: false,
  },
];

const currencies = [
  {
    label: "Naira",
    value: "naira",
    symbol: "/naira.png",
  },
  {
    label: "Sui",
    value: "sui",
    symbol: "/sui.png",
  },
];

const priceStats = [
  {
    id: "1",
    currency: "Sui",
    stat: "1 Sui ~ 2.57 USDC",
  },
  {
    id: "2",
    currency: "USDC",
    stat: "1 USDC ~ 1.04 USDC",
  },
  {
    id: "3",
    currency: "NGN",
    stat: "1 USDC ~ 1,553 NGN",
  },
];

const rates = {
  sui: 2.57,
  usdc: 1557,
  naira: 1 / 1557,
};

const agents = [
  {
    id: "1",
    name: "Micheal John",
    amountRange: "NGN 10,000 - 100,000",
    badges: ["Zero Fees", "Fast Trades"],
  },
  {
    id: "2",
    name: "Devine Lark",
    amountRange: "NGN 10,000 - 100,000",
    badges: ["Zero Fees", "Fast Trades"],
  },
];

const paymentDetails = [
  {
    id: "1",
    accountNumber: "7036686930",
    bankName: "PALMPAY",
    accountName: "Micheal John",
    estimatedFees: 0,
    destinationAddress: "0a7733...ab",
  },
  {
    id: "2",
    accountNumber: "7068214943",
    bankName: "PALMPAY",
    accountName: "Devine Lark",
    estimatedFees: 0,
    destinationAddress: "0a7733...ab",
  },
];

const balances = [
  {
    label: "Wallet Balance",
    amount: 100,
    currency: "USD",
  },
  {
    label: "Total Supply",
    amount: 100,
    currency: "USD",
  },
  {
    label: "Total Rewards",
    amount: 0.1,
    currency: "USD",
  },
];

const userPools = [
  {
    id: "1",
    coins: [
      {
        image: "/sui.png",
        name: "SUI",
        id: "sui",
      },
      {
        image: "/soci.png",
        name: "SOCI",
        id: "soci",
      },
    ],
    price: 2.34,
    percentage: 0.3,
    volume: formatCurrency(180000000 / 100000, { mfm: 2 }),
    tvl: undefined,
    name: "SUI/SOCI",
  },
  {
    id: "2",
    coins: [
      {
        image: "/tether.png",
        name: "TETHER",
        id: "tether",
      },
      {
        image: "/soci.png",
        name: "SOCI",
        id: "soci",
      },
    ],
    name: "TETHER/SOCI",
    price: 2.34,
    percentage: 0.2,
    volume: formatCurrency(150000000 / 100000, { mfm: 2 }),
    tvl: undefined,
  },
];

const availablePools = [
  {
    id: "1",
    coins: [
      {
        image: "/sui.png",
        name: "SUI",
        id: "sui",
      },
      {
        image: "/soci.png",
        name: "SOCI",
        id: "soci",
      },
    ],
    price: 2.34,
    percentage: 0.3,
    volume: formatCurrency(180000000 / 100000, { mfm: 2 }),
    tvl: undefined,
    name: "SUI/SOCI",
  },
  {
    id: "2",
    coins: [
      {
        image: "/tether.png",
        name: "TETHER",
        id: "tether",
      },
      {
        image: "/soci.png",
        name: "SOCI",
        id: "soci",
      },
    ],
    name: "TETHER/SOCI",
    price: 2.34,
    percentage: 0.2,
    volume: formatCurrency(150000000 / 100000, { mfm: 2 }),
    tvl: undefined,
  },
  {
    id: "3",
    coins: [
      {
        image: "/tether.png",
        name: "TETHER",
        id: "tether",
      },
      {
        image: "/sui.png",
        name: "SUI",
        id: "sui",
      },
    ],
    name: "TETHER/SUI",
    price: 2.34,
    percentage: 0.2,
    volume: formatCurrency(150000000 / 100000, { mfm: 2 }),
    tvl: undefined,
  },
];

export {
  navLinks,
  currencies,
  priceStats,
  rates,
  agents,
  paymentDetails,
  balances,
  userPools,
  availablePools,
};

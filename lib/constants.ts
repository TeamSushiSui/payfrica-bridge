const currencies = [
  {
    id: "650b2e4f9b1d2c001c8d4f8a",
    name: "NGNC",
    coinType: "0x920dda…::ngnc::NGNC",
    suiTokens: [
      {
        id: "650b2f1e9b1d2c001c8d4f8c",
        name: "SUI",
        coinType: "0x2::sui::SUI",
        price: "0.00012345",
        priceUpdatedAt: "2025-04-25T12:00:00.000Z",
      },
      {
        id: "650b2f2b9b1d2c001c8d4f8d",
        name: "xSUI",
        coinType: "0x2::sui::X_SUI",
        price: "0.00013333",
        priceUpdatedAt: "2025-04-25T12:05:00.000Z",
      },
    ],
    createdAt: "2025-04-24T10:00:00.000Z",
    updatedAt: "2025-04-24T10:00:00.000Z",
  },
  {
    id: "650b2e5c9b1d2c001c8d4f8b",
    name: "USDC",
    coinType: "0x2::usdc::USDC",
    suiTokens: [
      {
        id: "650b2f3a9b1d2c001c8d4f8e",
        name: "SUI",
        coinType: "0x2::sui::SUI",
        price: "0.00098765",
        priceUpdatedAt: "2025-04-25T12:10:00.000Z",
      },
    ],
    createdAt: "2025-04-24T10:05:00.000Z",
    updatedAt: "2025-04-24T10:05:00.000Z",
  },
];

const currencyLogo = {
  NGNC: "/naira.png",
  USDC: "/tether.png",
  SUI: "/sui.png",
  xSUI: "/sui.png",
};

export { currencies, currencyLogo };

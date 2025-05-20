interface SuiToken {
  id: string;
  name: string;
  coinType: string;
  baseTokenId?: string; // Optional since not all tokens have this
  price: string;
  priceUpdatedAt: string;
  decimal: number;
}

interface Token {
  id: string;
  name: string;
  coinType: string;
  suiTokens: SuiToken[];
  createdAt: string;
  updatedAt: string;
}

interface IBestAgent {
  id: string;
  accountName: string;
  accountNumber: string;
  accountBank: string;
  comment: string;
}

interface IUserPoolType {
  amount_added: string;
  id: {
    id: string;
  };
  owner: string;
  pool_id: string;
}

interface IRes {
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
}

export type { Token, SuiToken, IBestAgent, IUserPoolType, IRes };

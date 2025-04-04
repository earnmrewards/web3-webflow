/// <reference types="vite/client" />

import { Address } from "./types";

interface StakingEnv {
  readonly VITE_STAKING_ADDRESS: Address;
  readonly VITE_SN_NFT_COLLECTION_ADDRESS: Address;
  readonly VITE_ALCHEMY_ARB_RPC_URL: Address;
}

interface TokenExchangeEnv {
  readonly VITE_TOKEN_EXCHANGE_CONTRACT_ADDRESS: Address;
  readonly VITE_EARNM_OLD_POL_ADDRESS: Address;
  readonly VITE_EARNM_OLD_ETH_ADDRESS: Address;
  readonly VITE_STORMX_ADDRESS: Address;
  readonly VITE_EARNM_NEW_POL_ADDRESS: Address;
  readonly VITE_EARNM_NEW_ETH_ADDRESS: Address;
}

interface ImportMetaEnv extends TokenExchangeEnv, StakingEnv {
  readonly VITE_ALCHEMY_API_KEY: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_API_SECRET: string;
  readonly VITE_SMART_NODES_CONTRACT_ADDRESS: string;
  readonly VITE_ENVIRONMENT: string;
  readonly VITE_SMART_NODES_API: string;
  readonly VITE_SMART_NODES_PARTNER_API: string;
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

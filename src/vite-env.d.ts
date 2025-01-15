/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_API_KEY: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_API_SECRET: string;
  readonly VITE_SMART_NODES_CONTRACT_ADDRESS: string;
  readonly VITE_ENVIRONMENT: string;
  readonly VITE_SMART_NODES_API: string;
  readonly VITE_SMART_NODES_PARTNER_API: string;
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
  readonly VITE_TOKEN_EXCHANGE_CONTRACT_ADDRESS: string;
  readonly VITE_OLD_TOKEN_EXCHANGE_CONTRACT_ADDRESS: string;
  readonly VITE_OLD_TOKEN_STMX_CONTRACT_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

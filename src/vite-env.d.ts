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
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

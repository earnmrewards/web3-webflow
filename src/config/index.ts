import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { sepolia } from "@account-kit/infra";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [[{ type: "email" }], [{ type: "injected" }]],
  },
};

export const config = createConfig(
  {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    chain: sepolia,
  },
  uiConfig
);

export const queryClient = new QueryClient();

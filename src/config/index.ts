import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { arbitrum, arbitrumSepolia } from "@account-kit/infra";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [[{ type: "injected" }]],
  },
};

export const config = createConfig(
  {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    chain:
      import.meta.env.VITE_ENVIRONMENT === "production"
        ? arbitrum
        : arbitrumSepolia,
  },
  uiConfig
);

export const queryClient = new QueryClient();

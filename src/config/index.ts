import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { polygonAmoy } from "@account-kit/infra";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [{ type: "passkey" }],
      [{ type: "injected" }],
    ],
    addPasskeyOnSignup: true,
  },
};

export const config = createConfig(
  {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    chain: polygonAmoy,
  },
  uiConfig
);

export const queryClient = new QueryClient();

import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { polygonAmoy } from "@account-kit/infra";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [[{ type: "email" }], [{ type: "passkey" }]],
    addPasskeyOnSignup: true,
  },
};

export const config = createConfig(
  {
    // TODO: Update the API Key
    // apiKey: "api-key",
    rpcUrl: "https://polygon-amoy.g.alchemy.com/v2",
    chain: polygonAmoy,
  },
  uiConfig
);

export const queryClient = new QueryClient();

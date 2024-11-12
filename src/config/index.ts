import { createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { alchemy, arbitrum, arbitrumSepolia } from "@account-kit/infra";

export const config = createConfig(
  {
    transport: alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }),
    chain:
      import.meta.env.VITE_ENVIRONMENT === "production"
        ? arbitrum
        : arbitrumSepolia,
    ssr: false,
  },
  {
    auth: {
      sections: [[{ type: "external_wallets" }]],
      addPasskeyOnSignup: false,
    },
  }
);

export const queryClient = new QueryClient();

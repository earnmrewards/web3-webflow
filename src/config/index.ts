import {
  alchemy,
  arbitrum,
  arbitrumSepolia,
  polygonAmoy,
} from "@account-kit/infra";
import { createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";

export const config = createConfig(
  {
    transport: alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }),
    chain: arbitrumSepolia,
    chains: [
      {
        chain: arbitrum,
      },
      {
        chain: polygonAmoy,
      },
    ],
    // FIXME: Change to correct flag after Alchemy team fix the Hydration error
    ssr: true,
  },
  {
    auth: {
      sections: [
        [
          {
            type: "external_wallets",
            walletConnect: {
              projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
            },
          },
        ],
      ],
    },
  }
);

export const queryClient = new QueryClient();

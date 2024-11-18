import { alchemy, arbitrum, arbitrumSepolia } from "@account-kit/infra";
import { createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";

// const uiConfig: AlchemyAccountsUIConfig = {
//   illustrationStyle: "outline",
//   auth: {
//     sections: [[{ type: "injected" }]],
//   },
// };

// export const config = createConfig(
//   {
//     apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
//     chain:
//       import.meta.env.VITE_ENVIRONMENT === "production"
//         ? arbitrum
//         : arbitrumSepolia,
//   },
//   uiConfig
// );

export const config = createConfig(
  {
    transport: alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }),
    chain:
      import.meta.env.VITE_ENVIRONMENT === "production"
        ? arbitrum
        : arbitrumSepolia,
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

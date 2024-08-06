import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { config, queryClient } from "../config";
import { StoreProvider } from "../contexts/use-store";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider config={config} queryClient={queryClient}>
        <StoreProvider>{children}</StoreProvider>
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}

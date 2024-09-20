import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { config, queryClient } from "../config";
import { StoreProvider } from "../contexts/use-store";
import { NavigateProvider } from "../contexts/use-navigate";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigateProvider>
        <AlchemyAccountProvider config={config} queryClient={queryClient}>
          <StoreProvider>{children}</StoreProvider>
        </AlchemyAccountProvider>
      </NavigateProvider>
    </QueryClientProvider>
  );
}

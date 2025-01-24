import { AddressButton } from "./address-button";
import { BalanceContainer } from "./balance-container";
import { TOKEN_EXCHANGE_FEATURE_ID } from "./config";
import { ExchangeContainer } from "./exchange-container";
import { LogInContainer } from "./log-in-container";

export function TokenExchange() {
  return (
    <>
      <LogInContainer />
      <ExchangeContainer />
      <BalanceContainer />
      <AddressButton />
    </>
  );
}

TokenExchange.featureId = TOKEN_EXCHANGE_FEATURE_ID;

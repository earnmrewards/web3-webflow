import { TOKEN_EXCHANGE_FEATURE_ID } from "./config";
import { ExchangeContainer } from "./exchange-container";
import { LogInContainer } from "./log-in-container";

export function TokenExchange() {
  return (
    <>
      <LogInContainer />
      <ExchangeContainer />
    </>
  );
}

TokenExchange.featureId = TOKEN_EXCHANGE_FEATURE_ID;

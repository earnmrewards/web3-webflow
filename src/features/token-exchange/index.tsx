import { TOKEN_EXCHANGE_FEATURE_ID } from "./config";
import { LogInContainer } from "./log-in-container";

export function TokenExchange() {
  return (
    <>
      <LogInContainer />
    </>
  );
}

TokenExchange.featureId = TOKEN_EXCHANGE_FEATURE_ID;

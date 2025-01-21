import { STAKING_FEATURE_ID } from "./config";
import { LogInContainer } from "./log-in-container";

export function Staking() {
  return (
    <>
      <LogInContainer />
    </>
  );
}

Staking.featureId = STAKING_FEATURE_ID;

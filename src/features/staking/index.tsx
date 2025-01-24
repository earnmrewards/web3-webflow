import { STAKING_FEATURE_ID } from "./config";
import { LogInContainer } from "./log-in-container";
import { StakingContainer } from "./staking-container";

export function Staking() {
  return (
    <>
      <LogInContainer />
      <StakingContainer />
    </>
  );
}

Staking.featureId = STAKING_FEATURE_ID;

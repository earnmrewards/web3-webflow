import { AddressButton } from "./address-button";
import { BannerContainer } from "./banner-container";
import { STAKING_FEATURE_ID } from "./config";
import { LogInContainer } from "./log-in-container";
import { StakingContainer } from "./staking-container";
import { StatsContainer } from "./stats-container";

export function Staking() {
  return (
    <>
      <LogInContainer />
      <AddressButton />
      <BannerContainer />
      <StatsContainer />
      <StakingContainer />
    </>
  );
}

Staking.featureId = STAKING_FEATURE_ID;

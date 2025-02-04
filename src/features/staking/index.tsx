import { StakeProvider } from "@/contexts/staking/use-stake";
import { AddressButton } from "./address-button";
import { BannerContainer } from "./banner-container";
import { STAKING_FEATURE_ID } from "./config";
import { LogInContainer } from "./log-in-container";
import { StakingContainer } from "./staking-container";
import { StatsContainer } from "./stats-container";
import { LoaderContainer } from "./loader-container";

export function Staking() {
  return (
    <StakeProvider>
      <LogInContainer />
      <AddressButton />
      <BannerContainer />
      <StatsContainer />
      <StakingContainer />
      <LoaderContainer />
    </StakeProvider>
  );
}

Staking.featureId = STAKING_FEATURE_ID;

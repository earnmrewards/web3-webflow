import { StakeProvider } from "@/contexts/staking/use-stake";
import { AddressButton } from "./address-button";
import { BannerContainer } from "./banner-container";
import { STAKING_FEATURE_ID } from "./config";
import { LogInContainer } from "./log-in-container";
import { StatsContainer } from "./stats-container";
import { LoaderContainer } from "./loader-container";
import { SuccessModal } from "./success-modal";
import { StakingComponent } from "./staking-component";
import { RewardPoolContainer } from "./reward-pool";

export function Staking() {
  return (
    <StakeProvider>
      <LogInContainer />
      <AddressButton />
      <BannerContainer />
      <StatsContainer />
      <LoaderContainer />
      <SuccessModal />
      <RewardPoolContainer />

      <StakingComponent />
    </StakeProvider>
  );
}

Staking.featureId = STAKING_FEATURE_ID;

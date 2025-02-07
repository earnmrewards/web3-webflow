import { useEffect, useState } from "react";
import {
  BANNER_CONTAINER_ID,
  CLAIMING_TRIGGER_BUTTON_ID,
  STAKING_CONTAINER_ID,
} from "./config";
import { useUser } from "@account-kit/react";
import { useClaimableRewards } from "@/hooks/staking/use-claimable-rewards";
import { useStake } from "@/contexts/staking/use-stake";

export function BannerContainer() {
  const user = useUser();
  const [timeLeft, setTimeLeft] = useState(calculateCountdown());

  const { data: claimableRewards } = useClaimableRewards();
  const { claim } = useStake();

  function getBannerComponent() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const banner = container.querySelector(
      `#${BANNER_CONTAINER_ID}`
    ) as HTMLDivElement;
    if (!banner) return;

    return banner;
  }

  function updateBannerColor() {
    const banner = getBannerComponent();
    if (!banner) return;

    banner.style.backgroundColor = user ? "#F9FD30" : "#FD2E53";
  }
  useEffect(updateBannerColor, [user]);

  function calculateCountdown() {
    const now = new Date();

    // 00:00:00 GMT+0000
    const nextMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0)
    );

    const diffInSeconds = Math.floor(
      (nextMonth.getTime() - now.getTime()) / 1000
    );

    const days = Math.floor(diffInSeconds / (60 * 60 * 24))
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (diffInSeconds % 60).toString().padStart(2, "0");

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  function updateCountdown() {
    if (claimableRewards > 0 || !user) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }
  useEffect(updateCountdown, [claimableRewards, user]);

  function updateBannerContent() {
    const banner = getBannerComponent();
    if (!banner) return;

    if (!user) {
      banner.innerHTML = `Connect your wallet to see your SmartNodes and Rewards! <strong id="web3-auth-modal-button" class="underline cursor-pointer">Connect Wallet</strong>`;
      return;
    }

    if (claimableRewards > 0) {
      banner.innerHTML = `It’s time! Claim your reward now and enjoy! <strong id="web3-claim-trigger" class="underline cursor-pointer">Claim Now!</strong>`;
      return;
    }

    banner.innerHTML = `Claim Your Rewards in: <strong>${timeLeft}</strong>`;
  }
  useEffect(updateBannerContent, [user, timeLeft, claimableRewards]);

  function triggerClaim() {
    const banner = getBannerComponent();
    if (!banner) return;

    const button = banner.querySelector(
      `#${CLAIMING_TRIGGER_BUTTON_ID}`
    ) as HTMLSpanElement;
    if (!button) return;

    button.addEventListener("click", claim);

    return () => {
      button.removeEventListener("click", claim);
    };
  }
  useEffect(triggerClaim, [claim]);

  return null;
}

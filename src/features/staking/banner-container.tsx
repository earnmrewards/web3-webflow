import { useEffect } from "react";
import { BANNER_CONTAINER_ID, STAKING_CONTAINER_ID } from "./config";
import { useUser } from "@account-kit/react";

export function BannerContainer() {
  const user = useUser();

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

  function updateBannerContent() {
    const banner = getBannerComponent();
    if (!banner) return;

    if (!user) {
      banner.innerHTML = `Connect your wallet to see your SmartNodes and Rewards! <button id="web3-auth-modal-button" class="underline font-bold">Connect Wallet</button>`;
      return;
    }

    banner.innerHTML = `Claim Your Rewards in: <strong>02d 12h 30m 00s</strong>`;
  }
  useEffect(updateBannerContent, [user]);

  return null;
}

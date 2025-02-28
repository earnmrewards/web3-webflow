import { useUser } from "@account-kit/react";
import { BANNER_CONTAINER_ID, STAKING_CONTAINER_ID } from "./config";
import { useEffect } from "react";

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

  function updateBannerVisibility() {
    const banner = getBannerComponent();
    if (!banner) return;

    banner.style.display = user ? "none" : "flex";
  }
  useEffect(updateBannerVisibility, [user]);

  return null;
}

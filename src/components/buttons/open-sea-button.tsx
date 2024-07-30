import { useEffect } from "react";

const COMPONENT_ID = "web3-open-sea-button";
const openSeaUrl =
  "https://testnets.opensea.io/account?search%5Bcollections%5D%5B0%5D=";
const collection = "dropbox-1";

export function OpenSeaButton() {
  useEffect(() => {
    const anchor = document.getElementById(COMPONENT_ID) as HTMLAnchorElement;
    if (!anchor) return;

    anchor.href = `${openSeaUrl}${collection}`;
  }, []);

  return null;
}

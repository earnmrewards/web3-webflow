import { useCallback, useEffect } from "react";
import { REWARD_POOL_CONTAINER_ID, STAKING_CONTAINER_ID } from "./config";
import { useCustomBundler } from "@/hooks/web3/use-custom-bundler";
import { abi, CONTRACT_ADDRESS } from "@/config/contracts/staking";
import { useUser } from "@account-kit/react";

const months = ["January", "February", "March", "April", "May"];
const FIXED_YEAR = 2025;

export function RewardPoolContainer() {
  const user = useUser();

  const { readContract } = useCustomBundler({ chain: "arbitrum" });

  function getContainer() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const poolContainer = container.querySelector(
      `#${REWARD_POOL_CONTAINER_ID}`
    );
    if (!poolContainer) return;

    return poolContainer;
  }

  function getLastDayTimestampOfMonth(index: number) {
    // TODO: Remove me for prod
    if (index === 0) {
      return 1739318400;
    }

    const date = new Date(Date.UTC(FIXED_YEAR, index + 1, 0, 0, 0, 0));
    return Math.floor(date.getTime() / 1000);
  }

  const getTimestampReward = useCallback(
    async (timestamp: number) => {
      try {
        const reward = await readContract({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "getRewardsFromIterationTimestamp",
          args: [timestamp],
        });

        const precision = 10 ** 18;
        return Number(reward) / precision;
      } catch (error) {
        return 0;
      }
    },
    [readContract]
  );

  function addCardsByMonth() {
    const container = getContainer();
    if (!container) return;

    const currentMonthIndex = new Date().getMonth() - 1;
    months.forEach((month, index) => {
      const currentChildren = container.children.length;
      if (index > currentMonthIndex || currentChildren > index) return;

      const card = document.createElement("div");
      card.id = "w-node-_7268edfa-b76d-877e-7adb-9b6dd10ae2ca-71367837";
      card.className = "div-block-266";

      const monthText = document.createElement("div");
      monthText.className = "text-block-24";
      monthText.textContent = `${month} ${FIXED_YEAR}`;

      const infoText = document.createElement("span");
      infoText.className = "text-block-25";
      infoText.textContent = "---";

      card.append(monthText);
      card.append(infoText);

      container.appendChild(card);
    });
  }
  useEffect(addCardsByMonth, []);

  function updateCardsValue() {
    const container = getContainer();
    if (!container) return;

    const currentMonthIndex = new Date().getMonth() - 1;
    if (!user) {
      months.forEach((_, index) => {
        const element = container.children.item(index);
        if (!element) return;

        const label = element.querySelector("span");
        if (!label) return;

        label.innerText = "---";
      });
      return;
    }

    (async () => {
      const promises = months.map(async (_, index) => {
        if (index > currentMonthIndex) return null;

        const timestamp = getLastDayTimestampOfMonth(index);
        const rewardValue = await getTimestampReward(timestamp);

        return rewardValue;
      });

      const results = (await Promise.all(promises)).filter(
        (data) => data !== null
      );

      results.forEach((rewardValue, index) => {
        const element = container.children.item(index);
        if (!element) return;

        const label = element.querySelector("span");
        if (!label) return;

        label.innerText = String(rewardValue);
      });
    })();
  }
  useEffect(updateCardsValue, [getTimestampReward, user]);

  return null;
}

import { useEffect } from "react";
import { REWARD_POOL_CONTAINER_ID, STAKING_CONTAINER_ID } from "./config";
import { useIterations } from "@/hooks/staking/use-iterations";
import { useUser } from "@account-kit/react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const FIXED_YEAR = 2025;
const MAX_CARDS = 5;

export function RewardPoolContainer() {
  const user = useUser();

  const { data, loading } = useIterations({
    page: 1,
    take: 20,
  });

  function getContainer() {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const poolContainer = container.querySelector(
      `#${REWARD_POOL_CONTAINER_ID}`
    );
    if (!poolContainer) return;

    return poolContainer;
  }

  function getDisplayMonths() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const firstMonth = currentMonth - MAX_CARDS + 1;

    const shouldShowFirstMonth = currentDate.getFullYear() === FIXED_YEAR;
    const firstMonthIndex = shouldShowFirstMonth ? 1 : 0;

    const monthsWithIndex = months.map((month, index) => ({ month, index }));

    return monthsWithIndex.slice(
      firstMonth > 0 ? firstMonth : firstMonthIndex,
      currentMonth + 1
    );
  }

  function addCardsByMonth() {
    const container = getContainer();
    if (!container) return;

    getDisplayMonths().forEach(({ month }, index) => {
      const currentChildren = container.children.length;
      if (currentChildren > index) return;

      const card = document.createElement("div");
      card.id = "w-node-_7268edfa-b76d-877e-7adb-9b6dd10ae2ca-71367837";
      card.className = "div-block-266";

      const monthText = document.createElement("div");
      monthText.className = "text-block-24";
      monthText.textContent = `${month} ${FIXED_YEAR}`;

      const infoText = document.createElement("a");
      infoText.className = "text-block-25";
      infoText.textContent = "---";
      infoText.href = "#";

      card.append(monthText);
      card.append(infoText);

      container.appendChild(card);
    });
  }
  useEffect(addCardsByMonth, []);

  function updateCardsValue() {
    const container = getContainer();
    if (!container || !data || loading) return;

    const { iterations } = data;
    let counter = 0;
    iterations.forEach(
      ({ iterationEnd, iterationRewardEther, rewardsCalulationCsv }) => {
        const displayMonth = getDisplayMonths().find(({ index }) => {
          const date = new Date(iterationEnd);

          return date.getMonth() + 1 === index;
        });
        if (!displayMonth) return;

        const element = container.children.item(counter);
        if (!element) return;

        const label = element.querySelector("a") as HTMLAnchorElement;
        if (!label) return;

        label.href = rewardsCalulationCsv;
        label.target = "_blank";
        label.innerText = String(
          iterationRewardEther.toLocaleString(undefined, {
            maximumFractionDigits: 4,
          })
        );
        label.style.textDecoration = "underline";
        counter++;
      }
    );
  }
  useEffect(updateCardsValue, [user, loading, data]);

  return null;
}

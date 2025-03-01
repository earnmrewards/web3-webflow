import { useEffect, useState } from "react";
import { REWARD_POOL_CONTAINER_ID, STAKING_CONTAINER_ID } from "./config";
import { useIterations } from "@/hooks/staking/use-iterations";
import { createPortal } from "react-dom";
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
] as const;
const FIXED_YEAR = 2025;
const MAX_CARDS = 5;

export function RewardPoolContainer() {
  const user = useUser();
  const [component, setComponent] = useState<HTMLElement | null>(null);

  const { data, loading } = useIterations({
    page: 1,
    take: 20,
  });

  useEffect(() => {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const poolContainer = container.querySelector(
      `#${REWARD_POOL_CONTAINER_ID}`
    );
    if (!poolContainer) return;

    setComponent(poolContainer as HTMLElement);
  }, []);

  function getDisplayMonths() {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    const firstMonth = currentMonth - MAX_CARDS + 1;

    // TODO: Remove me and upgrade to use endpoint
    const iterationTime = 1740999600000;
    if (currentDate.getTime() < iterationTime) {
      currentMonth--;
    }

    const shouldShowFirstMonth = currentDate.getFullYear() === FIXED_YEAR;
    const firstMonthIndex = shouldShowFirstMonth ? 1 : 0;

    const monthsWithIndex = months.map((month, index) => ({ month, index }));

    return monthsWithIndex.slice(
      firstMonth > 0 ? firstMonth : firstMonthIndex,
      currentMonth + 1
    );
  }

  function getCardItems() {
    if (!data || loading || !user) {
      return getDisplayMonths().map(({ month }) => ({
        month,
        csv: "",
        reward: 0,
      }));
    }

    const result = getDisplayMonths().map(({ month, index: displayIndex }) => {
      const iteration = data.iterations.find(
        ({ iterationFrom }) =>
          new Date(iterationFrom).getMonth() + 1 === displayIndex
      );
      if (!iteration) return { month, csv: "", reward: 0 };

      return {
        month,
        csv: iteration.rewardsCalculationCsv,
        reward: iteration.iterationRewardEther,
      };
    });

    return result;
  }

  if (!component) return null;

  return createPortal(
    getCardItems().map(({ month, csv, reward }, index) => (
      <div
        key={index}
        id="w-node-_7268edfa-b76d-877e-7adb-9b6dd10ae2ca-71367837"
        className="div-block-266"
      >
        <div className="text-block-24">
          {month} {FIXED_YEAR}
        </div>
        <a
          data-active={reward > 0}
          className="text-block-25 data-[active=true]:underline"
          href={reward > 0 ? csv : undefined}
          target={reward > 0 ? "_blank" : undefined}
        >
          {reward > 0
            ? reward.toLocaleString(undefined, { maximumFractionDigits: 4 })
            : "---"}
        </a>
      </div>
    )),
    component
  );
}

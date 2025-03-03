import { useEffect, useState } from "react";
import {
  MAX_REWARDS_CARDS,
  months,
  REWARD_POOL_CONTAINER_ID,
  STAKING_CONTAINER_ID,
} from "../config";
import { createPortal } from "react-dom";
import { useUser } from "@account-kit/react";
import { useIterations } from "@/hooks/staking/use-iterations";
import { RewardPoolCard } from "./reward-pool-card";
import { RewardPoolCardSkeleton } from "./reward-pool-card.skeleton";

export function RewardPoolContainer() {
  const [component, setComponent] = useState<HTMLElement | null>(null);

  const user = useUser();
  const { data, loading } = useIterations({ page: 1, take: MAX_REWARDS_CARDS });

  useEffect(() => {
    const container = document.getElementById(STAKING_CONTAINER_ID);
    if (!container) return;

    const poolContainer = container.querySelector(
      `#${REWARD_POOL_CONTAINER_ID}`
    );
    if (!poolContainer) return;

    setComponent(poolContainer as HTMLElement);
  }, []);

  function getCards() {
    if (!data || loading) return [];

    return data.iterations.map((iteration) => {
      const iterationEnd = new Date(iteration.iterationEnd);
      const month = months[iterationEnd.getMonth()];

      const toBeFilledAt = new Date(iteration.toBeFilledAt);
      if (toBeFilledAt.getTime() >= new Date().getTime()) {
        return {
          month,
          toBeFilledAt: iteration.toBeFilledAt,
          year: toBeFilledAt.getFullYear(),
        };
      }

      return {
        month,
        reward: iteration.iterationRewardEther,
        csv: iteration.rewardsCalculationCsv,
        year: iterationEnd.getFullYear(),
      };
    });
  }

  if (!component) return null;

  if (loading || !user) {
    return createPortal(
      [...Array(MAX_REWARDS_CARDS)].map((_, index) => (
        <RewardPoolCardSkeleton key={index} index={index} nullable={!user} />
      )),
      component
    );
  }

  const cards = getCards().reverse();
  return createPortal(
    cards.map((iteration, index) => (
      <RewardPoolCard key={index} {...iteration} />
    )),
    component
  );
}

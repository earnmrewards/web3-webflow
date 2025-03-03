import { useEffect, useState } from "react";
import {
  MAX_REWARDS_CARDS,
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

    return data.iterations.map(
      ({
        cardTitle,
        iterationRewardEther,
        toBeFilledAt,
        rewardsCalculationCsv,
      }) => {
        if (iterationRewardEther === 0) {
          return {
            title: cardTitle,
            toBeFilledAt,
          };
        }

        return {
          title: cardTitle,
          reward: iterationRewardEther,
          csv: rewardsCalculationCsv,
        };
      }
    );
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

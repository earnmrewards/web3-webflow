import { useStake } from "@/contexts/staking/use-stake";
import {
  STAKING_SUCCESS_MODAL_DESC_ID,
  STAKING_SUCCESS_MODAL_ID,
  STAKING_SUCCESS_MODAL_TITLE_ID,
} from "./config";
import { useEffect } from "react";

const alias = {
  stake: {
    title: "Staking",
    description: "staked",
  },
  unstake: {
    title: "Unstaking",
    description: "unstaked",
  },
  claim: {
    title: "Reward Claim",
    description: "claimed",
  },
} as const;

export function SuccessModal() {
  const { finished, result } = useStake();

  function showModal() {
    const modal = document.getElementById(STAKING_SUCCESS_MODAL_ID);
    if (!modal) return;

    modal.style.display = finished ? "flex" : "none";
  }
  useEffect(showModal, [finished]);

  function updateModalTexts() {
    const container = document.getElementById(STAKING_SUCCESS_MODAL_ID);
    if (!container || !result) return;

    const title = container.querySelector(`#${STAKING_SUCCESS_MODAL_TITLE_ID}`);
    if (title) {
      title.innerHTML = `${alias[result.operation].title} Successful`;
    }

    const description = container.querySelector(
      `#${STAKING_SUCCESS_MODAL_DESC_ID}`
    );
    if (description) {
      const { operation, selectedNodes, selectedRewards } = result;
      const descAlias = alias[operation].description;
      const plural = selectedNodes.length > 1 ? "s" : "";

      let finalDescription = `You successfully ${descAlias} <strong>${selectedNodes.length} SmartNode${plural}</strong>`;
      if (operation === "claim") {
        finalDescription += ` and earned <strong>${selectedRewards?.toLocaleString(
          undefined,
          {
            maximumFractionDigits: 4,
          }
        )} $EARNM</strong>`;
      }

      description.innerHTML = finalDescription;
    }
  }
  useEffect(updateModalTexts, [result]);

  return null;
}

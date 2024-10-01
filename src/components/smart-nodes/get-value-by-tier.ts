import { SMART_NODES_TIERS_VALUE } from "./config";

export function getValueByTier(tier: string) {
  const availableTiers = Object.keys(SMART_NODES_TIERS_VALUE);
  if (!availableTiers.includes(tier)) {
    return SMART_NODES_TIERS_VALUE[availableTiers[0]];
  }

  return SMART_NODES_TIERS_VALUE[tier];
}

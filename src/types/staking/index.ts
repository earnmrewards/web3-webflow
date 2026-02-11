import { z } from "zod";

export const heldResponseSchema = z.object({
  total: z.number(),
  page: z.number(),
  take: z.number(),
  items: z.array(
    z.object({
      tokenId: z.number(),
      receivedAt: z.string(),
    })
  ),
});

export const stakedResponseSchema = z.object({
  total: z.number(),
  page: z.number(),
  take: z.number(),
  totalRewards: z.number(),
  items: z.array(
    z.object({
      tokenId: z.number(),
      reward: z.number(),
      stakedAt: z.string(),
    })
  ),
});

export const iterationResponseSchema = z.object({
  page: z.number(),
  take: z.number(),
  total: z.number(),
  items: z.array(
    z.object({
      cardTitle: z.string(),
      iterationRewardEther: z.number(),
      toBeFilledAt: z.string(),
      iterationFrom: z.string(),
      iterationEnd: z.string(),
      totalSnStaked: z.number(),
      iterationRewardErc20: z.string(),
      rewardsCalculationCsv: z.string().url().nullable(),
    })
  ),
});

export const historyResponse = z.object({
  total: z.number(),
  take: z.number(),
  page: z.number(),
  items: z.array(
    z.object({
      actionTimestamp: z.string(),
      actionHash: z.string().min(1),
      smartNodeIds: z.array(z.number()),
      claimedAmountEther: z.number(),
      actionType: z.enum(["stake", "unstake", "claim"]),
    })
  ),
});

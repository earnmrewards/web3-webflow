import { z } from "zod";
import { paginationSchema } from "..";

export const heldResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    smartNodes: z.object({
      data: z.array(
        z.object({
          tokenId: z.number(),
          receivedAt: z.string(),
        })
      ),
      ...paginationSchema.shape,
    }),
  }),
});

export const stakedResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    smartNodes: z.object({
      data: z.array(
        z.object({
          tokenId: z.number(),
          reward: z.number(),
          stakedAt: z.string(),
        })
      ),
      ...paginationSchema.shape,
    }),
    totalRewards: z.number(),
  }),
});

export const iterationResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    iterations: z.object({
      data: z.array(
        z.object({
          cardTitle: z.string(),
          iterationRewardEther: z.number(),
          toBeFilledAt: z.string(),
          iterationFrom: z.string(),
          iterationEnd: z.string(),
          totalSnStaked: z.number(),
          iterationRewardErc20: z.string(),
          rewardsCalculationCsv: z.string().url(),
        })
      ),
      ...paginationSchema.shape,
    }),
  }),
});

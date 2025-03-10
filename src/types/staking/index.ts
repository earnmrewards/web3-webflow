import { z } from "zod";
import { Address, paginationSchema } from "..";

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

const addressSchema = z.custom<Address>(
  (address) =>
    typeof address === "string" && /^0x[a-fA-F0-9]{40}$/.test(address),
  { message: "Invalid Ethereum address" }
);

export const historyResponse = z.object({
  data: z.array(
    z.object({
      actionDate: z.number(),
      hash: addressSchema,
      nodes: z.array(
        z.object({
          id: z.number(),
        })
      ),
      amount: z.number().positive(),
      reward: z.number().optional(),
      actionType: z.enum(["stake", "unstake", "claim"]),
    })
  ),
  ...paginationSchema.shape,
});

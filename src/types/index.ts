import { z } from "zod";

export type Address = `0x${string}`;
export interface OperationResultType {
  hash?: string;
  email?: string;
}

export const paginationSchema = z.object({
  count: z.number(),
  currentPage: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
  lastPage: z.number(),
});

import { z } from "zod";

const schema = z.object({
  remainingAmount: z.number(),
  unitPrice: z.number(),
});

type ResponseType = z.infer<typeof schema>;

export function getPartnerData(partnerId: string): Promise<ResponseType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: ResponseType = {
        remainingAmount: 10,
        unitPrice: 100,
      };

      if (partnerId === "test") {
        data.unitPrice = 150;
      }

      resolve(data);
    }, 1500);
  });
}

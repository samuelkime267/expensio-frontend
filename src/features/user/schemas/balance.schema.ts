import { z } from "zod";

export const balanceSchema = z.object({
  balance: z.number(),
});

export type BalanceSchemaType = z.infer<typeof balanceSchema>;

import { z } from "zod";

export const getTotalSchema = z.object({
  income: z.object({
    total: z.number(),
    previousTotal: z.number(),
    percentageChange: z.number(),
  }),

  expense: z.object({
    total: z.number(),
    previousTotal: z.number(),
    percentageChange: z.number(),
  }),

  duration: z.string(),
});

export type GetTotalSchemaType = z.infer<typeof getTotalSchema>;

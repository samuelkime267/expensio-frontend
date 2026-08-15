import { z } from "zod";

export const analyticsSchema = z.object({
  duration: z.string(),
  income: z.number(),
  expense: z.number(),
  net: z.number(),
  savingsRate: z.number(),
  previous: z.object({
    income: z.number(),
    expense: z.number(),
  }),
  spendingBreakdown: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
    }),
  ),
  spendingTrends: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
      previousAmount: z.number(),
      percentageChange: z.number().nullable(),
    }),
  ),
  habits: z.object({
    biggestIncrease: z
      .object({
        name: z.string(),
        percentageChange: z.number(),
      })
      .nullable(),
    smallPurchases: z.object({
      count: z.number(),
      total: z.number(),
    }),
    weekendSpend: z.object({
      weekendAverage: z.number(),
      weekdayAverage: z.number(),
      differencePercent: z.number().nullable(),
    }),
  }),
  whereMoneyWent: z.object({
    income: z.number(),
    categories: z.array(
      z.object({
        name: z.string(),
        amount: z.number(),
      }),
    ),
    remaining: z.number(),
  }),
  review: z.string(),
});

export type AnalyticsSchemaType = z.infer<typeof analyticsSchema>;

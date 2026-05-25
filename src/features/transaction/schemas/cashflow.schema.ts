import z from "zod";

export const cashflowSchema = z.object({
  duration: z.enum(["week", "year"]),
  expense: z.array(z.number()),
  income: z.array(z.number()),
  labels: z.array(z.string()),
});

export type CashflowSchemaType = z.infer<typeof cashflowSchema>;

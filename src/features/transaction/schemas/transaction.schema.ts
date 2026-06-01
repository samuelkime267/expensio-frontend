import { ObjectIdSchema } from "@/schemas/objectId.schema";
import { z } from "zod";

export const transactionTypeSchema = z.enum(["Income", "Expense"]);

export const transactionSchema = z.object({
  type: transactionTypeSchema,
  name: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: ObjectIdSchema,
  amount: z.number(),
  category: z.string(),
  description: z.string().optional(),
});

export const transactionsSchema = z.array(transactionSchema);

export type TransactionsSchemaType = z.infer<typeof transactionsSchema>;

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
export type TransactionType = z.infer<typeof transactionTypeSchema>;

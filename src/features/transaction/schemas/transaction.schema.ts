import { ObjectIdSchema } from "@/schemas/objectId.schema";
import { z } from "zod";

export const transactionSchema = z.object({
  type: z.string(),
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

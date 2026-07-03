import { z } from "zod";
import { transactionsSchema } from "./transaction.schema";
import { PaginationSchema } from "@/schemas/pagination.schema";

export const transactionPaginationSchema = z.object({
  transactions: transactionsSchema,
  pagination: PaginationSchema,
});

export type TransactionPaginationSchemaType = z.infer<
  typeof transactionPaginationSchema
>;

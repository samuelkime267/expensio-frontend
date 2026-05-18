import { z } from "zod";

export const createExpenseSchema = z.object({
  name: z.string("Name should be a string"),
  amount: z.coerce
    .number("Amount is required")
    .min(
      0.00000000000000000000001,
      "Value is required and must be greater than zero",
    )
    .nonnegative("Value must be greater than zero"),
  date: z.coerce.date("Date is required"),
  category: z.string("Category is required").min(3, "Category is required"),
  description: z.string().optional(),
});

export type CreateExpenseSchemaType = z.infer<typeof createExpenseSchema>;

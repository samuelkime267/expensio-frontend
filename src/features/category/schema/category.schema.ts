import { z } from "zod";

export const CategorySchema = z.object({
  user: z.string().optional(),
  name: z.string("Name is required"),
  value: z.string("Value is required"),
  description: z.string().optional(),
  isIncome: z.boolean().default(false),
});

export const CategoriesSchema = z.array(CategorySchema);

export type CategoriesSchemaType = z.infer<typeof CategoriesSchema>;
export type CategorySchemaType = z.infer<typeof CategorySchema>;

import { z } from "zod";

export const PaginationSchema = z.object({
  currentPage: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
  maxPage: z.number(),
  count: z.number(),
  totalItems: z.number(),
});

export type PaginationSchemaType = z.infer<typeof PaginationSchema>;

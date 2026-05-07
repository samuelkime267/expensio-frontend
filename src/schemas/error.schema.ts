import { z } from "zod";

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  error: z.string().optional(),
  errors: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
});

export type ApiErrorType = z.infer<typeof ApiErrorSchema>;

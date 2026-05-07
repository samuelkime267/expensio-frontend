import { z } from "zod";

export const createSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
  });
};

import { z } from "zod";

export function createSuccessSchema(): z.ZodObject<{
  success: z.ZodLiteral<true>;
  message: z.ZodString;
}>;

export function createSuccessSchema<T extends z.ZodTypeAny>(
  dataSchema: T,
): z.ZodObject<{
  success: z.ZodLiteral<true>;
  message: z.ZodString;
  data: T;
}>;

export function createSuccessSchema(dataSchema?: z.ZodTypeAny) {
  if (!dataSchema) {
    return z.object({
      success: z.literal(true),
      message: z.string(),
    });
  }

  return z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
  });
}

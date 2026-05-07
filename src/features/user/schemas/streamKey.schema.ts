import { ApiErrorSchema } from "@/schemas/error.schema";
import { createSuccessSchema } from "@/utils";
import { z } from "zod";

export const StreamKeySchema = z.object({
  streamKey: z.string(),
});

export const GetStreamKeySuccessSchema = createSuccessSchema(StreamKeySchema);

export const GetStreamKeyResponseSchema = z.union([
  GetStreamKeySuccessSchema,
  ApiErrorSchema,
]);

export type GetStreamKeyResponse = z.infer<typeof GetStreamKeyResponseSchema>;

export type GetStreamKeySuccess = z.infer<typeof GetStreamKeySuccessSchema>;

export type StreamKey = z.infer<typeof StreamKeySchema>;

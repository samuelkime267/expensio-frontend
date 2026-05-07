import { z } from "zod";

export const TokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TokenSchemaType = z.infer<typeof TokenSchema>;

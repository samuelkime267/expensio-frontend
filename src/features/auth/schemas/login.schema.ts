import { z } from "zod";
import { UserSchema } from "./user.schema";
import { TokenSchema } from "./token.schema";
import { createSuccessSchema } from "@/utils";

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string("Password is required").min(1, "Password is required"),
});

export const LoginResponseSchema = z.object({
  user: UserSchema,
  token: TokenSchema,
});

export const LoginSuccessSchema = createSuccessSchema(LoginResponseSchema);

export type LoginSuccessSchemaType = z.infer<typeof LoginSuccessSchema>;
export type LoginResponseSchemaType = z.infer<typeof LoginResponseSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;

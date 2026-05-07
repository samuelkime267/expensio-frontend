import { ObjectIdSchema } from "@/schemas/objectId.schema";
import { z } from "zod";

export const UserSchema = z.object({
  _id: ObjectIdSchema,
  name: z.string().min(1),

  username: z.string().optional(),

  email: z.email(),

  password: z.string().optional(),

  authProvider: z.enum(["local", "google"]).default("local"),

  providerId: z.string().nullable().optional(),

  profilePicture: z.string().nullable().optional(),

  isEmailVerified: z.boolean().default(false),

  emailVerificationToken: z.string().nullable().optional(),

  emailVerificationTokenExpiryDate: z.coerce.date().nullable().optional(),

  passwordResetToken: z.string().nullable().optional(),

  passwordResetTokenExpiryDate: z.coerce.date().nullable().optional(),

  otpLastSentAt: z.coerce.date().nullable().optional(),

  otpAttempts: z.number().default(0),
});

export const PublicUserSchema = UserSchema.omit({
  password: true,
  emailVerificationToken: true,
  passwordResetToken: true,
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type PublicUserSchemaType = z.infer<typeof PublicUserSchema>;

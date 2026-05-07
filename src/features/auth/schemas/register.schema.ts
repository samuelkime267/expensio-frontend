import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string("Name is required").min(3, "Name is required"),
    username: z
      .string("Username is required")
      .min(3, "Username must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    password: z
      .string("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z
      .string("Please confirm your password")
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

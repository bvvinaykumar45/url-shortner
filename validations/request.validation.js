import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters long.")
    .regex(/[a-z]/, "Password must contain atleast one lowercase character.")
    .regex(/[A-Z]/, "Password must contain atleast one uppercase character.")
    .regex(/\d/, "Password must contain atleast one numeric character.")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain atleast one special character.",
    ),
});

export const loginPostRequestBodySchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const shortenPostRequestBodySchema = z.object({
  url: z.url(),
  code: z.string().max(10).optional(),
});

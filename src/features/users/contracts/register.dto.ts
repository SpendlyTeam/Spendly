import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(4, { error: "Username is too short" }),
  email: z.email({ error: "E-mail is required" }),
  password: z.string().min(8, { error: "Password is too short" }),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;

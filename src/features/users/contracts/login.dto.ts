import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.email({ error: "E-mail is required" }),
  password: z.string().min(8, { error: "Password is too short" }),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;

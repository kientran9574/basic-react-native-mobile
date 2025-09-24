import { z } from "zod";

export const reigsterSchema = z.object({
  name: z.string().min(6, "Full name minium must more or enough 6 word"),
  password: z.string().min(6, "Password minium must more or enough 6 word"),
  email: z.string().email("Email not is valid"),
});
export const loginSchema = z.object({
  username: z.string().email("Email not is valid"),
  password: z.string().min(6, "Password minium must more or enough 6 word"),
});
export type ReigsterBody = z.infer<typeof reigsterSchema>;
export type LoginBody = z.infer<typeof loginSchema>;

import { z } from "zod";
import { RoleEnum } from "./role.schema";

export const UserSchema = z.object({
  id: z.number().int().nonnegative(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  phoneNumber: z.string().optional(),
  birthDate: z.string().optional(),
  role: RoleEnum,
});

export type User = z.infer<typeof UserSchema>;

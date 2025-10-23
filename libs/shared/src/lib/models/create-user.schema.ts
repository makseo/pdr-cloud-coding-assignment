import { z } from "zod";
import { RoleEnum } from "./role.schema";

export const CreateUserDtoScheme = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    phoneNumber: z.string().optional().or(z.literal("")),
    birthDate: z.iso.date().optional().or(z.literal("")),
    role: RoleEnum,
  })
  .superRefine((data, ctx) => {
    // admin: requires phone and birthDate
    if (data.role === "admin") {
      if (!data.phoneNumber || data.phoneNumber.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Phone number is required for admin role",
          path: ["phoneNumber"],
        });
      }
      if (!data.birthDate || data.birthDate.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Birth date is required for admin role",
          path: ["birthDate"],
        });
      }
    }

    // editor: requires phone
    if (data.role === "editor") {
      if (!data.phoneNumber || data.phoneNumber.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Phone number is required for editor role",
          path: ["phoneNumber"],
        });
      }
    }

    // viewer: no additional required fields
  });

export type CreateUserDto = z.input<typeof CreateUserDtoScheme>;

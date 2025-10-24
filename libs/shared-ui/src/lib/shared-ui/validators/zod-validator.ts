import { AbstractControl, ValidationErrors } from "@angular/forms";
import { z } from "zod";

export function zodValidator(schema: z.ZodType) {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = schema.safeParse(control.value);
    return result.success ? null : { zodError: result.error.issues[0].message };
  };
}

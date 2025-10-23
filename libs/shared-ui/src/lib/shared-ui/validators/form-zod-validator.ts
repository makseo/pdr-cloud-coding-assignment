import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formZodValidator<T extends z.ZodTypeAny>(schema: T, mapValues?: (raw: any) => any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control && "value" in control) {
      const formValue = control.value;
      const mappedValue = mapValues ? mapValues(formValue) : formValue;
      const result = schema.safeParse(mappedValue);

      if (!result.success) {
        const errors: Record<string, { zodError: string }> = {};
        for (const issue of result.error.issues) {
          const path = issue.path.join(".") || "_form";
          errors[path] = { zodError: issue.message };
        }
        return errors;
      }
    }
    return null;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function connectZodErrorsToControls(form: FormGroup, schema: z.ZodTypeAny, mapValues?: (raw: any) => any) {
  form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
    const result = schema.safeParse(mapValues ? mapValues(form.getRawValue()) : form.getRawValue());
    if (!result.success) {
      // Reset all control errors
      Object.keys(form.controls).forEach((key) => form.get(key)?.setErrors(null));
      for (const issue of result.error.issues) {
        const path = issue.path[0] as string;
        const control = form.get(path);
        if (control) {
          control.setErrors({ zodError: issue.message });
        }
      }
    } else {
      Object.keys(form.controls).forEach((key) => form.get(key)?.setErrors(null));
    }
  });
}

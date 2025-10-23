import { Component, computed, inject, signal } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { UsersService } from "../users/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateUserDtoScheme, RoleEnum } from "@pdr-cloud/shared";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { connectZodErrorsToControls, formZodValidator } from "@pdr-cloud/shared-ui";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import moment, { Moment } from "moment";

@Component({
  selector: "pdr-user-create",
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./user-create.html",
  styleUrl: "./user-create.scss",
})
export class UserCreate {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly dialogRef = inject<MatDialogRef<UserCreate, boolean>>(MatDialogRef);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly submitting = signal(false);
  protected readonly roles = RoleEnum.options;

  protected userForm = this.fb.group(
    {
      firstName: this.fb.control(""),
      lastName: this.fb.control(""),
      email: this.fb.control(""),
      phoneNumber: this.fb.control(""),
      birthDate: this.fb.control<Moment | null>(null),
      role: this.fb.control<(typeof RoleEnum.options)[number]>(RoleEnum.options[2]),
    },
    {
      validators: [
        formZodValidator(CreateUserDtoScheme, (raw) => ({
          ...raw,
          birthDate: moment(raw.birthDate).format("YYYY-MM-DD"),
        })),
      ],
    },
  );

  private readonly userFormRoleValue = toSignal(
    this.userForm.controls.role.valueChanges.pipe(map(() => this.userForm.controls.role.getRawValue())),
    { initialValue: this.userForm.controls.role.value },
  );

  protected readonly isPhoneRequired = computed(() => {
    const role = this.userFormRoleValue();
    return role === "admin" || role === "editor";
  });

  protected readonly isBirthDateRequired = computed(() => {
    const role = this.userFormRoleValue();
    return role === "admin";
  });

  constructor() {
    connectZodErrorsToControls(this.userForm, CreateUserDtoScheme, (raw) => ({
      ...raw,
      birthDate: moment(raw.birthDate).format("YYYY-MM-DD"),
    }));
  }

  protected async onSubmit(): Promise<void> {
    if (this.userForm.invalid) {
      return;
    }

    this.submitting.set(true);

    try {
      const formValue = this.userForm.getRawValue();
      const birthDateISO = formValue.birthDate?.format("YYYY-MM-DD");
      const validatedData = CreateUserDtoScheme.parse({
        ...formValue,
        birthDate: birthDateISO,
      });

      await this.usersService.create(validatedData);
      this.dialogRef.close(true);
    } catch (error) {
      console.error("Failed to create user:", error);
      this.snackBar.open("Failed to create user. Please check the form data and try again.", "Close", {
        duration: 5000,
      });
      this.userForm.markAllAsTouched();
    } finally {
      this.submitting.set(false);
    }
  }

  protected onCancel(): void {
    this.dialogRef.close();
  }
}

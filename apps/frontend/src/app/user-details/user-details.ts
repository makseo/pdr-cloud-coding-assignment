import { Component, inject, OnInit, signal } from "@angular/core";
import { UsersService } from "../users/users.service";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { User } from "@pdr-cloud/shared";
import { FullNamePipe, RoleBadge } from "@pdr-cloud/shared-ui";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";

export type UserDetailsData = {
  userId: number;
};

@Component({
  selector: "pdr-user-details",
  imports: [
    CommonModule,
    FullNamePipe,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RoleBadge,
  ],
  templateUrl: "./user-details.html",
  styleUrl: "./user-details.scss",
})
export class UserDetails implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly dialogRef = inject(MatDialogRef<UserDetails>);
  private readonly data = inject<UserDetailsData>(MAT_DIALOG_DATA);

  protected readonly user = signal<User | undefined>(undefined);
  protected readonly loading = signal(true);

  async ngOnInit() {
    try {
      const userData = await this.usersService.getById(this.data.userId);
      this.user.set(userData);
    } catch (error) {
      console.error("Failed to load user details:", error);
      this.user.set(undefined);
    } finally {
      this.loading.set(false);
    }
  }

  protected onClose(): void {
    this.dialogRef.close();
  }
}

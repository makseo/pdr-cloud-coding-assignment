import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { UserDetails, UserDetailsData } from "../user-details/user-details";
import { UserCreate } from "../user-create/user-create";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import type { User } from "@pdr-cloud/shared";
import { take } from "rxjs";
import { FullNamePipe, RoleBadge } from "@pdr-cloud/shared-ui";

const DEFAULT_PAGE_SIZE = 25;

@Component({
  selector: "pdr-user-list",
  imports: [
    CommonModule,
    FormsModule,
    FullNamePipe,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
    RoleBadge,
    RouterModule,
  ],
  templateUrl: "./user-list.html",
  styleUrl: "./user-list.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  users = input.required<User[]>();
  userCreated = output<void>();

  protected readonly searchTerm = signal("");
  protected readonly pageSize = signal(DEFAULT_PAGE_SIZE);
  protected readonly pageIndex = signal(0);

  protected readonly displayedColumns = ["id", "name", "email", "role"];
  protected readonly pageSizeOptions = [10, DEFAULT_PAGE_SIZE, 50, 100];

  protected readonly filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.users();
    }

    return this.users().filter((user) => `${user.firstName} ${user.lastName}`.toLowerCase().includes(term));
  });

  protected readonly paginatedUsers = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    return this.filteredUsers().slice(startIndex, startIndex + this.pageSize());
  });

  protected onSearchChange(): void {
    this.pageIndex.set(0);
  }

  protected onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  protected openUserDetails(userId: number): void {
    this.dialog.open<UserDetails, UserDetailsData>(UserDetails, {
      minWidth: "50vw",
      data: { userId },
    });
  }

  protected openCreateDialog(): void {
    const dialogRef = this.dialog.open<UserCreate, void, boolean>(UserCreate, {
      minWidth: "50vw",
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.snackBar.open("User created successfully", "Close", {
            duration: 3000,
          });
          this.userCreated.emit();
        }
      });
  }
}

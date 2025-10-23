import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { RoleEnum } from "@pdr-cloud/shared";

@Component({
  selector: "lib-pdr-role-badge",
  imports: [CommonModule, MatChipsModule],
  template: `<mat-chip [disableRipple]="true" [class]="roleClass()">{{ role() }}</mat-chip>`,
  styleUrls: ["./role-badge.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleBadge {
  readonly role = input.required<(typeof RoleEnum.options)[number]>();

  protected roleClass() {
    return `role-badge role-${this.role()}`;
  }
}

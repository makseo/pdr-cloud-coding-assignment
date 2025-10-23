import { Component, inject, OnInit } from "@angular/core";
import { UsersService } from "./users.service";
import { UserList } from "../user-list/user-list";

@Component({
  selector: "pdr-users",
  templateUrl: "./users.html",
  imports: [UserList],
})
export class Users implements OnInit {
  private readonly usersService = inject(UsersService);

  protected readonly users = this.usersService.users;

  async ngOnInit() {
    await this.usersService.loadAll();
  }

  protected async onUserCreated() {
    await this.usersService.loadAll();
  }
}

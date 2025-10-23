import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { CreateUserDto, User } from "@pdr-cloud/shared";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class UsersService {
  private http = inject(HttpClient);
  readonly users = signal<User[]>([]);

  async loadAll() {
    const response = await firstValueFrom(this.http.get<User[]>("/api/users"));
    this.users.set(response);
    return response;
  }

  async getById(id: number) {
    return firstValueFrom(this.http.get<User>(`/api/users/${id}`));
  }

  async create(input: CreateUserDto) {
    const created = await firstValueFrom(this.http.post<User>("/api/users", input));
    this.users.update((curr) => [...curr, created]);
    return created;
  }
}

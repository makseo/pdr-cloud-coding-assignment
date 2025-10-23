import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  { path: "", loadComponent: () => import("./pages/home").then((m) => m.Home) },
  { path: "users", loadComponent: () => import("./users/users").then((m) => m.Users) },
  { path: "smiley", loadComponent: () => import("./pages/smiley").then((m) => m.Smiley) },
  { path: "**", redirectTo: "" },
];

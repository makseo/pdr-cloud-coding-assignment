import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatToolbar } from "@angular/material/toolbar";
import { MatButton } from "@angular/material/button";

@Component({
  imports: [RouterModule, MatToolbar, MatButton],
  selector: "pdr-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {}

import { Pipe, PipeTransform } from "@angular/core";
import { User } from "@pdr-cloud/shared";

@Pipe({
  name: "fullName",
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(user: User) {
    return `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
  }
}

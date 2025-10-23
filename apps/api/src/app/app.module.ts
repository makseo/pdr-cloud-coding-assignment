import { Module } from "@nestjs/common";
import { DataAccessModule } from "@pdr-cloud/shared-data-access";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [DataAccessModule, UsersModule],
})
export class AppModule {}

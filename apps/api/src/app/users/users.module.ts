import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserRepository } from "./user.repository";
import { DataAccessModule } from "@pdr-cloud/shared-data-access";

@Module({
  imports: [DataAccessModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}

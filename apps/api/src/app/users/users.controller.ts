import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, CreateUserDtoScheme } from "@pdr-cloud/shared";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const validatedData = CreateUserDtoScheme.parse(createUserDto);
    return this.usersService.create(validatedData);
  }
}

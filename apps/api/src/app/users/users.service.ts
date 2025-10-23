import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from "@nestjs/common";
import { CreateUserDto, User } from "@pdr-cloud/shared";
import { UserRepository } from "./user.repository";

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async onModuleInit() {
    await this.userRepository.init();
  }

  findAll(): User[] {
    return this.userRepository.findAll();
  }

  findById(id: string) {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new BadRequestException("Invalid user ID");
    }
    this.logger.log(`Finding user by ID: ${numericId}`);
    const user = this.userRepository.findById(Number(id));
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    this.logger.log(`Created new user with ID: ${newUser.id}`);
    return newUser;
  }
}

import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import type { User } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { encodedPassword } from "../../utils/argon2";
import type { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await encodedPassword(createUserDto.password);
    try {
      return await this.prisma.user.create({
        data: {
          ...createUserDto,
          password,
        },
      });
    } catch (error) {
      this.logger.error("Failed to create user", error);
      throw new InternalServerErrorException("Failed to create user");
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      this.logger.error("Failed to find all users", error);
      throw new InternalServerErrorException("Failed to find all users");
    }
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new InternalServerErrorException(`User with username ${username} not found`);
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new InternalServerErrorException(`User with id ${id} not found`);
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete user with id ${id}`, error);
      throw new InternalServerErrorException("Failed to delete user");
    }
  }
}

import { Controller, Get } from "@nestjs/common";
import type { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }
}

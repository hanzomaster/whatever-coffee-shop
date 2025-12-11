import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import type { User } from "@prisma/client";
import type { Request, Response } from "express";
import type { CreateUserDto } from "../module/users/dto/create-user.dto";
import type { UserService } from "../module/users/user.service";
import type { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

const ONE_DAY_IN_MS = 86400000;

interface ValidatedUser {
  readonly id: number;
  readonly username: string;
  readonly dob: Date;
  readonly phone: string;
  readonly role: string;
}

interface AuthenticatedRequest extends Request {
  user: ValidatedUser;
}

@ApiExcludeController()
@Controller("auth")
export class AuthController {
  constructor(
    private readonly usersService: UserService,

    private readonly authService: AuthService,
  ) {}

  @Post("register")
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ access_token: string }> {
    const payload = await this.authService.login(req.user);
    const token = payload.access_token;
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: ONE_DAY_IN_MS,
    });
    return payload;
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response): { message: string } {
    res.clearCookie("access_token");
    return { message: "Logged out successfully" };
  }
}

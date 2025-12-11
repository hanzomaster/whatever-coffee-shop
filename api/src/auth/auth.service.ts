import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../module/users/user.service";
import { comparePassword } from "../utils/argon2";

interface ValidatedUser {
  readonly id: number;
  readonly username: string;
  readonly dob: Date;
  readonly phone: string;
  readonly role: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<ValidatedUser | null> {
    try {
      const user = await this.userService.findByUserName(username);
      if (user && (await comparePassword(pass, user.password))) {
        const validatedUser: ValidatedUser = {
          id: user.id,
          username: user.username,
          dob: user.dob,
          phone: user.phone,
          role: user.role,
        };
        return validatedUser;
      }
      return null;
    } catch (error) {
      this.logger.error("Failed to validate user", error);
      throw new UnauthorizedException("Failed to validate user");
    }
  }

  async login(user: ValidatedUser): Promise<{ access_token: string }> {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

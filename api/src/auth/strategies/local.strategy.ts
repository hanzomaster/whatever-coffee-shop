import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import type { AuthService } from "../auth.service";

interface ValidatedUser {
  readonly id: number;
  readonly username: string;
  readonly dob: Date;
  readonly phone: string;
  readonly role: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<ValidatedUser> {
    const authenticated = await this.authService.validateUser(username, password);
    if (!authenticated) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return authenticated;
  }
}

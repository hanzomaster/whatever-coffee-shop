import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../module/users/entities/user.entity'
import { UsersService } from '../module/users/users.service'
import { comparePassword } from '../utils/argon2'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findOneByUsername(username)
      if (user && (await comparePassword(pass, user.password))) {
        delete user.password
        delete user.createdAt
        return Promise.resolve(user)
      }
      return null
    } catch (e) {
      throw new UnauthorizedException('failed - validate user')
    }
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { user }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

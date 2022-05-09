import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Response } from 'express'
import { CreateUserDto } from '../module/users/dto/create-user.dto'
import { User } from '../module/users/entities/user.entity'
import { UsersService } from '../module/users/users.service'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiExcludeController()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,

    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ access_token: string }> {
    const payload = await this.authService.login(req.user)
    const token = payload.access_token
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: jwtConstants.secretExpiration,
    })
    return payload
  }

  @Post('logout')
  logout(): void {
    // TODO: implement
  }
}

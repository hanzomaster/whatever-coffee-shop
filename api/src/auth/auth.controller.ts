import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { CreateUserDto } from '../module/users/dto/create-user.dto'
import { User } from '../module/users/entities/user.entity'
import { UsersService } from '../module/users/users.service'
import { AuthService } from './auth.service'
import { Roles } from './decorators/roles.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RolesGuard } from './guards/roles.guard'
import { Role } from './role.enum'

@ApiExcludeController()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,

    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user)
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }
}

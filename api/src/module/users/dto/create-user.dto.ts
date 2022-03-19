import { IsAlphanumeric, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsAlphanumeric()
  username: string

  @MinLength(8)
  password: string
}

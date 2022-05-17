import {
  IsAlphanumeric,
  IsDate,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  MinLength,
} from 'class-validator'
import { Role } from '../../../auth/role.enum'

export class CreateUserDto {
  @IsAlphanumeric()
  username: string

  @MinLength(8)
  password: string

  @IsDate()
  dob: Date

  @IsPhoneNumber('VN')
  phone: string

  @IsOptional()
  @IsEnum(Role)
  role: Role
}

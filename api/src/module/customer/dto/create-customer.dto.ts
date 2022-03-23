import { IsDecimal, IsMobilePhone, IsString } from 'class-validator'

export class CreateCustomerDto {
  @IsString()
  first_name: string

  @IsString()
  last_name: string

  @IsDecimal()
  balance: number

  @IsMobilePhone('vi-VN')
  phone: string
}

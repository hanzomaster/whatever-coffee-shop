import { IsDecimal, IsOptional, IsString } from 'class-validator'

export class CreateCustomerDto {
  @IsString()
  first_name: string

  @IsString()
  last_name: string

  @IsDecimal()
  balance: number

  @IsOptional()
  @IsString()
  address: string
}

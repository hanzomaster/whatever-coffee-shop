import { IsDecimal, IsOptional, IsString } from 'class-validator'

export class CreateSupplierDto {
  @IsString()
  name: string

  @IsOptional()
  @IsDecimal()
  total_price: number
}

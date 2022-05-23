import { IsDecimal, IsString } from 'class-validator'

export class CreateSupplierDto {
  @IsString()
  name: string

  @IsDecimal()
  total_price: number
}

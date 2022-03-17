import { IsDecimal, IsOptional } from 'class-validator'

export class CreateOrderdetailDto {
  @IsOptional()
  @IsDecimal()
  unit_price: number

  @IsOptional()
  @IsDecimal()
  quantity: number
}

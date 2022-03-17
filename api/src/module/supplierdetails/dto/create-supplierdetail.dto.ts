import { IsDateString, IsDecimal, IsOptional } from 'class-validator'

export class CreateSupplierdetailDto {
  @IsOptional()
  @IsDateString()
  order_date: Date

  @IsOptional()
  @IsDecimal()
  unit_price: number

  @IsOptional()
  @IsDecimal()
  suppplier_quantity: number
}

import { IsDateString, IsDecimal } from 'class-validator'

export class CreateSupplierdetailDto {
  @IsDateString()
  order_date: Date

  @IsDecimal()
  unit_price: number

  @IsDecimal()
  suppplier_quantity: number
}

import { Type } from 'class-transformer'
import { IsDecimal, IsNumber } from 'class-validator'

export class CreateOrderdetailDto {
  @IsDecimal()
  unit_price: number

  @IsDecimal()
  quantity: number

  @Type(() => Number)
  @IsNumber()
  orderId: number

  @Type(() => Number)
  @IsNumber()
  productId: number
}

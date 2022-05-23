import { Type } from 'class-transformer'
import { IsDateString, IsDecimal, IsNumber } from 'class-validator'

export class CreateOrderDto {
  @IsDateString()
  date: Date

  @IsDecimal()
  total_price: number

  @Type(() => Number)
  @IsNumber()
  customerId: number

  @Type(() => Number)
  @IsNumber()
  storeId: number
}

import { Type } from 'class-transformer'
import { IsDateString, IsNumber } from 'class-validator'

export class CreateOrderDto {
  @IsDateString()
  date: Date

  @Type(() => Number)
  @IsNumber()
  customerId: number

  @Type(() => Number)
  @IsNumber()
  storeId: number
}

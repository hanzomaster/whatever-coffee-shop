import { IsDateString, IsDecimal, IsOptional } from 'class-validator'

export class CreateOrderDto {
  @IsOptional()
  @IsDateString()
  date: Date

  @IsOptional()
  @IsDecimal()
  total_price: number
}

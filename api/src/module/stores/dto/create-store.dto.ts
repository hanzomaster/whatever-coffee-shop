import { IsDecimal, IsOptional, IsString } from 'class-validator'

export class CreateStoreDto {
  @IsString()
  location: string

  @IsDecimal()
  revenue: number

  @IsOptional()
  @IsDecimal()
  fixed_cost: number
}

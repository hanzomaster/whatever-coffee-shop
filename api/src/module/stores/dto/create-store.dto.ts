import { IsDecimal, IsOptional, IsString } from 'class-validator'

export class CreateStoreDto {
  @IsString()
  location: string

  @IsDecimal()
  revenue: number

  @IsDecimal()
  fixed_cost: number

  @IsOptional()
  @IsString()
  img_path: string
}

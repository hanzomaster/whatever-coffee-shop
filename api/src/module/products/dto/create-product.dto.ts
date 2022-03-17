import { IsDecimal, IsOptional, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  name: string

  @IsOptional()
  @IsDecimal()
  price: number

  @IsOptional()
  @IsDecimal()
  cost: number

  @IsString()
  category: string

  @IsOptional()
  @IsDecimal()
  inventory: number
}

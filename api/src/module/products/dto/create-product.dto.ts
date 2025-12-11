import { Type } from "class-transformer";
import { IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsDecimal()
  price!: number;

  @IsDecimal()
  cost!: number;

  @IsOptional()
  @IsString()
  category!: string;

  @IsDecimal()
  inventory!: number;

  @IsOptional()
  @IsString()
  img_path!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  supplierId!: number;
}

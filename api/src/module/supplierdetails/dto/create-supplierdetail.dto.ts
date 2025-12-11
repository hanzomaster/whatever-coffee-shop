import { Type } from "class-transformer";
import { IsDateString, IsDecimal, IsNumber } from "class-validator";

export class CreateSupplierdetailDto {
  @IsDateString()
  orderDate!: Date;

  @IsDecimal()
  unitPrice!: number;

  @IsDecimal()
  supplierQuantity!: number;

  @Type(() => Number)
  @IsNumber()
  supplierId!: number;

  @Type(() => Number)
  @IsNumber()
  productId!: number;
}

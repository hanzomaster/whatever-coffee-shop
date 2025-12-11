import { IsDecimal, IsMobilePhone, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  name!: string;

  @IsDecimal()
  balance!: number;

  @IsMobilePhone("vi-VN")
  phone!: string;
}

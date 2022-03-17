import { PartialType } from '@nestjs/mapped-types'
import { CreateSupplierdetailDto } from './create-supplierdetail.dto'

export class UpdateSupplierdetailDto extends PartialType(
  CreateSupplierdetailDto,
) {}

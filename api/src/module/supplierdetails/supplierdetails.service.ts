import { Injectable } from '@nestjs/common'
import { CreateSupplierdetailDto } from './dto/create-supplierdetail.dto'
import { UpdateSupplierdetailDto } from './dto/update-supplierdetail.dto'

@Injectable()
export class SupplierdetailsService {
  create(createSupplierdetailDto: CreateSupplierdetailDto) {
    return 'This action adds a new supplierdetail'
  }

  findAll() {
    return `This action returns all supplierdetails`
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierdetail`
  }

  update(id: number, updateSupplierdetailDto: UpdateSupplierdetailDto) {
    return `This action updates a #${id} supplierdetail`
  }

  remove(id: number) {
    return `This action removes a #${id} supplierdetail`
  }
}

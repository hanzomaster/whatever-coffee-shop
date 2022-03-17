import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Supplierdetail } from './entities/supplierdetail.entity'
import { SupplierdetailsController } from './supplierdetails.controller'
import { SupplierdetailsService } from './supplierdetails.service'

@Module({
  imports: [TypeOrmModule.forFeature([Supplierdetail])],
  controllers: [SupplierdetailsController],
  providers: [SupplierdetailsService],
})
export class SupplierdetailsModule {}

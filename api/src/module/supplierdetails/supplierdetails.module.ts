import { Module } from "@nestjs/common";
import { SupplierdetailsController } from "./supplierdetails.controller";
import { SupplierdetailsService } from "./supplierdetails.service";

@Module({
  controllers: [SupplierdetailsController],
  providers: [SupplierdetailsService],
})
export class SupplierdetailsModule {}

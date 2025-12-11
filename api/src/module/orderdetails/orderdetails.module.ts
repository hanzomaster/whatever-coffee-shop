import { Module } from "@nestjs/common";
import { OrderdetailsController } from "./orderdetails.controller";
import { OrderdetailsService } from "./orderdetails.service";

@Module({
  controllers: [OrderdetailsController],
  providers: [OrderdetailsService],
})
export class OrderdetailsModule {}

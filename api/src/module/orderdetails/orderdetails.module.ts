import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Orderdetail } from './entities/orderdetail.entity'
import { OrderdetailsController } from './orderdetails.controller'
import { OrderdetailsService } from './orderdetails.service'

@Module({
  imports: [TypeOrmModule.forFeature([Orderdetail])],
  controllers: [OrderdetailsController],
  providers: [OrderdetailsService],
})
export class OrderdetailsModule {}

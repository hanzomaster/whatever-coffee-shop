import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { OrderDetail } from "@prisma/client";
import type { CreateOrderdetailDto } from "./dto/create-orderdetail.dto";
import type { UpdateOrderdetailDto } from "./dto/update-orderdetail.dto";
import type { OrderdetailsService } from "./orderdetails.service";

@ApiTags("orderdetails")
@Controller("orderdetails")
export class OrderdetailsController {
  constructor(private readonly orderdetailsService: OrderdetailsService) {}

  @Post()
  create(@Body() createOrderdetailDto: CreateOrderdetailDto): Promise<OrderDetail> {
    return this.orderdetailsService.create(createOrderdetailDto);
  }

  @Get()
  findAll(): Promise<OrderDetail[]> {
    return this.orderdetailsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<OrderDetail> {
    return this.orderdetailsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateOrderdetailDto: UpdateOrderdetailDto,
  ): Promise<OrderDetail> {
    return this.orderdetailsService.update(+id, updateOrderdetailDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<OrderDetail> {
    return this.orderdetailsService.remove(+id);
  }
}

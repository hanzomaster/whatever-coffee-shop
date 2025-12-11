import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Order } from "@prisma/client";
import type { CreateOrderDto } from "./dto/create-order.dto";
import type { UpdateOrderDto } from "./dto/update-order.dto";
import type { OrdersService } from "./orders.service";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Order> {
    return this.ordersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Order> {
    return this.ordersService.remove(+id);
  }
}

import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import type { Order } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import type { CreateOrderDto } from "./dto/create-order.dto";
import type { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.prisma.order.create({
        data: createOrderDto,
      });
    } catch (error) {
      this.logger.error("Failed to create order", error);
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      this.logger.error(`Cannot find order with id ${id}`);
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.findOne(id);
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  async remove(id: number): Promise<Order> {
    await this.findOne(id);
    return this.prisma.order.delete({
      where: { id },
    });
  }
}

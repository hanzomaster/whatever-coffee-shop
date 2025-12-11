import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import type { OrderDetail } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import type { CreateOrderdetailDto } from "./dto/create-orderdetail.dto";
import type { UpdateOrderdetailDto } from "./dto/update-orderdetail.dto";

@Injectable()
export class OrderdetailsService {
  private readonly logger = new Logger(OrderdetailsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderdetailDto: CreateOrderdetailDto): Promise<OrderDetail> {
    try {
      return await this.prisma.orderDetail.create({
        data: createOrderdetailDto,
      });
    } catch (error) {
      this.logger.error("Failed to create order detail", error);
      throw error;
    }
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.prisma.orderDetail.findMany();
  }

  async findOne(id: number): Promise<OrderDetail> {
    const orderDetail = await this.prisma.orderDetail.findUnique({
      where: { id },
    });

    if (!orderDetail) {
      this.logger.error(`Cannot find order detail with id ${id}`);
      throw new NotFoundException(`Order detail with id ${id} not found`);
    }

    return orderDetail;
  }

  async update(id: number, updateOrderdetailDto: UpdateOrderdetailDto): Promise<OrderDetail> {
    await this.findOne(id);
    return this.prisma.orderDetail.update({
      where: { id },
      data: updateOrderdetailDto,
    });
  }

  async remove(id: number): Promise<OrderDetail> {
    await this.findOne(id);
    return this.prisma.orderDetail.delete({
      where: { id },
    });
  }
}

import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import type { SupplierDetail } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import type { CreateSupplierdetailDto } from "./dto/create-supplierdetail.dto";
import type { UpdateSupplierdetailDto } from "./dto/update-supplierdetail.dto";

@Injectable()
export class SupplierdetailsService {
  private readonly logger = new Logger(SupplierdetailsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierdetailDto: CreateSupplierdetailDto): Promise<SupplierDetail> {
    try {
      return await this.prisma.supplierDetail.create({
        data: createSupplierdetailDto,
      });
    } catch (error) {
      this.logger.error("Failed to create supplier detail", error);
      throw error;
    }
  }

  async findAll(): Promise<SupplierDetail[]> {
    return this.prisma.supplierDetail.findMany();
  }

  async findOne(id: number): Promise<SupplierDetail> {
    const supplierDetail = await this.prisma.supplierDetail.findUnique({
      where: { id },
    });

    if (!supplierDetail) {
      this.logger.error(`Cannot find supplier detail with id ${id}`);
      throw new NotFoundException(`Supplier detail with id ${id} not found`);
    }

    return supplierDetail;
  }

  async update(
    id: number,
    updateSupplierdetailDto: UpdateSupplierdetailDto,
  ): Promise<SupplierDetail> {
    await this.findOne(id);
    return this.prisma.supplierDetail.update({
      where: { id },
      data: updateSupplierdetailDto,
    });
  }

  async remove(id: number): Promise<SupplierDetail> {
    await this.findOne(id);
    return this.prisma.supplierDetail.delete({
      where: { id },
    });
  }
}

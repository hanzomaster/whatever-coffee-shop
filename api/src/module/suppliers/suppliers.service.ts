import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import type { Supplier } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import type { CreateSupplierDto } from "./dto/create-supplier.dto";
import type { UpdateSupplierDto } from "./dto/update-supplier.dto";

@Injectable()
export class SuppliersService {
  private readonly logger = new Logger(SuppliersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    try {
      return await this.prisma.supplier.create({
        data: createSupplierDto,
      });
    } catch (error) {
      this.logger.error("Failed to create supplier", error);
      throw error;
    }
  }

  async findAll(): Promise<Supplier[]> {
    return this.prisma.supplier.findMany();
  }

  async findOne(id: number): Promise<Supplier> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      this.logger.error(`Cannot find supplier with id ${id}`);
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }

    return supplier;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    await this.findOne(id);
    return this.prisma.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
  }

  async remove(id: number): Promise<Supplier> {
    await this.findOne(id);
    return this.prisma.supplier.delete({
      where: { id },
    });
  }
}

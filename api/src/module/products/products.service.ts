import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import type { Product } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      this.logger.error("Failed to create product", error);
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      this.logger.error(`Cannot find product with id ${id}`);
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number): Promise<Product> {
    await this.findOne(id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}

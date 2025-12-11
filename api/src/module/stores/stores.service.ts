import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import type { Store } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import type { CreateStoreDto } from "./dto/create-store.dto";
import type { UpdateStoreDto } from "./dto/update-store.dto";

@Injectable()
export class StoresService {
  private readonly logger = new Logger(StoresService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    try {
      return await this.prisma.store.create({
        data: createStoreDto,
      });
    } catch (error) {
      this.logger.error("Failed to create store", error);
      throw error;
    }
  }

  async findAll(): Promise<Store[]> {
    return this.prisma.store.findMany();
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      this.logger.error(`Cannot find store with id ${id}`);
      throw new NotFoundException(`Store with id ${id} not found`);
    }

    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    await this.findOne(id);
    return this.prisma.store.update({
      where: { id },
      data: updateStoreDto,
    });
  }

  async remove(id: number): Promise<Store> {
    await this.findOne(id);
    return this.prisma.store.delete({
      where: { id },
    });
  }
}

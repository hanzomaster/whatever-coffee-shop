import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import type { Customer } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import type { CreateCustomerDto } from "./dto/create-customer.dto";
import type { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      return await this.prisma.customer.create({
        data: createCustomerDto,
      });
    } catch (error) {
      this.logger.error("Failed to create customer", error);
      throw error;
    }
  }

  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      this.logger.error(`Cannot find customer with id ${id}`);
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.findOne(id);
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: number): Promise<Customer> {
    await this.findOne(id);
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Customer } from "@prisma/client";
import type { CustomerService } from "./customer.service";
import type { CreateCustomerDto } from "./dto/create-customer.dto";
import type { UpdateCustomerDto } from "./dto/update-customer.dto";

@ApiTags("customer")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Customer> {
    return this.customerService.remove(+id);
  }
}

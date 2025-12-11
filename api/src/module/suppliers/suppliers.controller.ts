import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Supplier } from "@prisma/client";
import type { CreateSupplierDto } from "./dto/create-supplier.dto";
import type { UpdateSupplierDto } from "./dto/update-supplier.dto";
import type { SuppliersService } from "./suppliers.service";

@ApiTags("suppliers")
@Controller("suppliers")
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Supplier> {
    return this.suppliersService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Supplier> {
    return this.suppliersService.remove(+id);
  }
}

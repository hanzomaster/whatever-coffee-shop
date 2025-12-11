import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { SupplierDetail } from "@prisma/client";
import type { CreateSupplierdetailDto } from "./dto/create-supplierdetail.dto";
import type { UpdateSupplierdetailDto } from "./dto/update-supplierdetail.dto";
import type { SupplierdetailsService } from "./supplierdetails.service";

@ApiTags("supplierdetails")
@Controller("supplierdetails")
export class SupplierdetailsController {
  constructor(private readonly supplierdetailsService: SupplierdetailsService) {}

  @Post()
  create(@Body() createSupplierdetailDto: CreateSupplierdetailDto): Promise<SupplierDetail> {
    return this.supplierdetailsService.create(createSupplierdetailDto);
  }

  @Get()
  findAll(): Promise<SupplierDetail[]> {
    return this.supplierdetailsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<SupplierDetail> {
    return this.supplierdetailsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSupplierdetailDto: UpdateSupplierdetailDto,
  ): Promise<SupplierDetail> {
    return this.supplierdetailsService.update(+id, updateSupplierdetailDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<SupplierDetail> {
    return this.supplierdetailsService.remove(+id);
  }
}

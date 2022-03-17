import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { SupplierdetailsService } from './supplierdetails.service'
import { CreateSupplierdetailDto } from './dto/create-supplierdetail.dto'
import { UpdateSupplierdetailDto } from './dto/update-supplierdetail.dto'

@Controller('supplierdetails')
export class SupplierdetailsController {
  constructor(
    private readonly supplierdetailsService: SupplierdetailsService,
  ) {}

  @Post()
  create(@Body() createSupplierdetailDto: CreateSupplierdetailDto) {
    return this.supplierdetailsService.create(createSupplierdetailDto)
  }

  @Get()
  findAll() {
    return this.supplierdetailsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierdetailsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierdetailDto: UpdateSupplierdetailDto,
  ) {
    return this.supplierdetailsService.update(+id, updateSupplierdetailDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierdetailsService.remove(+id)
  }
}

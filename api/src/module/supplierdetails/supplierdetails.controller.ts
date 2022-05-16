import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DeleteResult, UpdateResult } from 'typeorm'
import { CreateSupplierdetailDto } from './dto/create-supplierdetail.dto'
import { UpdateSupplierdetailDto } from './dto/update-supplierdetail.dto'
import { Supplierdetail } from './entities/supplierdetail.entity'
import { SupplierdetailsService } from './supplierdetails.service'

@ApiTags('supplierdetails')
@Controller('supplierdetails')
export class SupplierdetailsController {
  constructor(
    private readonly supplierdetailsService: SupplierdetailsService,
  ) {}

  @Post()
  create(
    @Body() createSupplierdetailDto: CreateSupplierdetailDto,
  ): Promise<Supplierdetail> {
    return this.supplierdetailsService.create(createSupplierdetailDto)
  }

  @Get()
  findAll(): Promise<Supplierdetail[]> {
    return this.supplierdetailsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Supplierdetail> {
    return this.supplierdetailsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierdetailDto: UpdateSupplierdetailDto,
  ): Promise<UpdateResult> {
    return this.supplierdetailsService.update(+id, updateSupplierdetailDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.supplierdetailsService.remove(+id)
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { DeleteResult, UpdateResult } from 'typeorm'
import { Roles } from '../../auth/decorators/roles.decorator'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../../auth/guards/roles.guard'
import { Role } from '../../auth/role.enum'
import { CreateSupplierdetailDto } from './dto/create-supplierdetail.dto'
import { UpdateSupplierdetailDto } from './dto/update-supplierdetail.dto'
import { Supplierdetail } from './entities/supplierdetail.entity'
import { SupplierdetailsService } from './supplierdetails.service'

@ApiTags('supplierdetails')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('supplierdetails')
export class SupplierdetailsController {
  constructor(
    private readonly supplierdetailsService: SupplierdetailsService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
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
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateSupplierdetailDto: UpdateSupplierdetailDto,
  ): Promise<UpdateResult> {
    return this.supplierdetailsService.update(+id, updateSupplierdetailDto)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.supplierdetailsService.remove(+id)
  }
}

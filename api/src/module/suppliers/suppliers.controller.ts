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
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { Supplier } from './entities/supplier.entity'
import { SuppliersService } from './suppliers.service'

@ApiTags('suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.suppliersService.create(createSupplierDto)
  }

  @Get()
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Supplier> {
    return this.suppliersService.findOne(+id)
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<UpdateResult> {
    return this.suppliersService.update(+id, updateSupplierDto)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.suppliersService.remove(+id)
  }
}

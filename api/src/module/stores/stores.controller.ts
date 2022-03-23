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
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { Store } from './entities/store.entity'
import { StoresService } from './stores.service'

@ApiTags('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storesService.create(createStoreDto)
  }

  @Get()
  findAll(): Promise<Store[]> {
    return this.storesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Store> {
    return this.storesService.findOne(+id)
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ): Promise<UpdateResult> {
    return this.storesService.update(+id, updateStoreDto)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.storesService.remove(+id)
  }
}

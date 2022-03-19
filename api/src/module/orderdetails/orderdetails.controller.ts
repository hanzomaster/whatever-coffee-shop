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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto'
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto'
import { Orderdetail } from './entities/orderdetail.entity'
import { OrderdetailsService } from './orderdetails.service'

@ApiTags('orderdetails')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('orderdetails')
export class OrderdetailsController {
  constructor(private readonly orderdetailsService: OrderdetailsService) {}

  @Post()
  create(
    @Body() createOrderdetailDto: CreateOrderdetailDto,
  ): Promise<Orderdetail> {
    return this.orderdetailsService.create(createOrderdetailDto)
  }

  @Get()
  findAll(): Promise<Orderdetail[]> {
    return this.orderdetailsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Orderdetail> {
    return this.orderdetailsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderdetailDto: UpdateOrderdetailDto,
  ): Promise<UpdateResult> {
    return this.orderdetailsService.update(+id, updateOrderdetailDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.orderdetailsService.remove(+id)
  }
}

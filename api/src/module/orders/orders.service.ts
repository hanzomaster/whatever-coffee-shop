import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = this.orderRepo.create({ ...createOrderDto })
      return Promise.resolve(this.orderRepo.save(newOrder))
    } catch (error) {
      Logger.error(error, 'OrdersService')
      throw new BadRequestException('Wrong input data')
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find()
  }

  findOne(id: number): Promise<Order> {
    try {
      return this.orderRepo.findOneOrFail(id)
    } catch (error) {
      Logger.error(`Can't find order with id ${id}`, 'OrdersService')
      throw new BadRequestException("Can't find order")
    }
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    await this.findOne(id)
    return this.orderRepo.update(id, updateOrderDto)
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id)
    return this.orderRepo.delete(id)
  }
}

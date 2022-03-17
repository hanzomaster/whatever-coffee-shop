import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto'
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto'
import { Orderdetail } from './entities/orderdetail.entity'

@Injectable()
export class OrderdetailsService {
  constructor(
    @InjectRepository(Orderdetail)
    private readonly orderDetailsRepo: Repository<Orderdetail>,
  ) {}
  async create(
    createOrderdetailDto: CreateOrderdetailDto,
  ): Promise<Orderdetail> {
    try {
      const newOrderdetail = this.orderDetailsRepo.create({
        ...createOrderdetailDto,
      })
      return Promise.resolve(this.orderDetailsRepo.save(newOrderdetail))
    } catch (error) {
      Logger.error(error, 'OrderdetailsService')
      throw new BadRequestException('Wrong input data')
    }
  }

  async findAll(): Promise<Orderdetail[]> {
    const orderdetails = await this.orderDetailsRepo.find()
    return Promise.resolve(orderdetails)
  }

  async findOne(id: number): Promise<Orderdetail> {
    try {
      return await this.orderDetailsRepo.findOneOrFail(id)
    } catch (error) {
      Logger.error(
        `Can't find orderdetail with id ${id}`,
        'OrderdetailsService',
      )
      throw new BadRequestException("Can't find orderdetail")
    }
  }

  async update(
    id: number,
    updateOrderdetailDto: UpdateOrderdetailDto,
  ): Promise<UpdateResult> {
    await this.findOne(id)
    return await this.orderDetailsRepo.update(id, updateOrderdetailDto)
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id)
    return await this.orderDetailsRepo.delete(id)
  }
}

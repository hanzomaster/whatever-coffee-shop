import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { Customer } from './entities/customer.entity'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const newCustomer = this.customerRepo.create({ ...createCustomerDto })
      return Promise.resolve(this.customerRepo.save(newCustomer))
    } catch (error) {
      Logger.error(error, 'CustomerService')
      throw new BadRequestException('Wrong input data')
    }
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerRepo.find()
    return Promise.resolve(customers)
  }

  async findOne(id: number): Promise<Customer> {
    try {
      return await this.customerRepo.findOneOrFail(id)
    } catch (error) {
      Logger.error(`Can't find customer with id ${id}`, 'CustomerService')
      throw new BadRequestException("Can't find customer")
    }
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<UpdateResult> {
    await this.findOne(id)
    return await this.customerRepo.update(id, updateCustomerDto)
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id)
    return await this.customerRepo.delete(id)
  }
}

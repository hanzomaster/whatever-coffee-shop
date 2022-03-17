import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { Supplier } from './entities/supplier.entity'

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,
  ) {}
  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    try {
      const newSupplier = this.supplierRepo.create({ ...createSupplierDto })
      return Promise.resolve(this.supplierRepo.save(newSupplier))
    } catch (error) {
      Logger.error(error, 'SuppliersService')
      throw new BadRequestException('Wrong input data')
    }
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepo.find()
  }

  async findOne(id: number): Promise<Supplier> {
    try {
      return await this.supplierRepo.findOneOrFail(id)
    } catch (error) {
      Logger.error(`Can't find supplier with id ${id}`, 'SuppliersService')
      throw new BadRequestException("Can't find supplier")
    }
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<UpdateResult> {
    await this.findOne(id)
    return this.supplierRepo.update(id, updateSupplierDto)
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id)
    return this.supplierRepo.delete(id)
  }
}

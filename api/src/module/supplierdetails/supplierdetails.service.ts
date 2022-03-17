import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateSupplierdetailDto } from './dto/create-supplierdetail.dto'
import { UpdateSupplierdetailDto } from './dto/update-supplierdetail.dto'
import { Supplierdetail } from './entities/supplierdetail.entity'

@Injectable()
export class SupplierdetailsService {
  constructor(
    @InjectRepository(Supplierdetail)
    private readonly supplierDetailsRepo: Repository<Supplierdetail>,
  ) {}
  async create(
    createSupplierdetailDto: CreateSupplierdetailDto,
  ): Promise<Supplierdetail> {
    try {
      const newSupplierdetail = this.supplierDetailsRepo.create({
        ...createSupplierdetailDto,
      })
      return Promise.resolve(this.supplierDetailsRepo.save(newSupplierdetail))
    } catch (error) {
      Logger.error(error, 'SupplierdetailsService')
      throw new BadRequestException('Wrong input data')
    }
  }

  async findAll(): Promise<Supplierdetail[]> {
    return this.supplierDetailsRepo.find()
  }

  async findOne(id: number): Promise<Supplierdetail> {
    try {
      return this.supplierDetailsRepo.findOneOrFail(id)
    } catch (error) {
      Logger.error(
        `Can't find supplierdetail with id ${id}`,
        'SupplierdetailsService',
      )
      throw new BadRequestException("Can't find supplierdetail")
    }
  }

  async update(
    id: number,
    updateSupplierdetailDto: UpdateSupplierdetailDto,
  ): Promise<UpdateResult> {
    await this.findOne(id)
    return this.supplierDetailsRepo.update(id, updateSupplierdetailDto)
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id)
    return this.supplierDetailsRepo.delete(id)
  }
}

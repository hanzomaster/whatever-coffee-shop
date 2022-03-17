import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepo.create({ ...createProductDto })
      return Promise.resolve(this.productRepo.save(newProduct))
    } catch (error) {
      Logger.error(error, 'ProductsService')
      throw new BadRequestException('Wrong input data')
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find()
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.productRepo.findOneOrFail(id)
    } catch (error) {
      Logger.error(`Can't find product with id ${id}`, 'ProductsService')
      throw new BadRequestException("Can't find product")
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    await this.findOne(id)
    return this.productRepo.update(id, updateProductDto)
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id)
    return this.productRepo.delete(id)
  }
}

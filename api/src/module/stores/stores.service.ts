import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { Store } from './entities/store.entity'

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private readonly storeRepo: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    try {
      const newStore = this.storeRepo.create({ ...createStoreDto })
      return Promise.resolve(this.storeRepo.save(newStore))
    } catch (error) {
      Logger.error(error, 'StoresService')
      throw new BadRequestException('Wrong input data')
    }
  }

  async findAll(): Promise<Store[]> {
    return this.storeRepo.find()
  }

  async findOne(id: number): Promise<Store> {
    try {
      return await this.storeRepo.findOneOrFail(id)
    } catch (error) {
      Logger.error(`Can't find store with id ${id}`, 'StoresService')
      throw new BadRequestException("Can't find store")
    }
  }

  async update(
    id: number,
    updateStoreDto: UpdateStoreDto,
  ): Promise<UpdateResult> {
    await this.findOne(id)
    return this.storeRepo.update(id, updateStoreDto)
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id)
    return this.storeRepo.delete(id)
  }
}

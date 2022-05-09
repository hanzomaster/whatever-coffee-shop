import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { encodedPassword } from '../../utils/argon2'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await encodedPassword(createUserDto.password)
    try {
      const newUser = this.userRepo.create({ ...createUserDto, password })
      delete newUser.password
      return Promise.resolve(this.userRepo.save(newUser))
    } catch (error) {
      Logger.error(error, 'UsersService')
      throw new BadRequestException('Wrong input data')
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOne({ username })
    return Promise.resolve(user)
  }
  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepo.findOneOrFail({ id })
      return Promise.resolve(user)
    } catch (error) {
      Logger.error("Can' find user with that id", 'UsersService')
      throw new BadRequestException('User not found')
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id)
    return this.userRepo.delete(id)
  }
}

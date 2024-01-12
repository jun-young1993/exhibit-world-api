import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(
      this.userRepository.create(createUserDto)
    )
  }

  async login(){
    const password = '1112';
    const hash = '$2b$10$WSOECgLcXrqx.EFX0p0X7.kG6dAFr8AcGfvR.m.vmk0XagXLoJNBq';
    return await bcrypt.compare(password, hash);
  }
}

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    if(await this.findOneByEmail(createUserDto.email)){
      throw new HttpException('This email is already registered',HttpStatus.CONFLICT);
    }
    return this.userRepository.save(
      this.userRepository.create(createUserDto)
    )
  }

  async findOneByEmail(email: string){
    return this.userRepository.findOne({
      where : {
        email: email
      }
    })
  }

  async findOneByEmailOrFail(email: string){
    const user = await this.findOneByEmail(email);
    if(!user){
      throw new HttpException('Not Found User Email',HttpStatus.NOT_FOUND);
    }
    return user;
  }



  async login(loginUserDto: LoginUserDto){
    const user = await this.findOneByEmailOrFail(loginUserDto.email);
    const compare =  await bcrypt.compare(loginUserDto.password, user.password);
    if(compare === false){
      throw new HttpException('Invalid Password',HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

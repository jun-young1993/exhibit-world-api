import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from "./dto/login-user.dto";

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the specified parameters.'
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'login',
    description: 'Creates a new user with the specified parameters.'
  })
  login(@Body() loginUserDto: LoginUserDto){
    return this.usersService.login(loginUserDto);
  }
}

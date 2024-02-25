import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupMappingService } from './group-mapping.service';
import { CreateGroupMappingDto } from './dto/create-group-mapping.dto';
import { UpdateGroupMappingDto } from './dto/update-group-mapping.dto';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { GroupMapping } from "./entities/group-mapping.entity";



@ApiTags("Group-Mapping")
@UseGuards(AuthGuard)
@ApiCookieAuth()
@Controller({
  path: 'group-mapping',
  version: '1'
})

export class GroupMappingController {
  constructor(private readonly groupMappingService: GroupMappingService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a group-mapping',
    description: 'Create a list of all existing group-mapping.',
  })
  create(
    @Body() createGroupMappingDto: CreateGroupMappingDto,
    @AuthUser() user: User
  ) {
    return this.groupMappingService.create(createGroupMappingDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all group-mapping',
    description: 'Retrieves a list of all existing group-mapping.',
  })
  findAll(@AuthUser() user: User) {
    
    return this.groupMappingService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupMappingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupMappingDto: UpdateGroupMappingDto) {
    return this.groupMappingService.update(+id, updateGroupMappingDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: GroupMapping['id']) {

    return this.groupMappingService.remove(uuid);
  }
}

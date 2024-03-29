import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupMappingService } from './group-mapping.service';
import { CreateGroupMappingDto } from './dto/create-group-mapping.dto';
import { UpdateGroupMappingDto } from './dto/update-group-mapping.dto';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { GroupMapping } from "./entities/group-mapping.entity";
import { GroupsService } from 'src/groups/groups.service';



@ApiTags("Group-Mapping")
@UseGuards(AuthGuard)
@ApiCookieAuth()
@Controller({
  path: 'group-mapping',
  version: '1'
})

export class GroupMappingController {
  constructor(
    private readonly groupMappingService: GroupMappingService,
    private readonly groupsService: GroupsService
  ) {}

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

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Patch a group mapping',
    description: 'Patch a group mapping.',
  })
  update(@Param('uuid') uuid: GroupMapping['id'], @Body() updateGroupMappingDto: UpdateGroupMappingDto) {
    return this.groupMappingService.update(uuid,updateGroupMappingDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: GroupMapping['id']) {
    const groupMapping = await this.groupMappingService.findOne(uuid);
    await this.groupsService.removeByMapping(groupMapping);
    return this.groupMappingService.remove(uuid);
  }
}

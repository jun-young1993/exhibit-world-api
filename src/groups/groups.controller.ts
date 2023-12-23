import { Controller, Get, Post, Body, Param, Patch } from "@nestjs/common";
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Group } from "./entities/group.entity";
import { UpdateGroupDto } from "./dto/update-group.dto";

@ApiTags("Groups")
@Controller({
  path: 'groups',
  version: '1'
})
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new group',
    description: 'Creates a new group with the specified parameters.'
  })
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group>
  {
    return this.groupsService.create(createGroupDto);
  }

  @Post('/default')
  @ApiOperation({
    summary: 'Create a new default group',
    description: 'Creates a new default group with the specified parameters.'
  })
  async createDefault(): Promise<Group>
  {
    return this.groupsService.createDefault();
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all groups',
    description: 'Retrieves a list of all existing groups.',
  })
  findAll(): Promise<Group[]>
  {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a group',
    description: 'Retrieves a existing group.',
  })
  findOne(@Param('id') id: string): Promise<Group>
  {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a group',
    description: 'Update a group.',
  })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto)
  }

}

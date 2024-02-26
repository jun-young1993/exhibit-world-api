import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req, Patch
} from "@nestjs/common";
import { GroupsService } from './groups.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Group } from "./entities/group.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterGltfOptions } from "../option/multer-gltf.option";
import { Express } from "express";
import { GithubStorageService } from "../github-storage/github-storage.service";
import { AuthGuard } from "src/auth/auth.guard";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { GroupMappingService } from "../group-mapping/group-mapping.service";
import { GroupMapping } from "../group-mapping/entities/group-mapping.entity";


@ApiTags("Groups")
@UseGuards(AuthGuard)
@ApiCookieAuth()
@Controller({
  path: 'groups',
  version: '1'
})
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly githubStorageService: GithubStorageService,
    private readonly groupMappingService: GroupMappingService
  ) {}

  @Post('/mapping/:uuid')
  @ApiOperation({ summary: `Upload a new GLTF file`} )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', MulterGltfOptions))
  async create(
    @Req() request,
    @Param('uuid') uuid: GroupMapping['id'],
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Group>
  {
    const { user } = request;
    const groupMapping = await this.groupMappingService.findOne(uuid);
    const githubStorage = await this.githubStorageService.create(file);
    return this.groupsService.create(githubStorage,  groupMapping);
  }

  @Get('/mapping/:uuid')
  @ApiOperation({
    summary: 'Retrieve all groups by mapping',
    description: 'Retrieves a list of all existing groups.',
  })
  async findAllByMapping(@Param('uuid') uuid: GroupMapping['id']): Promise<Group[] | []>
  {
    const groupMapping = await this.groupMappingService.findOne(uuid);
    return await this.groupsService.findAllByMapping(groupMapping);
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

  @Post(':id')
  @ApiOperation({ summary: `Update a new GLTF file`} )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', MulterGltfOptions))
  async update(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const group = await this.groupsService.findOne(id);
    const result = await this.githubStorageService.putContent(group.githubStorage, file, true);

    return group;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a group',
    description: 'Delete a group.',
  })
  async remove(@Param('id') id: string) {
    return await this.groupsService.remove(id);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Patch a group',
    description: 'Patch a group.',
  })
  patch(@Param('uuid') uuid: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.patch(uuid, updateGroupDto);
  }

}

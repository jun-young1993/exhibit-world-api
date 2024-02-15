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


@ApiTags("Groups")
@UseGuards(AuthGuard)
@Controller({
  path: 'groups',
  version: '1'
})
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly githubStorageService: GithubStorageService
  ) {}

  @Post()
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
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Group>
  {
    const { user } = request;
    const githubStorage = await this.githubStorageService.create(file);
    return this.groupsService.create(githubStorage, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all groups',
    description: 'Retrieves a list of all existing groups.',
  })
  findAll(@Req() request): Promise<Group[]>
  {
    const { user } = request;
    return this.groupsService.findAll(user);
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
    const group = await this.groupsService.findOne(id);

    const result = {...group};

    await group.githubStorage.remove();
    await group.remove();

    return result;
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

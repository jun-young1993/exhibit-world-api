import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { GithubStorageService } from './github-storage.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Express, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterGltfOptions } from "../option/multer-gltf.option";
import { GroupsService } from "../groups/groups.service";

@ApiTags('Github-Storage')
@Controller({
  path: 'github-storage',
  version: '1'
})
export class GithubStorageController {

  constructor(
    private readonly githubStorageService: GithubStorageService,

  ) {}

  @Get()
  findAll() {
    return this.githubStorageService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Retrieve a github storage',
    description: 'Retrieves a existing github storage.',
  })
  findOne(@Param('uuid') uuid: string)
  {
    return this.githubStorageService.findOne(uuid);
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ExhibitsService } from './exhibits.service';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { UpdateExhibitDto } from './dto/update-exhibit.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GithubStorageService } from "../github-storage/github-storage.service";
import { v4 } from "uuid";
import { btoa } from "buffer";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterGltfOptions } from "../option/multer-gltf.option";
import { Express } from "express";
import * as fs from "fs";

@ApiTags("Exhibits")
@Controller({
  path: 'exhibit',
  version: '1'
})
export class ExhibitsController {
  constructor(
    private readonly exhibitsService: ExhibitsService,
    private readonly githubStorageService: GithubStorageService,
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
  async gltfUpload(
    @UploadedFile() file: Express.Multer.File,
  ){
    const githubStorage = await this.githubStorageService.create(file);
    const exhibit = await this.exhibitsService.create(githubStorage);
    return exhibit;
 }
}

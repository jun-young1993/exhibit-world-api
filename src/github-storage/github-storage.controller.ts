import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { GithubStorageService } from './github-storage.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Express, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterGltfOptions } from "../option/multer-gltf.option";

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

  @Get('/test')
  async test() {
    const test = await this.githubStorageService.test();
    console.log(test);

  }



  @Put()
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
  ) {

    const uploaded = await this.githubStorageService.upload(file);
    // console.log(uploaded);
  }

}

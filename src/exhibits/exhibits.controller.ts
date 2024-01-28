import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Query
} from "@nestjs/common";
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
import { Group } from "../groups/entities/group.entity";
import { Exhibit } from "./entities/exhibit.entity";
import { FindManyOptions } from "typeorm";

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

 @Get()
 @ApiOperation({
   summary: 'Retrieve all exhibits',
   description: 'Retrieves a list of all existing exhibits.',
 })
 findAll(): Promise<Exhibit[] | []>
 {
   return this.exhibitsService.findAll({
     order: {
       createdAt: 'DESC'
     }
   });
 }

 @Get(':uuid')
 @ApiOperation({
   summary: 'Retrieve a exhibit',
   description: 'Retrieves a existing exhibit.',
 })
 async findOne(@Param('uuid') uuid: string) {
   const result = await this.exhibitsService.findOne(uuid);
    const githubStorage = await this.githubStorageService.findOne(result.githubStorage.id);
   return Object.assign(result,githubStorage);
 }

 @Delete(':uuid')
 @ApiOperation({
   summary: 'Delete a exhibit',
   description: 'Delete a existing exhibit.',
 })
  async delete(@Param('uuid') uuid: string) {
    const exhibit = await this.exhibitsService.findOne(uuid);
    const result = {...exhibit};

    await exhibit.githubStorage.remove();
    await exhibit.remove();

    return result;
    // await exhibit.githubStorage.remove();

 }

}

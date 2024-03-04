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
  Query,
  UseGuards
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
import { AuthUser } from "src/decorator/auth-user.decorator";
import { User } from "src/users/entities/user.entity";
import { Public } from "src/decorator/public.decorator";
import { AuthGuard } from "src/auth/auth.guard";


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
    @AuthUser() user: User
  ){
    console.log('user',user);
    const githubStorage = await this.githubStorageService.create(file);
    const exhibit = await this.exhibitsService.create(githubStorage, user);
    return exhibit;
 }

 @Get()
 @ApiOperation({
   summary: 'Retrieve all exhibits',
   description: 'Retrieves a list of all existing exhibits.',
 })
 findAll(
  @AuthUser() user: User
 ): Promise<Exhibit[] | []>
 {
   return this.exhibitsService.findAll(user);
 }

 @Get(':uuid')
 @Public()
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
 }

 @Patch(':uuid')
 @ApiOperation({
   summary: 'Patch a exhibit',
   description: 'Patch a existing exhibit.',
 })
  update(@Param('uuid') uuid: Exhibit['id'], @Body() updateExhibitDto: UpdateExhibitDto){
    return this.exhibitsService.update(uuid, updateExhibitDto);
 }

}

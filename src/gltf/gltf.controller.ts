import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { GltfService } from './gltf.service';
import { CreateGltfDto } from './dto/create-gltf.dto';
import { UpdateGltfDto } from './dto/update-gltf.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ImageType } from "../images/entities/image.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express, Response } from "express";
import { MulterGltfOptions } from "../option/multer-gltf.option";
import { NodeIO } from "@gltf-transform/core";

@ApiTags('Gltf')
@Controller({
  path: 'gltf',
  version: '1'
})
export class GltfController {
  constructor(private readonly gltfService: GltfService) {}

  @Post()
  create(@Body() createGltfDto: CreateGltfDto) {
    return this.gltfService.create(createGltfDto);
  }

  @Post('upload')
  @ApiOperation({ summary: `Upload a new GLTF file`} )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', MulterGltfOptions))
  async uploadTextureFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() {name} : {name?: string}
  ) {
    const createImageDto = new CreateGltfDto({
      name: name ?? file.filename,
      path: file.path,
    });
    const gltf = await this.gltfService.create(createImageDto);

    return gltf;

  }

  @ApiOperation( {summary: 'find by gltf entities' })
  @Get()
  findAll() {
    return this.gltfService.findAll();
  }

  @ApiOperation( {summary: 'test' })
  @Get('test')
  async test(){
    const io = new NodeIO();
    const document = await io.read('/Users/junyoungkim/Downloads/blank_canvas.glb');
    const root = document.getRoot();
    const meshes = root.listMeshes();
    const mesh = meshes[0];
    const uv = mesh.listPrimitives()[0];
    console.log(uv);
  }

  @ApiOperation( {summary: 'find a gltf entity' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gltfService.findOne(id);
  }

  @ApiOperation( {summary: 'find a gltf file' })
  @Get('file/:id')
  async findOneFile(
    @Param('id') id: string,
    @Res() response: Response
  ) {
    const gltf = await this.gltfService.findOne(id);
    return response.sendFile(gltf.path);
  }


}

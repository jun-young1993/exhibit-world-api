import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express, Response } from "express";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { MulterImageOptions } from "../option/multer-image.option";
import { ImageType } from "./entities/image.entity";

@ApiTags('Images')
@Controller({
  path: 'images',
  version: '1'
})
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
  ) {}


  @Post('upload/:purpose')
  @ApiOperation({ summary: 'Upload a new texture Image file' })
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
  @UseInterceptors(FileInterceptor('file', MulterImageOptions))
  async uploadTextureFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('purpose') purpose: ImageType,
    @Body() {name} : {name?: string}
  ) {
    const createImageDto = new CreateImageDto({
      name: name ?? file.filename,
      path: file.path,
      purpose: purpose
    });
    const image = await this.imagesService.create(createImageDto);

    return image;

  }


  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @ApiOperation({ summary: 'find by purpose' })
  @Get('purpose/:purpose')
  findByPurpose(
    @Param('purpose') purpose: ImageType
  ) {
    return this.imagesService.findByPurpose(purpose)
  }

  @Get('file/:id')
  async findOneFile(
    @Param('id') id: string,
    @Res() response: Response
  ) {
    const image = await this.imagesService.findOne(id);
    return response.sendFile(image.path);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}

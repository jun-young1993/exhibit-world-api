import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TexturesService } from './textures.service';
import { CreateTextureDto } from './dto/create-texture.dto';
import { UpdateTextureDto } from './dto/update-texture.dto';

@Controller('textures')
export class TexturesController {
  constructor(private readonly texturesService: TexturesService) {}

  @Post()
  create(@Body() createTextureDto: CreateTextureDto) {
    return this.texturesService.create(createTextureDto);
  }

  @Get()
  findAll() {
    return this.texturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.texturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextureDto: UpdateTextureDto) {
    return this.texturesService.update(+id, updateTextureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.texturesService.remove(+id);
  }
}

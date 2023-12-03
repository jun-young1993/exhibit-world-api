import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { CreateMaterialDto } from "../materials/dto/create-material.dto";
import { TexturesService } from "./textures.service";
import { CreateTextureDto } from "./dto/create-texture.dto";
import { UpdateMaterialDto } from "../materials/dto/update-material.dto";
import { UpdateTextureDto } from "./dto/update-texture.dto";

@ApiTags('Textures')
@Controller({
  path: 'textures',
  version: '1'
})
export class TexturesController {
  constructor(
    private readonly texturesService: TexturesService
  ) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new texture', description: 'Creates a new texture with the specified parameters.' })
  create(@Body() createTextureDto: CreateTextureDto) {
    return this.texturesService.create(createTextureDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a new texture', description: 'Updated a new texture with the specified parameters.' })
  update(@Param('id') id: string, @Body() updateTextureDto: UpdateTextureDto) {
    return this.texturesService.update(id, updateTextureDto);
  }

}
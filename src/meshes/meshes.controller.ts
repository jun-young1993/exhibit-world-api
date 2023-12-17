import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeshesService } from './meshes.service';
import { CreateMeshDto } from './dto/create-mesh.dto';
import { UpdateMeshDto } from './dto/update-mesh.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Meshes')
@Controller({
  path: 'meshes',
  version: '1'
})
export class MeshesController {
  constructor(
    private readonly meshesService: MeshesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new mesh', description: 'Creates a new mesh with the specified parameters.' })
  create(@Body() createMeshDto: CreateMeshDto) {
    return this.meshesService.create(createMeshDto);
  }



  @Get()
  @ApiOperation({ summary: 'Retrieve all meshes', description: 'Fetches all meshes available in the system.' })
  findAll() {
    return this.meshesService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meshesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeshDto: UpdateMeshDto) {

    return this.meshesService.update(id, updateMeshDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meshesService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeshesService } from './meshes.service';
import { CreateMeshDto } from './dto/create-mesh.dto';
import { UpdateMeshDto } from './dto/update-mesh.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateBulkDto } from "./dto/create-bulk.dto";
import { GeometriesService } from "../geometries/geometries.service";
import { MaterialsService } from "../materials/materials.service";
import { CreateGeometryDto } from "../geometries/dto/create-geometry.dto";
import { CreateMaterialDto } from "../materials/dto/create-material.dto";

@ApiTags('Meshes')
@Controller({
  path: 'meshes',
  version: '1'
})
export class MeshesController {
  constructor(
    private readonly meshesService: MeshesService,
    private readonly geometriesService: GeometriesService,
    private readonly materialService: MaterialsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new mesh', description: 'Creates a new mesh with the specified parameters.' })
  create(@Body() createMeshDto: CreateMeshDto) {
    return this.meshesService.create(createMeshDto);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Create a new bulk', description: 'Creates a new bulk with the specified parameters.' })
  async createBulk(
    @Body() {
      mesh: createMeshDto,
      geometry: createGeometryDto,
      material: createMaterialDto,
    }: CreateBulkDto
  ) {


    const geometry = await this.geometriesService.create(
      createGeometryDto
    );
    createMeshDto.geometry = geometry;

    const material = await this.materialService.create(
      createMaterialDto
    );
    createMeshDto.material = material;


    const mesh = await this.meshesService.create(createMeshDto);

    return {
      mesh,
      geometry,
      material,
    }

  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all meshes', description: 'Fetches all meshes available in the system.' })
  findAll() {
    return this.meshesService.findAll();
  }

  @Get('/bulk')
  @ApiOperation({ summary: 'Retrieve all bulk', description: 'Fetches all bulks available in the system.' })
  findAllBulk() {
    return this.meshesService.findAllBulk();
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

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeometriesService } from './geometries.service';
import { CreateGeometryDto } from './dto/create-geometry.dto';
import { UpdateGeometryDto } from './dto/update-geometry.dto';

@Controller('geometries')
export class GeometriesController {
  constructor(private readonly geometriesService: GeometriesService) {}

  @Post()
  create(@Body() createGeometryDto: CreateGeometryDto) {
    return this.geometriesService.create(createGeometryDto);
  }

  @Get()
  findAll() {
    return this.geometriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geometriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeometryDto: UpdateGeometryDto) {
    return this.geometriesService.update(+id, updateGeometryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geometriesService.remove(+id);
  }
}

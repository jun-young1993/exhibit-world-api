import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from "@nestjs/common";
import { GeometriesService } from './geometries.service';
import { CreateGeometryDto } from './dto/create-geometry.dto';
import { UpdateGeometryDto } from './dto/update-geometry.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { isEmpty } from "lodash";
import * as fs from "fs";

@ApiTags('Geometries')
@Controller({
  path: 'geometries',
  version: '1'
})
export class GeometriesController {
  constructor(private readonly geometriesService: GeometriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new geometry', description: 'Creates a new geometry with the specified parameters.' })
  create(@Body() createGeometryDto: CreateGeometryDto) {
    return this.geometriesService.create(createGeometryDto);
  }

  @Get('/file/:uuid/:attribute')
  async sendFile(
    @Param('uuid') uuid: string,
    @Param('attribute') attribute: string,
    @Res() response
  ) {
    const geometry = await this.findOne(uuid);
    if(isEmpty(geometry[attribute])){
      return response.sendStatus(204);
    };
    if(!geometry[attribute]){
      return response.sendStatus(204);
    }
    const buffer = fs.readFileSync(geometry[attribute],'utf-8');
    console.log(buffer.toString());
    return response.sendFile(`${geometry[attribute]}`);
  }

  @Get()
  findAll() {
    return this.geometriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geometriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeometryDto: UpdateGeometryDto) {
    return this.geometriesService.update(id, updateGeometryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geometriesService.remove(+id);
  }


}

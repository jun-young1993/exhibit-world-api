import { Injectable } from '@nestjs/common';
import { CreateGeometryDto } from './dto/create-geometry.dto';
import { UpdateGeometryDto } from './dto/update-geometry.dto';

@Injectable()
export class GeometriesService {
  create(createGeometryDto: CreateGeometryDto) {
    return 'This action adds a new geometry';
  }

  findAll() {
    return `This action returns all geometries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geometry`;
  }

  update(id: number, updateGeometryDto: UpdateGeometryDto) {
    return `This action updates a #${id} geometry`;
  }

  remove(id: number) {
    return `This action removes a #${id} geometry`;
  }
}

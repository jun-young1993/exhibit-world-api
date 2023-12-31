import { Injectable } from '@nestjs/common';
import { CreateGeometryDto } from './dto/create-geometry.dto';
import { UpdateGeometryDto } from './dto/update-geometry.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Geometry } from "./entities/geometry.entity";
import { Repository } from "typeorm";

@Injectable()
export class GeometriesService {
  constructor(
    @InjectRepository(Geometry)
    private readonly geometryRepository: Repository<Geometry>,
  ) {
  }
  create(createGeometryDto: CreateGeometryDto) {
    return this.geometryRepository.save(
      this.geometryRepository.create(createGeometryDto)
    );
  }

  findAll() {
    return `This action returns all geometries`;
  }

  findOne(id: string) {
    return this.geometryRepository.findOneBy({
      id: id
    })
  }

  update(id: string, updateGeometryDto: UpdateGeometryDto) {
    return this.geometryRepository.update(id, updateGeometryDto);
  }

  remove(id: number) {
    return `This action removes a #${id} geometry`;
  }

}

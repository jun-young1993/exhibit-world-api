import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Material } from "./entities/material.entity";
import { Repository } from "typeorm";

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>
  ) {
  }
  create(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.save(
      this.materialRepository.create(
        createMaterialDto
      )
    );
  }

  findAll() {
    return `This action returns all materials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} material`;
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`;
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}

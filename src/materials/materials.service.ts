import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Material } from "./entities/material.entity";
import { Repository } from "typeorm";
import { Texture } from "../textures/entities/texture.entity";
import { TexturesService } from "../textures/textures.service";
import { CreateTextureDto } from "../textures/dto/create-texture.dto";

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    private readonly texturesService: TexturesService
  ) {
  }
  async create(createMaterialDto: CreateMaterialDto) {

    if (createMaterialDto.texture) {

      const texture = await this.texturesService.create(
        createMaterialDto.texture as CreateTextureDto
      )
      createMaterialDto.texture = texture;
    }

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

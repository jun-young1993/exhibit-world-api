import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Material } from "./entities/material.entity";
import { FindManyOptions, Repository } from "typeorm";
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

  createTexture(materialDto: CreateMaterialDto):Promise<Texture | null>
  {
    if (materialDto.texture) {
      const texture = this.texturesService.create(
        materialDto.texture as CreateTextureDto
      )
      return texture;
    }
    return null
  }

  async create(createMaterialDto: CreateMaterialDto) {

    createMaterialDto.texture = await this.createTexture(createMaterialDto);

    return this.materialRepository.save(
      this.materialRepository.create(
        createMaterialDto
      )
    );
  }

  findAll() {
    return `This action returns all materials`;
  }

  findOne(id: string): Promise<Material>
  {
    const findOptions: FindManyOptions<Material> = {
      where: { id: id },
      relations: ['texture']
    };
    return this.materialRepository.findOne(findOptions);
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    // updateMaterialDto.texture = await this.createTexture(updateMaterialDto);

    return this.materialRepository.update(id, updateMaterialDto);
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}

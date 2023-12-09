import { Injectable } from '@nestjs/common';
import { CreateMeshDto } from './dto/create-mesh.dto';
import { UpdateMeshDto } from './dto/update-mesh.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Mesh } from "./entities/mesh.entity";

@Injectable()
export class MeshesService {
  constructor(
    @InjectRepository(Mesh)
    private readonly meshRepository: Repository<Mesh>
  ) {
  }
  create(createMeshDto: CreateMeshDto) {
    return this.meshRepository.save(
      this.meshRepository.create(createMeshDto)
    );
  }

  findAll() {
    return this.meshRepository.find();
  }

  findAllBulk() {
    return this.meshRepository.find({
        relations: ['material','geometry', 'material.texture', 'material.texture.image','gltf']
      })
  }

  findOne(id: number) {
    return `This action returns a #${id} mesh`;
  }

  update(id: string, updateMeshDto: UpdateMeshDto) {
    return this.meshRepository.update({ id: id }, updateMeshDto);
  }

  remove(id: number) {
    return `This action removes a #${id} mesh`;
  }
}

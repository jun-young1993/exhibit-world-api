import { Injectable } from '@nestjs/common';
import { CreateGltfDto } from './dto/create-gltf.dto';
import { UpdateGltfDto } from './dto/update-gltf.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Gltf } from "./entities/gltf.entity";
import { Repository } from "typeorm";

@Injectable()
export class GltfService {
  constructor(
    @InjectRepository(Gltf)
    private readonly gltfRepository: Repository<Gltf>
  )
  {}

  create(createGltfDto: CreateGltfDto) {
    return this.gltfRepository.save(
      this.gltfRepository.create(
        createGltfDto
      )
    )
  }

  findAll() {
    return this.gltfRepository.find();
  }

  findOne(id: string) {
    return this.gltfRepository.findOneBy({
      id: id
    });
  }

  update(id: number, updateGltfDto: UpdateGltfDto) {
    return `This action updates a #${id} gltf`;
  }

  remove(id: number) {
    return `This action removes a #${id} gltf`;
  }
}

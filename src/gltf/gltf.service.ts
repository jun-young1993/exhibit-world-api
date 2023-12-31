import { Injectable } from '@nestjs/common';
import { CreateGltfDto } from './dto/create-gltf.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Gltf } from "./entities/gltf.entity";
import { Repository } from "typeorm";
import * as fs from "fs";
import { DRACOLoader, GLTF, GLTFLoader } from "node-three-gltf";

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

  async findOneGltf(uuid: string): Promise<GLTF> {
    const gltf = await this.findOne(uuid);
    return new Promise((resolve, reject) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(new DRACOLoader());
      gltfLoader.load(gltf.path,
        (gltf) => {
          resolve(gltf);
        },
        () => {

        },
        reject
      )
    })

  }
}

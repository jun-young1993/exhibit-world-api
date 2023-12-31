import { Module } from '@nestjs/common';
import { GltfService } from './gltf.service';
import { GltfController } from './gltf.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gltf } from "./entities/gltf.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Gltf])],
  controllers: [GltfController],
  providers: [GltfService],
  exports: [GltfService]
})
export class GltfModule {}

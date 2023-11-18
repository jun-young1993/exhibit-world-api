import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Material } from "./entities/material.entity";
import { Texture } from "../textures/entities/texture.entity";
import { ImagesModule } from "../images/images.module";
import { TexturesModule } from "../textures/textures.module";

@Module({
  imports: [TypeOrmModule.forFeature([Material]), TexturesModule],
  controllers: [MaterialsController],
  providers: [MaterialsService],
  exports: [MaterialsService]
})
export class MaterialsModule {}

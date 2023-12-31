import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from "./entities/group.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mesh } from "../meshes/entities/mesh.entity";
import { Geometry } from "../geometries/entities/geometry.entity";
import { Material } from "../materials/entities/material.entity";
import { Association } from "../associations/entities/association.entity";
import { GltfModule } from "../gltf/gltf.module";
import { GltfService } from "../gltf/gltf.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Group,Mesh,Geometry,Material,Association]),
    GltfModule
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}

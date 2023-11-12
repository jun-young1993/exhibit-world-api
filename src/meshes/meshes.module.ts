import { Module } from '@nestjs/common';
import { MeshesService } from './meshes.service';
import { MeshesController } from './meshes.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mesh } from "./entities/mesh.entity";
import { GeometriesModule } from "../geometries/geometries.module";
import { MaterialsModule } from "../materials/materials.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Mesh]),
    GeometriesModule,
    MaterialsModule
  ],
  controllers: [MeshesController],
  providers: [MeshesService]
})
export class MeshesModule {}

import { Module } from '@nestjs/common';
import { GeometriesService } from './geometries.service';
import { GeometriesController } from './geometries.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Geometry } from "./entities/geometry.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Geometry])],
  controllers: [GeometriesController],
  providers: [GeometriesService],
  exports: [GeometriesService]
})
export class GeometriesModule {}

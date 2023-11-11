import { Module } from '@nestjs/common';
import { GeometriesService } from './geometries.service';
import { GeometriesController } from './geometries.controller';

@Module({
  controllers: [GeometriesController],
  providers: [GeometriesService]
})
export class GeometriesModule {}

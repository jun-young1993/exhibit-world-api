import { Module } from '@nestjs/common';
import { MeshesService } from './meshes.service';
import { MeshesController } from './meshes.controller';

@Module({
  controllers: [MeshesController],
  providers: [MeshesService]
})
export class MeshesModule {}

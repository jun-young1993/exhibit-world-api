import { Module } from '@nestjs/common';
import { GroupMappingService } from './group-mapping.service';
import { GroupMappingController } from './group-mapping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMapping } from './entities/group-mapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupMapping])],
  controllers: [GroupMappingController],
  providers: [GroupMappingService],
  exports: [GroupMappingService]
})
export class GroupMappingModule {}

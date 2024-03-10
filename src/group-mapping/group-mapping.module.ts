import { Module, forwardRef } from '@nestjs/common';
import { GroupMappingService } from './group-mapping.service';
import { GroupMappingController } from './group-mapping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMapping } from './entities/group-mapping.entity';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupMapping]), 
    forwardRef(()=>GroupsModule)
  ],
  controllers: [GroupMappingController],
  providers: [GroupMappingService],
  exports: [GroupMappingService]
})
export class GroupMappingModule {}

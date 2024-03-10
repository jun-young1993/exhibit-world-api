import { Test, TestingModule } from '@nestjs/testing';
import { GroupMappingController } from './group-mapping.controller';
import { GroupMappingService } from './group-mapping.service';

describe('GroupMappingController', () => {
  let controller: GroupMappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupMappingController],
      providers: [GroupMappingService],
    }).compile();

    controller = module.get<GroupMappingController>(GroupMappingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
